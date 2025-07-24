#!/usr/bin/env python
"""
Initialize the SQLite database for the Trading Records system
"""
import sqlite3
import os
import sys
from datetime import datetime

# Path to the database
DB_PATH = 'trading_records.db'

def init_database():
    """Initialize the SQLite database with schema"""
    # Check if database already exists
    if os.path.exists(DB_PATH):
        choice = input(f"Database {DB_PATH} already exists. Do you want to reset it? (y/n): ")
        if choice.lower() != 'y':
            print("Database initialization cancelled.")
            return False
    
    conn = None
    try:
        # Connect to database (creates it if it doesn't exist)
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Drop existing tables
        cursor.execute("DROP TABLE IF EXISTS trade_records")
        cursor.execute("DROP TABLE IF EXISTS daily_metrics")
        cursor.execute("DROP TABLE IF EXISTS summary_metrics")
        
        # Create trade_records table
        cursor.execute("""
        CREATE TABLE trade_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trade_date TEXT NOT NULL,
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
        )
        """)
        
        # Create indexes for trade_records
        cursor.execute("CREATE INDEX idx_trade_date ON trade_records(trade_date)")
        cursor.execute("CREATE INDEX idx_ticker ON trade_records(ticker)")
        cursor.execute("CREATE INDEX idx_trade_status ON trade_records(trade_status)")
        
        # Create daily_metrics table
        cursor.execute("""
        CREATE TABLE daily_metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trade_date TEXT NOT NULL UNIQUE,
            daily_pnl REAL NOT NULL DEFAULT 0.0,
            trade_count INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        
        # Create index for daily_metrics
        cursor.execute("CREATE INDEX idx_daily_trade_date ON daily_metrics(trade_date)")
        
        # Create summary_metrics table
        cursor.execute("""
        CREATE TABLE summary_metrics (
            id INTEGER PRIMARY KEY CHECK(id = 1),
            metric_date TEXT NOT NULL,
            total_pnl REAL NOT NULL DEFAULT 0.0,
            winning_trades INTEGER NOT NULL DEFAULT 0,
            losing_trades INTEGER NOT NULL DEFAULT 0,
            total_trades INTEGER NOT NULL DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        
        # Initialize the summary record with current date
        today = datetime.now().strftime('%Y-%m-%d')
        cursor.execute("""
        INSERT INTO summary_metrics (id, metric_date, total_pnl, winning_trades, losing_trades, total_trades)
        VALUES (1, ?, 0.0, 0, 0, 0)
        """, (today,))
        
        conn.commit()
        print(f"Database {DB_PATH} initialized successfully.")
        
        return True
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return False
    
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    init_database()
