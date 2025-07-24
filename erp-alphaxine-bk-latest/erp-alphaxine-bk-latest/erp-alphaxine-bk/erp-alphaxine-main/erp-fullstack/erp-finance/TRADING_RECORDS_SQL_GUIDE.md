# Trading Records SQL Implementation Guide

This document provides the SQL script and implementation details for the manual trading records tracker. Use this guide to set up your trading log book system in MySQL Workbench.

## Overview

This system allows you to:
- Manually log your trades with dates and profit/loss information
- Track key metrics like average profit/loss, win rate, and drawdown
- Generate visualizations of your trading performance over time

## SQL Script

Run the following SQL script in MySQL Workbench to create the necessary database schema:

```sql
-- Trading Records Management System SQL Schema
-- For Alphaxine ERP Finance Module
-- Created: July 7, 2025

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS trade_records;
DROP TABLE IF EXISTS trading_metrics_daily;
DROP TABLE IF EXISTS trading_metrics_summary;

-- Create the trade_records table to store individual trades
CREATE TABLE trade_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    trade_date DATE NOT NULL,
    ticker VARCHAR(20) NOT NULL,
    entry_price DECIMAL(10,2) NOT NULL,
    exit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    trade_type ENUM('BUY', 'SELL') NOT NULL,
    profit_loss DECIMAL(10,2) NOT NULL,
    trade_status ENUM('PROFIT', 'LOSS') NOT NULL,
    description VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_trade_date (trade_date),
    INDEX idx_ticker (ticker),
    INDEX idx_trade_status (trade_status)
);

-- Create a daily metrics table to track daily performance
CREATE TABLE trading_metrics_daily (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    trade_date DATE NOT NULL UNIQUE,
    total_trades INT NOT NULL DEFAULT 0,
    winning_trades INT NOT NULL DEFAULT 0,
    losing_trades INT NOT NULL DEFAULT 0,
    total_profit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    total_loss DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    net_pnl DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    winning_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_trade_date (trade_date)
);

-- Create a summary metrics table for overall performance
CREATE TABLE trading_metrics_summary (
    id INT PRIMARY KEY DEFAULT 1,
    first_trade_date DATE,
    last_trade_date DATE,
    total_trading_days INT NOT NULL DEFAULT 0,
    total_trades INT NOT NULL DEFAULT 0,
    winning_trades INT NOT NULL DEFAULT 0,
    losing_trades INT NOT NULL DEFAULT 0,
    winning_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    
    avg_profit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    avg_loss DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    max_profit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    max_loss DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    
    total_profit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    total_loss DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    net_pnl DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    
    max_drawdown_days INT NOT NULL DEFAULT 0,
    current_drawdown_days INT NOT NULL DEFAULT 0,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initialize the summary record
INSERT INTO trading_metrics_summary (id) VALUES (1);

-- Create triggers to update metrics when trades are added, updated or deleted
DELIMITER //

-- Trigger to update daily metrics when a new trade is inserted
CREATE TRIGGER after_trade_insert
AFTER INSERT ON trade_records
FOR EACH ROW
BEGIN
    DECLARE day_exists INT;
    
    -- Check if we already have a record for this date
    SELECT COUNT(*) INTO day_exists FROM trading_metrics_daily 
    WHERE trade_date = NEW.trade_date;
    
    IF day_exists = 0 THEN
        -- Create a new daily record
        INSERT INTO trading_metrics_daily (
            trade_date, 
            total_trades,
            winning_trades,
            losing_trades,
            total_profit,
            total_loss,
            net_pnl,
            winning_percentage
        ) VALUES (
            NEW.trade_date,
            1,
            IF(NEW.trade_status = 'PROFIT', 1, 0),
            IF(NEW.trade_status = 'LOSS', 1, 0),
            IF(NEW.trade_status = 'PROFIT', NEW.profit_loss, 0),
            IF(NEW.trade_status = 'LOSS', ABS(NEW.profit_loss), 0),
            NEW.profit_loss,
            IF(NEW.trade_status = 'PROFIT', 100.00, 0.00)
        );
    ELSE
        -- Update existing daily record
        UPDATE trading_metrics_daily
        SET 
            total_trades = total_trades + 1,
            winning_trades = winning_trades + IF(NEW.trade_status = 'PROFIT', 1, 0),
            losing_trades = losing_trades + IF(NEW.trade_status = 'LOSS', 1, 0),
            total_profit = total_profit + IF(NEW.trade_status = 'PROFIT', NEW.profit_loss, 0),
            total_loss = total_loss + IF(NEW.trade_status = 'LOSS', ABS(NEW.profit_loss), 0),
            net_pnl = net_pnl + NEW.profit_loss,
            winning_percentage = (winning_trades + IF(NEW.trade_status = 'PROFIT', 1, 0)) * 100.0 / (total_trades + 1)
        WHERE trade_date = NEW.trade_date;
    END IF;
    
    -- Update summary metrics
    CALL update_trading_summary();
END//

-- Trigger to update daily metrics when a trade is updated
CREATE TRIGGER after_trade_update
AFTER UPDATE ON trade_records
FOR EACH ROW
BEGIN
    -- Recalculate the daily metrics for both the old and new dates if they differ
    IF OLD.trade_date <> NEW.trade_date THEN
        CALL recalculate_daily_metrics(OLD.trade_date);
        CALL recalculate_daily_metrics(NEW.trade_date);
    ELSE
        CALL recalculate_daily_metrics(NEW.trade_date);
    END IF;
    
    -- Update summary metrics
    CALL update_trading_summary();
END//

-- Trigger to update daily metrics when a trade is deleted
CREATE TRIGGER after_trade_delete
AFTER DELETE ON trade_records
FOR EACH ROW
BEGIN
    CALL recalculate_daily_metrics(OLD.trade_date);
    CALL update_trading_summary();
END//

-- Stored procedure to recalculate metrics for a specific day
CREATE PROCEDURE recalculate_daily_metrics(IN p_date DATE)
BEGIN
    DECLARE day_trade_count INT;
    DECLARE day_win_count INT;
    DECLARE day_loss_count INT;
    DECLARE day_profit DECIMAL(12,2);
    DECLARE day_loss DECIMAL(12,2);
    DECLARE day_net_pnl DECIMAL(12,2);
    DECLARE day_win_percentage DECIMAL(5,2);
    
    -- Get counts and sums for the day
    SELECT 
        COUNT(*),
        SUM(IF(trade_status = 'PROFIT', 1, 0)),
        SUM(IF(trade_status = 'LOSS', 1, 0)),
        SUM(IF(trade_status = 'PROFIT', profit_loss, 0)),
        SUM(IF(trade_status = 'LOSS', ABS(profit_loss), 0)),
        SUM(profit_loss)
    INTO 
        day_trade_count, day_win_count, day_loss_count, 
        day_profit, day_loss, day_net_pnl
    FROM trade_records
    WHERE trade_date = p_date;
    
    -- Handle NULL values from empty results
    SET day_trade_count = IFNULL(day_trade_count, 0);
    SET day_win_count = IFNULL(day_win_count, 0);
    SET day_loss_count = IFNULL(day_loss_count, 0);
    SET day_profit = IFNULL(day_profit, 0);
    SET day_loss = IFNULL(day_loss, 0);
    SET day_net_pnl = IFNULL(day_net_pnl, 0);
    
    -- Calculate winning percentage
    IF day_trade_count > 0 THEN
        SET day_win_percentage = (day_win_count * 100.0) / day_trade_count;
    ELSE
        SET day_win_percentage = 0;
    END IF;
    
    -- Update or delete the daily record
    IF day_trade_count > 0 THEN
        -- Update if we have trades for this day
        INSERT INTO trading_metrics_daily (
            trade_date, total_trades, winning_trades, losing_trades,
            total_profit, total_loss, net_pnl, winning_percentage
        ) VALUES (
            p_date, day_trade_count, day_win_count, day_loss_count,
            day_profit, day_loss, day_net_pnl, day_win_percentage
        ) ON DUPLICATE KEY UPDATE
            total_trades = day_trade_count,
            winning_trades = day_win_count,
            losing_trades = day_loss_count,
            total_profit = day_profit,
            total_loss = day_loss,
            net_pnl = day_net_pnl,
            winning_percentage = day_win_percentage;
    ELSE
        -- Delete the day record if no trades
        DELETE FROM trading_metrics_daily WHERE trade_date = p_date;
    END IF;
END//

-- Stored procedure to update the summary metrics
CREATE PROCEDURE update_trading_summary()
BEGIN
    DECLARE max_consecutive_loss INT;
    DECLARE current_consecutive_loss INT;
    DECLARE prev_date DATE;
    DECLARE curr_date DATE;
    DECLARE is_loss BOOLEAN;
    DECLARE done BOOLEAN DEFAULT FALSE;
    
    -- Cursor to iterate through days in chronological order
    DECLARE day_cursor CURSOR FOR 
        SELECT trade_date, net_pnl < 0 
        FROM trading_metrics_daily 
        ORDER BY trade_date;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Initialize counters for drawdown calculation
    SET max_consecutive_loss = 0;
    SET current_consecutive_loss = 0;
    
    -- Calculate drawdown (consecutive losing days)
    OPEN day_cursor;
    
    read_loop: LOOP
        FETCH day_cursor INTO curr_date, is_loss;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF is_loss THEN
            -- Check if this is consecutive with previous day
            IF prev_date IS NULL OR DATEDIFF(curr_date, prev_date) = 1 THEN
                SET current_consecutive_loss = current_consecutive_loss + 1;
            ELSE
                SET current_consecutive_loss = 1;
            END IF;
            
            -- Update max if current streak is longer
            IF current_consecutive_loss > max_consecutive_loss THEN
                SET max_consecutive_loss = current_consecutive_loss;
            END IF;
        ELSE
            -- Reset current streak on a winning day
            SET current_consecutive_loss = 0;
        END IF;
        
        SET prev_date = curr_date;
    END LOOP;
    
    CLOSE day_cursor;
    
    -- Update summary table with all metrics
    UPDATE trading_metrics_summary
    SET 
        first_trade_date = (SELECT MIN(trade_date) FROM trade_records),
        last_trade_date = (SELECT MAX(trade_date) FROM trade_records),
        total_trading_days = (SELECT COUNT(DISTINCT trade_date) FROM trade_records),
        total_trades = (SELECT COUNT(*) FROM trade_records),
        winning_trades = (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'PROFIT'),
        losing_trades = (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'LOSS'),
        
        -- Calculate percentage stats
        winning_percentage = 
            CASE 
                WHEN (SELECT COUNT(*) FROM trade_records) > 0 
                THEN (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'PROFIT') * 100.0 / 
                     (SELECT COUNT(*) FROM trade_records)
                ELSE 0 
            END,
        
        -- Calculate profit/loss metrics
        avg_profit = 
            CASE 
                WHEN (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'PROFIT') > 0 
                THEN (SELECT SUM(profit_loss) FROM trade_records WHERE trade_status = 'PROFIT') / 
                     (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'PROFIT')
                ELSE 0 
            END,
        
        avg_loss = 
            CASE 
                WHEN (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'LOSS') > 0 
                THEN ABS((SELECT SUM(profit_loss) FROM trade_records WHERE trade_status = 'LOSS') / 
                     (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'LOSS'))
                ELSE 0 
            END,
        
        max_profit = 
            CASE 
                WHEN (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'PROFIT') > 0 
                THEN (SELECT MAX(profit_loss) FROM trade_records WHERE trade_status = 'PROFIT')
                ELSE 0 
            END,
        
        max_loss = 
            CASE 
                WHEN (SELECT COUNT(*) FROM trade_records WHERE trade_status = 'LOSS') > 0 
                THEN ABS((SELECT MIN(profit_loss) FROM trade_records WHERE trade_status = 'LOSS'))
                ELSE 0 
            END,
        
        -- Calculate total metrics
        total_profit = (SELECT IFNULL(SUM(profit_loss), 0) FROM trade_records WHERE trade_status = 'PROFIT'),
        total_loss = (SELECT IFNULL(ABS(SUM(profit_loss)), 0) FROM trade_records WHERE trade_status = 'LOSS'),
        net_pnl = (SELECT IFNULL(SUM(profit_loss), 0) FROM trade_records),
        
        -- Set drawdown metrics
        max_drawdown_days = max_consecutive_loss,
        current_drawdown_days = current_consecutive_loss
    WHERE id = 1;
END//

DELIMITER ;

-- Call this to ensure the summary is initialized
CALL update_trading_summary();
```

