#!/usr/bin/env python3
"""
Test the analyze function directly in the Flask app context
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app
from logic import analyze_ticker_full_period
import json

def test_analyze_endpoint():
    """Test the analyze endpoint directly"""
    print("Testing Flask analyze endpoint directly...")
    
    # Create test client
    with app.test_client() as client:
        # Test data
        test_data = {
            "ticker": "TCS"
        }
        
        print(f"Sending request with data: {test_data}")
        
        # Make request
        response = client.post('/analyze', 
                             data=json.dumps(test_data),
                             content_type='application/json')
        
        print(f"Response status: {response.status_code}")
        print(f"Response data: {response.data.decode()}")
        
        if response.status_code == 200:
            result = json.loads(response.data.decode())
            print("SUCCESS!")
            print(f"Result keys: {list(result.keys())}")
            if 'analysis' in result:
                print(f"Analysis keys: {list(result['analysis'].keys())}")
        else:
            print(f"ERROR: {response.status_code}")
            print(f"Response: {response.data.decode()}")

def test_direct_function():
    """Test the analyze function directly"""
    print("\nTesting analyze function directly...")
    try:
        result = analyze_ticker_full_period("TCS")
        if result:
            print(f"Direct function SUCCESS!")
            print(f"Result keys: {list(result.keys())}")
            print(f"Ticker: {result['ticker']}")
            print(f"Days above average: {result['days_above_average']}")
        else:
            print("Direct function returned None")
    except Exception as e:
        print(f"Direct function ERROR: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("="*60)
    print("FLASK ENDPOINT TESTING")
    print("="*60)
    
    # Test direct function first
    test_direct_function()
    
    # Test Flask endpoint
    test_analyze_endpoint()
    
    print("\n" + "="*60)
    print("TESTING COMPLETE")
    print("="*60)
