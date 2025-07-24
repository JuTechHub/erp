import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

class NSEVolumeAnalyzer:
    def __init__(self):
        self.data = None
        self.ticker = None
        self.start_date = "2022-01-01"  # Fixed start date
        self.end_date = datetime.now().strftime("%Y-%m-%d")  # Today

    def fetch_stock_data(self, ticker_symbol):
        """
        Fetch NSE stock data from January 1, 2022 to today

        Args:
            ticker_symbol (str):
        """
        try:
            # Clean and format ticker symbol
            original_ticker = ticker_symbol.strip().upper()
            
            # Common ticker mappings for NSE
            ticker_mappings = {
                'MPHASIS': 'MPHASIS.NS',
                'TCS': 'TCS.NS',
                'INFY': 'INFY.NS',
                'INFOSYS': 'INFY.NS',
                'HDFCBANK': 'HDFCBANK.NS',
                'HDFC': 'HDFCBANK.NS',
                'RELIANCE': 'RELIANCE.NS',
                'WIPRO': 'WIPRO.NS',
                'HCL': 'HCLTECH.NS',
                'HCLTECH': 'HCLTECH.NS',
                'TECHM': 'TECHM.NS',
                'LTI': 'LTIM.NS',  # LTI merged with Mindtree to form LTIM
                'MINDTREE': 'LTIM.NS',
                'LTIM': 'LTIM.NS'
            }
            
            # Check if we have a mapping for this ticker
            if original_ticker in ticker_mappings:
                ticker_symbol = ticker_mappings[original_ticker]
                print(f"Mapped {original_ticker} to {ticker_symbol}")
            else:
                # Ensure NSE suffix
                if not ticker_symbol.endswith('.NS'):
                    ticker_symbol = ticker_symbol + '.NS'

            self.ticker = ticker_symbol
            stock = yf.Ticker(ticker_symbol)

            print(f"Fetching data for {ticker_symbol} from {self.start_date} to {self.end_date}...")

            # Get daily data for the specified period
            self.data = stock.history(start=self.start_date, end=self.end_date)

            if self.data.empty:
                raise ValueError(f"No data found for ticker {ticker_symbol}")

            print(f"✓ Got daily data: {self.data.index[0].date()} to {self.data.index[-1].date()}")
            print(f"Total trading days: {len(self.data)}")

            return True

        except Exception as e:
            print(f"Error fetching data for {ticker_symbol}: {str(e)}")
            return False

    def estimate_trade_counts(self, volume, price, volatility_factor=1.0, volume_factor=1.0):
        """
        Estimate trade counts based on volume, price, and market conditions

        This uses market research patterns:
        - Higher priced stocks tend to have fewer but larger trades
        - Higher volatility increases trade frequency
        - NSE average trade size varies by stock tier
        """
        # Base average trade size estimation for NSE stocks
        # Large cap: ₹50,000-₹200,000 per trade
        # Mid cap: ₹25,000-₹100,000 per trade
        # Small cap: ₹10,000-₹50,000 per trade

        if price > 2000:  # Large cap assumption
            base_trade_size = 75000  # ₹75K average
        elif price > 500:  # Mid cap assumption
            base_trade_size = 40000  # ₹40K average
        else:  # Small cap assumption
            base_trade_size = 20000  # ₹20K average

        # Adjust for volatility (higher volatility = smaller trade sizes due to uncertainty)
        volatility_adjusted_trade_size = base_trade_size / volatility_factor

        # Adjust for volume conditions (high volume days may have different trade patterns)
        volume_adjusted_trade_size = volatility_adjusted_trade_size / (volume_factor ** 0.3)

        # Calculate estimated trade count
        trade_value = volume * price
        estimated_trades = trade_value / volume_adjusted_trade_size

        return max(1, int(estimated_trades))  # At least 1 trade

    def estimate_first_30min_volume_comprehensive(self):
        """
        Enhanced estimation of first 30-minute volume using multiple factors
        """
        if self.data is None or self.data.empty:
            return pd.DataFrame()

        print("Calculating estimated first 30-minute volumes and trade counts for all trading days...")

        daily_estimates = []

        # Calculate rolling statistics for better estimation
        self.data['Volume_MA5'] = self.data['Volume'].rolling(window=5).mean()
        self.data['Volume_MA20'] = self.data['Volume'].rolling(window=20).mean()
        self.data['Volume_Std20'] = self.data['Volume'].rolling(window=20).std()

        # Calculate previous day's close for gap analysis
        self.data['Prev_Close'] = self.data['Close'].shift(1)

        # Calculate daily trade estimates for comparison
        daily_trade_estimates = []

        for idx, row in self.data.iterrows():
            # Convert pandas datetime index to date properly
            date = str(idx)[:10]  # Get YYYY-MM-DD format

            daily_volume = row['Volume']
            opening_price = row['Open']
            high_price = row['High']
            low_price = row['Low']
            close_price = row['Close']
            prev_close = row['Prev_Close']

            # Skip first few days where we don't have enough rolling data
            if pd.isna(row['Volume_MA20']) or pd.isna(prev_close):
                continue

            # Factor 1: Daily volatility (higher volatility = more early trading)
            daily_range = (high_price - low_price) / opening_price * 100

            # Factor 2: Opening gap (price gap from previous close)
            opening_gap = abs((opening_price - prev_close) / prev_close * 100) if prev_close > 0 else 0

            # Factor 3: Volume relative to moving averages
            volume_vs_ma5 = daily_volume / row['Volume_MA5'] if row['Volume_MA5'] > 0 else 1
            volume_vs_ma20 = daily_volume / row['Volume_MA20'] if row['Volume_MA20'] > 0 else 1

            # Factor 4: Volume z-score (how unusual is this volume?)
            volume_zscore = (daily_volume - row['Volume_MA20']) / row['Volume_Std20'] if row['Volume_Std20'] > 0 else 0

            # Base percentage assumption (market research suggests 12-18% typically)
            base_percentage = 15

            # Adjustment multipliers
            volatility_multiplier = 1 + (daily_range / 100) * 0.5  # Higher volatility increases early trading
            gap_multiplier = 1 + (opening_gap / 10) * 0.3  # Larger gaps increase early trading
            volume_multiplier = 1 + (volume_vs_ma20 - 1) * 0.4  # Higher than average volume increases early trading
            zscore_multiplier = 1 + max(0, volume_zscore) * 0.1  # Unusual volume increases early trading

            # Day of week effect (Mondays and Fridays tend to have different patterns)
            day_of_week = pd.Timestamp(str(idx)).weekday()  # 0=Monday, 4=Friday
            day_multiplier = 1.1 if day_of_week in [0, 4] else 1.0  # Slight increase for Mon/Fri

            # Calculate final estimated percentage
            estimated_percentage = base_percentage * volatility_multiplier * gap_multiplier * volume_multiplier * zscore_multiplier * day_multiplier

            # Cap the percentage (realistic bounds)
            estimated_percentage = max(5, min(estimated_percentage, 45))

            estimated_first_30min_volume = daily_volume * (estimated_percentage / 100)

            # Calculate trade counts
            volatility_factor = 1 + (daily_range / 100)  # Higher volatility factor
            volume_factor = volume_vs_ma20  # Volume factor

            # Daily trade count estimation
            daily_trades = self.estimate_trade_counts(daily_volume, opening_price, volatility_factor, volume_factor)

            # First 30-min trade count estimation
            # Trade intensity is typically higher in first 30 minutes
            # Research shows 20-30% of trades happen in first 30 minutes (higher percentage than volume)
            trade_percentage_multiplier = 1.4  # Trades are more concentrated early than volume
            estimated_trade_percentage = min(45, estimated_percentage * trade_percentage_multiplier)

            first_30min_trades = int(daily_trades * (estimated_trade_percentage / 100))

            daily_estimates.append({
                'Date': date,
                'First_30min_Volume_Estimated': estimated_first_30min_volume,
                'Total_Day_Volume': daily_volume,
                'Estimated_Percentage': estimated_percentage,
                'First_30min_Trades_Estimated': first_30min_trades,
                'Total_Day_Trades_Estimated': daily_trades,
                'Trade_Percentage_First_30min': estimated_trade_percentage,
                'Daily_Range_Percent': daily_range,
                'Opening_Gap_Percent': opening_gap,
                'Volume_vs_MA5': volume_vs_ma5,
                'Volume_vs_MA20': volume_vs_ma20,
                'Volume_ZScore': volume_zscore,
                'Opening_Price': opening_price,
                'Close_Price': close_price,
                'Daily_Return': ((close_price - opening_price) / opening_price * 100),
                'Day_of_Week': day_of_week,
                'Volatility_Multiplier': volatility_multiplier,
                'Gap_Multiplier': gap_multiplier,
                'Volume_Multiplier': volume_multiplier
            })

            daily_trade_estimates.append(daily_trades)

        df = pd.DataFrame(daily_estimates)

        # Calculate average daily trades for the entire period
        if daily_trade_estimates:
            avg_daily_trades = np.mean(daily_trade_estimates)
            avg_first_30min_trades = df['First_30min_Trades_Estimated'].mean()

            # Add trade multiples
            df['Trades_vs_Daily_Average'] = pd.to_numeric(df['First_30min_Trades_Estimated'], errors='coerce').astype(float) / float(avg_daily_trades)
            df['Daily_Trades_vs_Average'] = pd.to_numeric(df['Total_Day_Trades_Estimated'], errors='coerce').astype(float) / float(avg_daily_trades)

            print(f"Average daily trades (estimated): {avg_daily_trades:,.0f}")
            print(f"Average first 30-min trades (estimated): {avg_first_30min_trades:,.0f}")

        return df

    def find_all_above_average_days(self):
        """
        Find ALL days where first 30-minute volume is above average
        """
        df = self.estimate_first_30min_volume_comprehensive()

        if df.empty:
            return pd.DataFrame(), 0, 0

        # Calculate average first 30-minute volume for the entire period
        avg_first_30min_volume = df['First_30min_Volume_Estimated'].mean()
        median_first_30min_volume = df['First_30min_Volume_Estimated'].median()
        std_first_30min_volume = df['First_30min_Volume_Estimated'].std()

        # Calculate average first 30-minute trades
        avg_first_30min_trades = df['First_30min_Trades_Estimated'].mean()

        print(f"Average first 30-min volume: {avg_first_30min_volume:,.0f}")
        print(f"Median first 30-min volume: {median_first_30min_volume:,.0f}")
        print(f"Standard deviation: {std_first_30min_volume:,.0f}")
        print(f"Average first 30-min trades: {avg_first_30min_trades:,.0f}")

        # Find ALL days above average
        above_avg_days = df[df['First_30min_Volume_Estimated'] > avg_first_30min_volume].copy()

        # Add comprehensive metrics
        above_avg_days['Volume_vs_Average'] = (
            above_avg_days['First_30min_Volume_Estimated'] / avg_first_30min_volume
        )

        above_avg_days['Volume_vs_Median'] = (
            above_avg_days['First_30min_Volume_Estimated'] / median_first_30min_volume
        )

        above_avg_days['Trades_vs_30min_Average'] = (
            above_avg_days['First_30min_Trades_Estimated'] / avg_first_30min_trades
        )

        above_avg_days['Excess_Volume'] = (
            above_avg_days['First_30min_Volume_Estimated'] - avg_first_30min_volume
        )

        above_avg_days['Volume_Percentile'] = above_avg_days['First_30min_Volume_Estimated'].rank(pct=True) * 100

        # Categorize the volume levels
        above_avg_days['Volume_Category'] = pd.cut(
            above_avg_days['Volume_vs_Average'],
            bins=[0, 1.5, 2.0, 3.0, float('inf')],
            labels=['Moderate', 'High', 'Very High', 'Extreme']
        )

        # Sort by volume ratio (highest first)
        above_avg_days = above_avg_days.sort_values('Volume_vs_Average', ascending=False)

        return above_avg_days, avg_first_30min_volume, avg_first_30min_trades

    def analyze_ticker_comprehensive(self, ticker_symbol):
        """
        Complete comprehensive analysis for a given ticker from Jan 1, 2022 to today
        """
        print(f"\n{'='*80}")
        print(f"COMPREHENSIVE ANALYSIS: {ticker_symbol}")
        print(f"Period: January 1, 2022 to {self.end_date}")
        print(f"{'='*80}")

        # Fetch data
        if not self.fetch_stock_data(ticker_symbol):
            return None

        # Get all above-average days
        above_avg_days, avg_volume, avg_trades = self.find_all_above_average_days()

        if above_avg_days.empty:
            print("No days found with above-average first 30-minute volume.")
            return None

        # Calculate comprehensive statistics
        total_trading_days = len(self.data) if self.data is not None else 0
        days_above_average = len(above_avg_days)

        # Create detailed results
        results = {
            'ticker': ticker_symbol,
            'analysis_period': f"{self.start_date} to {self.end_date}",
            'total_trading_days': total_trading_days,
            'days_above_average': days_above_average,
            'percentage_days_above_avg': (days_above_average / total_trading_days * 100),
            'average_first_30min_volume': avg_volume,
            'average_first_30min_trades': avg_trades,
            'highest_volume_day': above_avg_days.iloc[0] if not above_avg_days.empty else None,
            'above_average_days_data': above_avg_days,
            'volume_categories': above_avg_days['Volume_Category'].value_counts().to_dict()
        }

        # Print comprehensive summary
        print(f"\n📊 COMPREHENSIVE SUMMARY:")
        print(f"Analysis Period: {results['analysis_period']}")
        print(f"Total Trading Days: {results['total_trading_days']:,}")
        print(f"Days Above Average: {results['days_above_average']:,}")
        print(f"Percentage Above Average: {results['percentage_days_above_avg']:.1f}%")
        print(f"Average First 30-min Volume: {results['average_first_30min_volume']:,.0f}")
        print(f"Average First 30-min Trades: {results['average_first_30min_trades']:,.0f}")

        # Volume category breakdown
        print(f"\n📈 VOLUME CATEGORY BREAKDOWN:")
        for category, count in results['volume_categories'].items():
            percentage = (count / days_above_average * 100)
            print(f"{category}: {count:,} days ({percentage:.1f}%)")

        # ALL high volume days with better spacing
        if not above_avg_days.empty:
            print(f"\n🏆 ALL HIGH VOLUME DAYS ({len(above_avg_days):,} TOTAL):")
            # Increased spacing between columns
            separator_line = "-" * 170
            print(separator_line)
            print(f"{'Date':<14}  {'Est.Volume':<18}  {'vs Avg':<10}  {'Est.Trades':<14}  {'Trade vs Avg':<14}  {'Category':<14}  {'Est.%':<10}  {'Gap%':<10}  {'Return%':<12}")
            print(separator_line)

            # Display ALL above-average days with better spacing
            for i, (_, row) in enumerate(above_avg_days.iterrows(), 1):
                print(f"{row['Date']!s:<14}  "
                      f"{row['First_30min_Volume_Estimated']:>16.0f}  "
                      f"{row['Volume_vs_Average']:>8.2f}x  "
                      f"{row['First_30min_Trades_Estimated']:>12.0f}  "
                      f"{row['Trades_vs_30min_Average']:>12.2f}x  "
                      f"{row['Volume_Category']!s:<14}  "
                      f"{row['Estimated_Percentage']:>8.1f}%  "
                      f"{row['Opening_Gap_Percent']:>8.2f}%  "
                      f"{row['Daily_Return']:>10.2f}%")

                # Add separator every 25 lines for better readability
                if i % 25 == 0 and i < len(above_avg_days):
                    print(separator_line)

        # Monthly/Yearly breakdown
        above_avg_days['Year'] = pd.to_datetime(above_avg_days['Date']).dt.year
        above_avg_days['Month'] = pd.to_datetime(above_avg_days['Date']).dt.month

        yearly_counts = above_avg_days['Year'].value_counts().sort_index()
        print(f"\n📅 YEARLY BREAKDOWN:")
        for year, count in yearly_counts.items():
            if self.data is not None:
                total_days_year = len(self.data[pd.to_datetime(self.data.index).year == year])
            else:
                total_days_year = 0
            percentage = (count / total_days_year * 100) if total_days_year > 0 else 0
            print(f"{year}: {count:,} days ({percentage:.1f}% of {total_days_year} trading days)")

        return results