## Manual Trade Entry SQL

To insert a new trade manually, use this SQL template:

```sql
INSERT INTO trade_records 
(trade_date, ticker, entry_price, exit_price, quantity, trade_type, profit_loss, trade_status, description, notes)
VALUES 
('2025-07-07', 'TCS', 3500.00, 3550.00, 10, 'BUY', 500.00, 'PROFIT', 'Gap up opening trade', 'Strong momentum after quarterly results');
```

Modify the values as needed for your trades. The `profit_loss` should be the actual P&L value (positive for profit, negative for loss), and `trade_status` should be 'PROFIT' or 'LOSS' accordingly.

## Querying Key Metrics

To retrieve all the key metrics at once, run:

```sql
SELECT 
    total_trading_days,
    total_trades,
    winning_trades,
    losing_trades,
    winning_percentage,
    avg_profit,
    avg_loss,
    max_profit,
    max_loss,
    net_pnl,
    max_drawdown_days
FROM 
    trading_metrics_summary
WHERE 
    id = 1;
```

## Specific Metric Queries

### Average Profit
```sql
SELECT avg_profit FROM trading_metrics_summary WHERE id = 1;
```

### Average Loss
```sql
SELECT avg_loss FROM trading_metrics_summary WHERE id = 1;
```

### Maximum Profit
```sql
SELECT max_profit FROM trading_metrics_summary WHERE id = 1;
```

