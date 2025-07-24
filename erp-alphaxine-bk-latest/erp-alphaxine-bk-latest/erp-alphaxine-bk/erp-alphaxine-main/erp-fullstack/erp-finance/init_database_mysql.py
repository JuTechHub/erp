# Initialize the MySQL database for Trading Records
import mysql.connector
from datetime import datetime
from mysql_config import get_mysql_connection

def init_database():
    conn = None
    try:
        conn = get_mysql_connection()
        cursor = conn.cursor()

        # Drop existing tables
        cursor.execute("DROP TABLE IF EXISTS trade_records")
        cursor.execute("DROP TABLE IF EXISTS daily_metrics")
        cursor.execute("DROP TABLE IF EXISTS summary_metrics")

        # Create trade_records table
        cursor.execute("""
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
        )
        """)
        cursor.execute("CREATE INDEX idx_trade_date ON trade_records(trade_date)")
        cursor.execute("CREATE INDEX idx_ticker ON trade_records(ticker)")
        cursor.execute("CREATE INDEX idx_trade_status ON trade_records(trade_status)")

        # Create daily_metrics table
        cursor.execute("""
        CREATE TABLE daily_metrics (
            id INT AUTO_INCREMENT PRIMARY KEY,
            trade_date DATE NOT NULL UNIQUE,
            daily_pnl DECIMAL(15,4) NOT NULL DEFAULT 0.0,
            trade_count INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        """)
        cursor.execute("CREATE INDEX idx_daily_trade_date ON daily_metrics(trade_date)")

        # Create summary_metrics table
        cursor.execute("""
        CREATE TABLE summary_metrics (
            id INT PRIMARY KEY,
            metric_date DATE NOT NULL,
            total_pnl DECIMAL(15,4) NOT NULL DEFAULT 0.0,
            winning_trades INT NOT NULL DEFAULT 0,
            losing_trades INT NOT NULL DEFAULT 0,
            total_trades INT NOT NULL DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        """)

        # Initialize the summary record with current date
        today = datetime.now().strftime('%Y-%m-%d')
        cursor.execute("""
        INSERT INTO summary_metrics (id, metric_date, total_pnl, winning_trades, losing_trades, total_trades)
        VALUES (1, %s, 0.0, 0, 0, 0)
        ON DUPLICATE KEY UPDATE metric_date=%s
        """, (today, today))

        conn.commit()
        print("MySQL Trading Records tables initialized successfully.")
        return True
    except mysql.connector.Error as e:
        print(f"MySQL error: {e}")
        return False
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    init_database()