def analyze_ticker_full_period(ticker_symbol):
    """
    Main function to analyze a ticker from January 1, 2022 to today

    Args:
        ticker_symbol (str): NSE stock ticker (with or without .NS suffix)

    Returns:
        dict: Comprehensive analysis results with ALL above-average days
    """
    analyzer = NSEVolumeAnalyzer()
    return analyzer.analyze_ticker_comprehensive(ticker_symbol)

def export_results_to_csv(results, filename=None):
    """
    Export the above-average days to a CSV file

    Args:
        results (dict): Results from analyze_ticker_full_period
        filename (str): Optional filename, auto-generated if not provided
    """
    if not results or results['above_average_days_data'].empty:
        print("No data to export.")
        return

    if filename is None:
        ticker_clean = results['ticker'].replace('.NS', '')
        # Add timestamp to make filename unique for each run
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{ticker_clean}_high_volume_days_{timestamp}.csv"

    # Select key columns for export including the new trade columns
    export_data = results['above_average_days_data'][[
        'Date', 'First_30min_Volume_Estimated', 'Total_Day_Volume',
        'Estimated_Percentage', 'Volume_vs_Average', 'Volume_Category',
        'First_30min_Trades_Estimated', 'Trades_vs_30min_Average', 'Trades_vs_Daily_Average',
        'Total_Day_Trades_Estimated', 'Trade_Percentage_First_30min',
        'Daily_Return', 'Opening_Gap_Percent', 'Volume_ZScore'
    ]].copy()

    export_data.to_csv(filename, index=False)
    print(f"✓ Results exported to: {filename}")
    print(f"Total records: {len(export_data):,}")

