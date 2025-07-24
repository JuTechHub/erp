-- MySQL Schema for Trading Records (Finance Module)
-- Use this script to create tables in your erp_hr MySQL database

DROP TABLE IF EXISTS trade_records;
DROP TABLE IF EXISTS daily_metrics;
DROP TABLE IF EXISTS summary_metrics;

CREATE TABLE trade_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trade_date DATE NOT NULL,
    ticker VARCHAR(32) NOT NULL,
    entry_price DECIMAL(15,4) NOT NULL,
    exit_price DECIMAL(15,4) NOT NULL,
    quantity INT NOT NULL,
    trade_type ENUM('BUY', 'SELL') NOT NULL,
    profit_loss DECIMAL(15,4) NOT NULL,
    trade_status ENUM('PROFIT', 'LOSS') NOT NULL,
    description TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_trade_date ON trade_records(trade_date);
CREATE INDEX idx_ticker ON trade_records(ticker);
CREATE INDEX idx_trade_status ON trade_records(trade_status);

CREATE TABLE daily_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trade_date DATE NOT NULL UNIQUE,
    daily_pnl DECIMAL(15,4) NOT NULL DEFAULT 0.0,
    trade_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_daily_trade_date ON daily_metrics(trade_date);

CREATE TABLE summary_metrics (
    id INT PRIMARY KEY,
    metric_date DATE NOT NULL,
    total_pnl DECIMAL(15,4) NOT NULL DEFAULT 0.0,
    winning_trades INT NOT NULL DEFAULT 0,
    losing_trades INT NOT NULL DEFAULT 0,
    total_trades INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO summary_metrics (id, metric_date, total_pnl, winning_trades, losing_trades, total_trades)
VALUES (1, CURDATE(), 0.0, 0, 0, 0)
ON DUPLICATE KEY UPDATE metric_date=CURDATE();
