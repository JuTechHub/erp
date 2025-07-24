#!/usr/bin/env python3
"""
Test script to verify ticker data fetching works correctly
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from logic import analyze_ticker_full_period, NSEVolumeAnalyzer
import yfinance as yf
from datetime import datetime

def test_yfinance_direct():
    """Test yfinance directly"""
    print("Testing yfinance directly...")
    ticker = "TCS.NS"
    stock = yf.Ticker(ticker)
    data = stock.history(start="2022-01-01", end=datetime.now().strftime("%Y-%m-%d"))
    print(f"Direct yfinance test for {ticker}:")
    print(f"Data shape: {data.shape}")
    print(f"Data empty: {data.empty}")
    print(f"Date range: {data.index[0].date()} to {data.index[-1].date()}")
    print(f"Sample data:\n{data.head()}")
    return data

def test_analyzer_class():
    """Test NSEVolumeAnalyzer class"""
    print("\nTesting NSEVolumeAnalyzer class...")
    analyzer = NSEVolumeAnalyzer()
    success = analyzer.fetch_stock_data("TCS")
    print(f"Analyzer fetch success: {success}")
    if analyzer.data is not None:
        print(f"Analyzer data shape: {analyzer.data.shape}")
        print(f"Analyzer data empty: {analyzer.data.empty}")
        print(f"Analyzer data head:\n{analyzer.data.head()}")
    return analyzer

def test_full_analysis():
    """Test full analysis function"""
    print("\nTesting full analysis function...")
    try:
        result = analyze_ticker_full_period("TCS")
        if result:
            print(f"Analysis successful!")
            print(f"Ticker: {result['ticker']}")
            print(f"Total trading days: {result['total_trading_days']}")
            print(f"Days above average: {result['days_above_average']}")
            print(f"Analysis period: {result['analysis_period']}")
            return result
        else:
            print("Analysis returned None")
            return None
    except Exception as e:
        print(f"Analysis failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    print("="*60)
    print("TICKER DATA TESTING")
    print("="*60)
    
    # Test 1: Direct yfinance
    try:
        data = test_yfinance_direct()
    except Exception as e:
        print(f"Direct yfinance test failed: {e}")
    
    # Test 2: Analyzer class
    try:
        analyzer = test_analyzer_class()
    except Exception as e:
        print(f"Analyzer class test failed: {e}")
    
    # Test 3: Full analysis
    try:
        result = test_full_analysis()
    except Exception as e:
        print(f"Full analysis test failed: {e}")
    
    print("\n" + "="*60)
    print("TESTING COMPLETE")
    print("="*60)
