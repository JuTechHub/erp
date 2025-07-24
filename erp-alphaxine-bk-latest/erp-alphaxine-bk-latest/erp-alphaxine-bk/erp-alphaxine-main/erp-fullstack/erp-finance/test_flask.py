#!/usr/bin/env python3
"""
Test Flask endpoint directly
"""

import requests
import json

def test_flask_endpoint():
    """Test the Flask /analyze endpoint"""
    url = "http://127.0.0.1:5000/analyze"
    
    # Test data
    test_data = {
        "ticker": "TCS"
    }
    
    print("Testing Flask /analyze endpoint...")
    print(f"URL: {url}")
    print(f"Data: {test_data}")
    
    try:
        response = requests.post(
            url,
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            result = response.json()
            print("SUCCESS!")
            print(f"Analysis data keys: {list(result.keys())}")
            if 'analysis' in result:
                print(f"Analysis keys: {list(result['analysis'].keys())}")
                print(f"Ticker: {result['analysis']['ticker']}")
                print(f"Total trading days: {result['analysis']['total_trading_days']}")
                print(f"Days above average: {result['analysis']['days_above_average']}")
        else:
            print(f"ERROR: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to Flask server. Make sure it's running on port 5000.")
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    test_flask_endpoint()
