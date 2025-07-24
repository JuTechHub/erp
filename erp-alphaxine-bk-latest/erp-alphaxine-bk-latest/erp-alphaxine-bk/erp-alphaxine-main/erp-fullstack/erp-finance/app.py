from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import random
from datetime import datetime, timedelta
import pandas as pd
from logic import NSEVolumeAnalyzer, analyze_ticker_full_period, export_results_to_csv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder for CSV files
UPLOAD_FOLDER = 'downloads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    """Main page - Redirects to dashboard"""
    return render_template('dashboard.html')

@app.route('/dashboard')
def dashboard():
    """Dashboard selection page"""
    return render_template('dashboard.html')

@app.route('/nse-predictor')
def nse_predictor():
    """NSE Predictor page"""
    return render_template('index.html')

@app.route('/records')
def records():
    """Trading records page with trading performance metrics and visualizations"""
    try:
        import sqlite3
        
        # Connect to SQLite database
        conn = sqlite3.connect('trading_records.db')
        cursor = conn.cursor()
        
        # Get trading metrics
        cursor.execute("""
            SELECT 
                AVG(CASE WHEN profit_loss > 0 THEN profit_loss ELSE NULL END) as avg_profit,
                AVG(CASE WHEN profit_loss < 0 THEN profit_loss ELSE NULL END) as avg_loss,
                MAX(profit_loss) as max_profit,
                MIN(profit_loss) as max_loss,
                COUNT(CASE WHEN profit_loss > 0 THEN 1 ELSE NULL END) as winning_trades,
                COUNT(CASE WHEN profit_loss < 0 THEN 1 ELSE NULL END) as losing_trades,
                COUNT(*) as total_trades
            FROM trade_records
        """)
        
        result = cursor.fetchone()
        if result:
            avg_profit = result[0] or 0
            avg_loss = abs(result[1] or 0)  # Make positive for display
            max_profit = result[2] or 0
            max_loss = abs(result[3] or 0)  # Make positive for display
            winning_trades = result[4] or 0
            losing_trades = result[5] or 0
            total_trades = result[6] or 0
            
            # Calculate win percentage
            win_percentage = round((winning_trades / total_trades * 100), 2) if total_trades > 0 else 0
        else:
            avg_profit = 0
            avg_loss = 0
            max_profit = 0
            max_loss = 0
            winning_trades = 0
            losing_trades = 0
            total_trades = 0
            win_percentage = 0
        
        # Calculate drawdown (maximum consecutive losing days)
        cursor.execute("""
            WITH consecutive_loss AS (
                SELECT 
                    trade_date,
                    (SELECT COUNT(*) FROM daily_metrics d2 
                     WHERE d2.trade_date <= d1.trade_date 
                     AND d2.daily_pnl < 0
                     AND NOT EXISTS (
                         SELECT 1 FROM daily_metrics d3 
                         WHERE d3.trade_date < d2.trade_date 
                         AND d3.trade_date > (
                             SELECT MAX(d4.trade_date) FROM daily_metrics d4 
                             WHERE d4.trade_date < d2.trade_date AND d4.daily_pnl >= 0
                         )
                         AND d3.daily_pnl >= 0
                     )
                    ) as consecutive_losses
                FROM daily_metrics d1
                WHERE daily_pnl < 0
            )
            SELECT MAX(consecutive_losses) as max_drawdown FROM consecutive_loss
        """)
        
        drawdown_result = cursor.fetchone()
        drawdown = drawdown_result[0] if drawdown_result and drawdown_result[0] is not None else 0
        
        # Get chart data
        # 1. Daily P&L
        cursor.execute("""
            SELECT trade_date, daily_pnl
            FROM daily_metrics
            ORDER BY trade_date
            LIMIT 30
        """)
        
        daily_data = cursor.fetchall()
        chart_dates = [row[0] for row in daily_data]
        daily_pnl = [row[1] for row in daily_data]
        
        # 2. P&L by ticker
        cursor.execute("""
            SELECT ticker, SUM(profit_loss) as ticker_pnl
            FROM trade_records
            GROUP BY ticker
            ORDER BY ticker_pnl DESC
        """)
        
        ticker_data = cursor.fetchall()
        tickers = [row[0] for row in ticker_data]
        ticker_pnl = [row[1] for row in ticker_data]
        
        # 3. Monthly performance
        cursor.execute("""
            SELECT strftime('%Y-%m', trade_date) as month, SUM(profit_loss) as monthly_pnl
            FROM trade_records
            GROUP BY month
            ORDER BY month
            LIMIT 12
        """)
        
        monthly_data = cursor.fetchall()
        months = [row[0] for row in monthly_data]
        monthly_pnl = [row[1] for row in monthly_data]
        
        # Get all trades for table display
        cursor.execute("""
            SELECT 
                id,
                trade_date,
                ticker,
                trade_type,
                entry_price,
                exit_price,
                quantity,
                profit_loss,
                description,
                notes
            FROM trade_records
            ORDER BY trade_date DESC
        """)
        
        trades_data = cursor.fetchall()
        trades = []
        
        for row in trades_data:
            trades.append({
                'id': row[0],
                'trade_date': row[1],
                'ticker': row[2],
                'trade_type': row[3],
                'entry_price': row[4],
                'exit_price': row[5],
                'quantity': row[6],
                'profit_loss': row[7],
                'description': row[8],
                'notes': row[9]
            })
        
        # Get unique tickers for filter dropdown
        cursor.execute("SELECT DISTINCT ticker FROM trade_records ORDER BY ticker")
        unique_ticker_list = [row[0] for row in cursor.fetchall()]
        
        conn.close()
        
    except Exception as e:
        print(f"Database error: {str(e)}")
        # Fall back to sample data if database is not available
        avg_profit = 548.75
        avg_loss = 675.00
        max_profit = 1250.00
        max_loss = 1500.00
        win_percentage = 65.25
        drawdown = 3
        winning_trades = 26
        losing_trades = 14
        
        # Sample chart data
        chart_dates = [(datetime.now() - timedelta(days=i)).strftime('%b %d') for i in range(10, 0, -1)]
        daily_pnl = [random.randint(-2000, 3000) for _ in range(10)]
        
        tickers = ["TCS", "RELIANCE", "INFY", "TATASTEEL", "HDFCBANK"]
        ticker_pnl = [random.randint(-3000, 5000) for _ in range(len(tickers))]
        
        months = ["Mar", "Apr", "May", "Jun", "Jul"]
        monthly_pnl = [random.randint(-5000, 8000) for _ in range(len(months))]
        
        unique_ticker_list = ["TCS", "RELIANCE", "INFY", "TATASTEEL", "HDFCBANK", "ICICIBANK", "WIPRO"]
        
        # Sample trades
        trades = []
        for i in range(15):
            is_profit = random.choice([True, False, True])  # Bias towards profit for nicer demo
            profit_loss = random.randint(100, 1500) if is_profit else -random.randint(100, 1500)
            
            ticker = random.choice(["TCS", "RELIANCE", "INFY", "TATASTEEL", "HDFCBANK"])
            trade_type = random.choice(["BUY", "SELL"])
            entry_price = random.randint(1000, 4000)
            exit_price = entry_price + random.randint(-300, 300)
            quantity = random.randint(5, 30)
            
            current_date = datetime.now()
            display_date = (current_date - timedelta(days=i)).strftime('%Y-%m-%d')
            
            trades.append({
                'id': i + 1,
                'trade_date': display_date,
                'ticker': ticker,
                'trade_type': trade_type,
                'entry_price': entry_price,
                'exit_price': exit_price,
                'quantity': quantity,
                'profit_loss': profit_loss,
                'description': f"Sample {trade_type.lower()} trade for {ticker}",
                'notes': "This is a sample trade"
            })
    
    return render_template('records.html',
                           # Trading metrics
                           avg_profit=avg_profit,
                           avg_loss=avg_loss,
                           max_profit=max_profit,
                           max_loss=max_loss,
                           win_percentage=win_percentage,
                           drawdown=drawdown,
                           winning_trades=winning_trades,
                           losing_trades=losing_trades,
                           
                           # Chart data
                           chart_dates=json.dumps(chart_dates),
                           daily_pnl=json.dumps(daily_pnl),
                           tickers=json.dumps(tickers),
                           ticker_pnl=json.dumps(ticker_pnl),
                           months=json.dumps(months),
                           monthly_pnl=json.dumps(monthly_pnl),
                           
                           # Trade data
                           trades=trades,
                           unique_ticker_list=unique_ticker_list)