def main():
    """
    Example usage for comprehensive analysis
    """
    print("NSE Stock Volume Analyzer - Full Period Analysis with Trade Count Estimation")
    print("Analyzing first 30-minute trading volume and trade counts from January 1, 2022 to today")
    print("="*80)

    # Get ticker from user input
    ticker = input("\nEnter NSE stock ticker (e.g., TCS, INFY, HDFCBANK, MPHASIS): ").strip().upper()
    
    if not ticker:
        print("❌ No ticker entered. Using default: MPHASIS")
        ticker = 'MPHASIS'

    print(f"\nAnalyzing {ticker}...")
    result = analyze_ticker_full_period(ticker)

    if result:
        # Export to CSV
        export_results_to_csv(result)

        print(f"\n✅ Analysis complete for {ticker}")
        print(f"Found {result['days_above_average']:,} days with above-average first 30-minute volume")
        print(f"\n📝 NOTE: Trade count estimates are based on market research patterns.")
        print(f"Actual trade counts may vary. For precise trade data, use exchange APIs or professional data providers.")

    return result

if __name__ == "__main__":
    # Run example analysis
    result = main()


    # How to use for different tickers:
    print("\n" + "="*80)
    print("TO ANALYZE OTHER TICKERS:")
    print("result = analyze_ticker_full_period('TCS')")
    print("result = analyze_ticker_full_period('INFY')")
    print("result = analyze_ticker_full_period('HDFCBANK')")
    print("export_results_to_csv(result)  # To save to CSV")