### Maximum Loss
```sql
SELECT max_loss FROM trading_metrics_summary WHERE id = 1;
```

### Win Percentage
```sql
SELECT winning_percentage FROM trading_metrics_summary WHERE id = 1;
```

### Drawdown
```sql
SELECT max_drawdown_days FROM trading_metrics_summary WHERE id = 1;
```

## Daily Performance Trend

To see daily performance over time:

```sql
SELECT 
    trade_date,
    total_trades,
    winning_trades,
    losing_trades,
    net_pnl,
    winning_percentage
FROM 
    trading_metrics_daily
ORDER BY 
    trade_date DESC;
```

## Implementation Notes

### Metric Formulas

1. **Average Profit** = Total profit / Number of profitable trades
2. **Average Loss** = Total loss / Number of losing trades  
3. **Maximum Profit** = Highest profit from a single trade
4. **Maximum Loss** = Highest loss from a single trade
5. **Win Percentage** = (Winning trades / Total trades) × 100
6. **Drawdown** = Maximum consecutive losing days

### Automatic Calculation

The system automatically calculates all metrics when:
- A new trade is inserted
- An existing trade is updated
- A trade is deleted

### Database Design

- **trade_records**: Stores individual trade details
- **trading_metrics_daily**: Tracks performance metrics by day
- **trading_metrics_summary**: Maintains overall performance statistics

## User Interface Integration

To integrate with your trading records page, you'll need to:

1. Create a form for manual trade entry with fields for:
   - Trade date (date picker)
   - Ticker symbol
   - Entry price
   - Exit price
   - Quantity
   - Trade type (BUY/SELL)
   - Description
   - Notes

2. Add dashboard cards to display the key metrics:
   - Average Profit
   - Average Loss
   - Maximum Profit
   - Maximum Loss
   - Win Percentage
   - Drawdown

3. Create Chart.js visualizations for:
   - Daily P&L trend
   - Win/Loss ratio
   - Profit distribution by ticker
   - Monthly performance

## Recommended Visualizations

1. **Daily P&L Chart**: Line chart showing profit/loss over time
2. **Win/Loss Ratio**: Doughnut chart showing proportion of winning vs losing trades
3. **Performance by Ticker**: Bar chart showing P&L for each ticker
4. **Monthly Performance**: Bar chart showing P&L aggregated by month

These visualizations can be implemented using the Chart.js library by querying the appropriate data from the MySQL database.