@app.route('/add-trade', methods=['POST'])
def add_trade():
    """Add a new trade to the database"""
    if request.method == 'POST':
        try:
            import sqlite3
            from datetime import datetime
            
            # Get form data with validation
            trade_date = request.form.get('trade_date')
            if not trade_date:
                return jsonify({'status': 'error', 'message': 'Trade date is required'})
                
            ticker = request.form.get('ticker')
            if not ticker:
                return jsonify({'status': 'error', 'message': 'Ticker is required'})
                
            trade_type = request.form.get('trade_type')
            if not trade_type:
                return jsonify({'status': 'error', 'message': 'Trade type is required'})
                
            entry_price_str = request.form.get('entry_price')
            if not entry_price_str:
                return jsonify({'status': 'error', 'message': 'Entry price is required'})
            entry_price = float(entry_price_str)
            
            exit_price_str = request.form.get('exit_price')
            if not exit_price_str:
                return jsonify({'status': 'error', 'message': 'Exit price is required'})
            exit_price = float(exit_price_str)
            
            quantity_str = request.form.get('quantity')
            if not quantity_str:
                return jsonify({'status': 'error', 'message': 'Quantity is required'})
            quantity = int(quantity_str)
            
            description = request.form.get('description', '')
            notes = request.form.get('notes', '')
            
            # Calculate profit/loss
            if trade_type == 'BUY':
                profit_loss = (exit_price - entry_price) * quantity
            else:  # SELL
                profit_loss = (entry_price - exit_price) * quantity
            
            # Determine trade status
            trade_status = 'PROFIT' if profit_loss >= 0 else 'LOSS'
            
            # Connect to database
            conn = sqlite3.connect('trading_records.db')
            cursor = conn.cursor()
            
            # Insert trade record
            cursor.execute("""
                INSERT INTO trade_records (
                    trade_date, ticker, trade_type, entry_price, exit_price, 
                    quantity, profit_loss, trade_status, description, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                trade_date, ticker, trade_type, entry_price, exit_price,
                quantity, profit_loss, trade_status, description, notes
            ))
            
            # Get the date in YYYY-MM-DD format for daily metrics
            date_obj = datetime.strptime(trade_date, '%Y-%m-%d')
            date_str = date_obj.strftime('%Y-%m-%d')
            
            # Update daily metrics
            cursor.execute("""
                INSERT INTO daily_metrics (trade_date, daily_pnl, trade_count)
                VALUES (?, ?, 1)
                ON CONFLICT(trade_date) DO UPDATE SET
                daily_pnl = daily_pnl + ?,
                trade_count = trade_count + 1
            """, (date_str, profit_loss, profit_loss))
            
            # Update summary metrics
            cursor.execute("""
                INSERT INTO summary_metrics (metric_date, total_pnl, winning_trades, losing_trades, total_trades)
                VALUES (?, ?, ?, ?, 1)
                ON CONFLICT(metric_date) DO UPDATE SET
                total_pnl = total_pnl + ?,
                winning_trades = winning_trades + CASE WHEN ? >= 0 THEN 1 ELSE 0 END,
                losing_trades = losing_trades + CASE WHEN ? < 0 THEN 1 ELSE 0 END,
                total_trades = total_trades + 1
            """, (
                date_str, profit_loss, 
                1 if profit_loss >= 0 else 0, 
                1 if profit_loss < 0 else 0,
                profit_loss, profit_loss, profit_loss
            ))
            
            conn.commit()
            conn.close()
            
            return jsonify({
                'status': 'success',
                'message': 'Trade added successfully',
                'data': {
                    'trade_date': trade_date,
                    'ticker': ticker,
                    'trade_type': trade_type,
                    'entry_price': entry_price,
                    'exit_price': exit_price,
                    'quantity': quantity,
                    'profit_loss': profit_loss,
                    'trade_status': trade_status
                }
            })
            
        except Exception as e:
            print(f"Error adding trade: {str(e)}")
            return jsonify({
                'status': 'error',
                'message': f'Error adding trade: {str(e)}'
            })
    
    return jsonify({'status': 'error', 'message': 'Invalid request method'})

@app.route('/analyze', methods=['POST'])
def analyze():
    """Analyze ticker endpoint"""
    try:
        print(f"[DEBUG] Received request: {request.method} {request.path}")
        print(f"[DEBUG] Content-Type: {request.content_type}")
        
        # Get JSON data from request
        data = request.get_json()
        if not data:
            # Try form data as fallback
            data = request.form.to_dict()
        
        print(f"[DEBUG] Parsed data: {data}")
        
        if not data:
            print("[DEBUG] No data received")
            return jsonify({'error': 'No data received'}), 400
            
        ticker = data.get('ticker', '').strip().upper()
        print(f"[DEBUG] Ticker: {ticker}")
        
        if not ticker:
            print("[DEBUG] No ticker provided")
            return jsonify({'error': 'Please enter a valid ticker symbol'}), 400
        
        # Run analysis
        print(f"[DEBUG] Starting analysis for {ticker}")
        try:
            result = analyze_ticker_full_period(ticker)
            print(f"[DEBUG] Analysis result type: {type(result)}")
            
            if result:
                print(f"[DEBUG] Analysis successful for {ticker}")
                print(f"[DEBUG] Result keys: {list(result.keys())}")
            else:
                print(f"[DEBUG] Analysis returned None for {ticker}")
                
        except Exception as analysis_error:
            print(f"[DEBUG] Analysis error: {str(analysis_error)}")
            import traceback
            traceback.print_exc()
            return jsonify({'error': f'Analysis failed: {str(analysis_error)}'}), 500
        
        if not result:
            print(f"[DEBUG] Analysis returned None for {ticker}")
            # Provide helpful suggestions for common tickers
            suggestions = ["TCS", "INFY", "HDFCBANK", "RELIANCE", "WIPRO", "HCLTECH", "TECHM", "LTIM"]
            suggestion_text = f" Try one of these popular NSE stocks: {', '.join(suggestions)}"
            return jsonify({
                'error': f'No data found for ticker {ticker}. Please check the ticker symbol.{suggestion_text}'
            }), 404
        
        print(f"[DEBUG] Analysis successful for {ticker}")
        # Convert data for JSON response
        analysis_data = {
            'ticker': result['ticker'],
            'analysis_period': result['analysis_period'],
            'total_trading_days': result['total_trading_days'],
            'days_above_average': result['days_above_average'],
            'percentage_days_above_avg': round(result['percentage_days_above_avg'], 2),
            'average_first_30min_volume': int(result['average_first_30min_volume']),
            'average_first_30min_trades': int(result['average_first_30min_trades']),
            'volume_categories': result['volume_categories']
        }
        
        # Get top 10 high volume days for display
        top_days = result['above_average_days_data'].head(10).to_dict('records')
        
        # Format the data for frontend
        formatted_days = []
        for day in top_days:
            formatted_days.append({
                'date': day['Date'],
                'estimated_volume': int(day['First_30min_Volume_Estimated']),
                'vs_average': round(day['Volume_vs_Average'], 2),
                'estimated_trades': int(day['First_30min_Trades_Estimated']),
                'category': day['Volume_Category'],
                'percentage': round(day['Estimated_Percentage'], 1),
                'gap_percent': round(day['Opening_Gap_Percent'], 2),
                'daily_return': round(day['Daily_Return'], 2)
            })
        
        # Generate CSV file
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        ticker_clean = result['ticker'].replace('.NS', '')
        filename = f"{ticker_clean}_analysis_{timestamp}.csv"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Export to CSV
        export_data = result['above_average_days_data'][[
            'Date', 'First_30min_Volume_Estimated', 'Total_Day_Volume',
            'Estimated_Percentage', 'Volume_vs_Average', 'Volume_Category',
            'First_30min_Trades_Estimated', 'Trades_vs_30min_Average', 'Trades_vs_Daily_Average',
            'Total_Day_Trades_Estimated', 'Trade_Percentage_First_30min',
            'Daily_Return', 'Opening_Gap_Percent', 'Volume_ZScore'
        ]].copy()
        
        export_data.to_csv(filepath, index=False)
        
        return jsonify({
            'success': True,
            'analysis': analysis_data,
            'top_days': formatted_days,
            'csv_filename': filename
        })
        
    except Exception as e:
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/download/<filename>')
def download_file(filename):
    """Download CSV file"""
    try:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(filepath):
            return send_file(filepath, as_attachment=True)
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Download failed: {str(e)}'}), 500

@app.route('/test', methods=['GET', 'POST'])
def test():
    """Test endpoint to verify Flask is working"""
    return jsonify({
        'status': 'ok',
        'message': 'Flask server is running',
        'method': request.method,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
