import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('dashboard');
  const [ticker, setTicker] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!ticker.trim()) {
      setError('Please enter a ticker symbol');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysisResult(null);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker: ticker.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to connect to finance service. Please ensure the finance module is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/download/${filename}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download CSV file');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'volume-analyzer':
        return (
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">NSE Volume Analyzer</h2>
                
                {/* Input Section */}
                <div className="mb-6">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Stock Ticker (NSE)
                      </label>
                      <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                        placeholder="e.g., RELIANCE, TCS, INFY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                {/* Results Section */}
                {analysisResult && (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                        <h3 className="text-sm font-medium opacity-90">Total Trading Days</h3>
                        <p className="text-2xl font-bold">{analysisResult.analysis.total_trading_days}</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                        <h3 className="text-sm font-medium opacity-90">Above Average Days</h3>
                        <p className="text-2xl font-bold">{analysisResult.analysis.days_above_average}</p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                        <h3 className="text-sm font-medium opacity-90">Success Rate</h3>
                        <p className="text-2xl font-bold">{analysisResult.analysis.percentage_days_above_avg}%</p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                        <h3 className="text-sm font-medium opacity-90">Avg 30min Volume</h3>
                        <p className="text-2xl font-bold">{analysisResult.analysis.average_first_30min_volume.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Analysis Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Analysis Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Ticker:</strong> {analysisResult.analysis.ticker}
                        </div>
                        <div>
                          <strong>Analysis Period:</strong> {analysisResult.analysis.analysis_period}
                        </div>
                        <div>
                          <strong>Avg 30min Trades:</strong> {analysisResult.analysis.average_first_30min_trades.toLocaleString()}
                        </div>
                        <div>
                          <strong>Volume Categories:</strong> {Object.keys(analysisResult.analysis.volume_categories).join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Top High Volume Days */}
                    <div className="bg-white rounded-lg border">
                      <div className="px-4 py-3 border-b bg-gray-50">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Top High Volume Days</h3>
                          <button
                            onClick={() => handleDownloadCSV(analysisResult.csv_filename)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                          >
                            Download CSV
                          </button>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Volume</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vs Average</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gap %</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Daily Return</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {analysisResult.top_days.map((day, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{day.date}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{day.estimated_volume.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{day.vs_average}x</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    day.category === 'Very High' ? 'bg-red-100 text-red-800' :
                                    day.category === 'High' ? 'bg-orange-100 text-orange-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {day.category}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{day.gap_percent}%</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{day.daily_return}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Finance Dashboard!</h2>
              <p className="text-gray-600">Manage your financial operations and analytics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">₹0</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Expenses</p>
                    <p className="text-3xl font-bold text-gray-900">₹0</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Net Profit</p>
                    <p className="text-3xl font-bold text-gray-900">₹0</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Outstanding Invoices</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                onClick={() => setCurrentView('volume-analyzer')}
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Volume Analyzer</h3>
                    <p className="text-sm text-gray-600">Analyze NSE stock volume patterns</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold">💰</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Invoicing</h3>
                    <p className="text-sm text-gray-600">Create and manage invoices</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold">📈</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Reports</h3>
                    <p className="text-sm text-gray-600">Financial reports and analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/superadmin/dashboard-selection")}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition-colors"
            >
              ← Back to Modules
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              {currentView === 'dashboard' ? 'Finance Dashboard' : 
               currentView === 'volume-analyzer' ? 'NSE Volume Analyzer' : 'Finance Dashboard'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
            </button>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">FA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  );
};

export default FinanceDashboard;
