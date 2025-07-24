-- Trading Records Management System SQL Schema for SQLite
-- For Alphaxine ERP Finance Module
-- Created: July 7, 2025

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS trade_records;
DROP TABLE IF EXISTS daily_metrics;
DROP TABLE IF EXISTS summary_metrics;

-- Create the trade_records table to store individual trades
CREATE TABLE trade_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trade_date TEXT NOT NULL, -- SQLite DATE format (YYYY-MM-DD)
    ticker TEXT NOT NULL,
    entry_price REAL NOT NULL,
    exit_price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    trade_type TEXT NOT NULL CHECK(trade_type IN ('BUY', 'SELL')),
    profit_loss REAL NOT NULL,
    trade_status TEXT NOT NULL CHECK(trade_status IN ('PROFIT', 'LOSS')),
    description TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for trade_records
CREATE INDEX idx_trade_date ON trade_records(trade_date);
CREATE INDEX idx_ticker ON trade_records(ticker);
CREATE INDEX idx_trade_status ON trade_records(trade_status);

-- Create a daily metrics table to track daily performance
CREATE TABLE daily_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trade_date TEXT NOT NULL UNIQUE, -- SQLite DATE format (YYYY-MM-DD)
    daily_pnl REAL NOT NULL DEFAULT 0.0,
    trade_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for daily_metrics
CREATE INDEX idx_daily_trade_date ON daily_metrics(trade_date);

-- Create a summary metrics table for overall performance
CREATE TABLE summary_metrics (
    id INTEGER PRIMARY KEY CHECK(id = 1),
    metric_date TEXT NOT NULL, -- SQLite DATE format (YYYY-MM-DD)
    total_pnl REAL NOT NULL DEFAULT 0.0,
    winning_trades INTEGER NOT NULL DEFAULT 0,
    losing_trades INTEGER NOT NULL DEFAULT 0,
    total_trades INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initialize the summary record with current date
INSERT INTO summary_metrics (id, metric_date, total_pnl, winning_trades, losing_trades, total_trades)
VALUES (1, date('now'), 0.0, 0, 0, 0);
