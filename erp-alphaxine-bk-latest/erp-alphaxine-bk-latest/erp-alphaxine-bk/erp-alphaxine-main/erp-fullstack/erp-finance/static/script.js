// Global variables
let currentAnalysis = null;
let csvFilename = null;

// DOM elements
const analysisForm = document.getElementById('analysisForm');
const tickerInput = document.getElementById('ticker');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const downloadBtn = document.getElementById('downloadBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    analysisForm.addEventListener('submit', handleAnalysis);
    downloadBtn.addEventListener('click', downloadCSV);
    
    // Focus on ticker input
    tickerInput.focus();
});

// Handle form submission
async function handleAnalysis(e) {
    e.preventDefault();
    
    const ticker = tickerInput.value.trim().toUpperCase();
    
    if (!ticker) {
        showError('Please enter a valid ticker symbol');
        return;
    }
    
    try {
        showLoading(true);
        hideError();
        hideResults();
        
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker: ticker })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Analysis failed');
        }
        
        currentAnalysis = data.analysis;
        csvFilename = data.csv_filename;
        
        displayResults(data);
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Display analysis results
function displayResults(data) {
    const { analysis, top_days } = data;
    
    // Update summary cards
    document.getElementById('totalDays').textContent = formatNumber(analysis.total_trading_days);
    document.getElementById('aboveAvgDays').textContent = formatNumber(analysis.days_above_average);
    document.getElementById('percentageAboveAvg').textContent = `${analysis.percentage_days_above_avg}%`;
    document.getElementById('avgVolume').textContent = formatNumber(analysis.average_first_30min_volume);
    
    // Update analysis info
    document.getElementById('analysisTitle').textContent = `Analysis Results for ${analysis.ticker}`;
    document.getElementById('analysisPeriod').textContent = `Analysis Period: ${analysis.analysis_period}`;
    
    // Update volume categories
    displayVolumeCategories(analysis.volume_categories);
    
    // Update table
    displayVolumeTable(top_days);
    
    // Show results with animation
    showResults();
}

// Display volume categories
function displayVolumeCategories(categories) {
    const container = document.getElementById('volumeCategories');
    container.innerHTML = '';
    
    const categoryMappings = {
        'Moderate': 'moderate',
        'High': 'high',
        'Very High': 'very-high',
        'Extreme': 'extreme'
    };
    
    Object.entries(categories).forEach(([category, count]) => {
        const categoryClass = categoryMappings[category] || 'moderate';
        const categoryItem = document.createElement('div');
        categoryItem.className = `category-item category-${categoryClass}`;
        categoryItem.innerHTML = `
            <h4>${category}</h4>
            <p>${formatNumber(count)} days</p>
        `;
        container.appendChild(categoryItem);
    });
}

// Display volume table
function displayVolumeTable(topDays) {
    const tbody = document.getElementById('volumeTableBody');
    tbody.innerHTML = '';
    
    topDays.forEach(day => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(day.date)}</td>
            <td class="number-format">${formatNumber(day.estimated_volume)}</td>
            <td class="number-format">${day.vs_average}x</td>
            <td class="number-format">${formatNumber(day.estimated_trades)}</td>
            <td><span class="category-badge badge-${getCategoryClass(day.category)}">${day.category}</span></td>
            <td class="number-format">${day.percentage}%</td>
            <td class="number-format ${day.gap_percent >= 0 ? 'positive' : 'negative'}">${day.gap_percent}%</td>
            <td class="number-format ${day.daily_return >= 0 ? 'positive' : 'negative'}">${day.daily_return}%</td>
        `;
        tbody.appendChild(row);
    });
}

// Get category CSS class
function getCategoryClass(category) {
    const mapping = {
        'Moderate': 'moderate',
        'High': 'high',
        'Very High': 'very-high',
        'Extreme': 'extreme'
    };
    return mapping[category] || 'moderate';
}

// Download CSV file
async function downloadCSV() {
    if (!csvFilename) {
        showError('No CSV file available for download');
        return;
    }
    
    try {
        const response = await fetch(`/download/${csvFilename}`);
        
        if (!response.ok) {
            throw new Error('Download failed');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = csvFilename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
    } catch (error) {
        showError('Failed to download CSV file');
    }
}

// Set ticker from popular buttons
function setTicker(ticker) {
    tickerInput.value = ticker;
    tickerInput.focus();
}

// Utility functions
function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
}

function showResults() {
    resultsDiv.style.display = 'block';
    resultsDiv.classList.add('fade-in');
}

function hideResults() {
    resultsDiv.style.display = 'none';
    resultsDiv.classList.remove('fade-in');
}

function showError(message) {
    errorText.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.classList.add('fade-in');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    errorDiv.style.display = 'none';
    errorDiv.classList.remove('fade-in');
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Handle Enter key in ticker input
tickerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleAnalysis(e);
    }
});

// Add smooth scrolling to results
function scrollToResults() {
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Show results and scroll to them
function showResults() {
    resultsDiv.style.display = 'block';
    resultsDiv.classList.add('fade-in');
    
    // Scroll to results after a short delay
    setTimeout(() => {
        scrollToResults();
    }, 300);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleAnalysis(e);
    }
    
    // Ctrl/Cmd + D to download (if available)
    if ((e.ctrlKey || e.metaKey) && e.key === 'd' && csvFilename) {
        e.preventDefault();
        downloadCSV();
    }
});

// Add loading state to analyze button
function updateAnalyzeButton(loading) {
    const button = document.querySelector('.analyze-btn');
    const icon = button.querySelector('i');
    const text = button.querySelector('.btn-text') || button.lastChild;
    
    if (loading) {
        button.disabled = true;
        icon.className = 'fas fa-spinner fa-spin';
        if (text.textContent) {
            text.textContent = ' Analyzing...';
        }
    } else {
        button.disabled = false;
        icon.className = 'fas fa-search';
        if (text.textContent) {
            text.textContent = ' Analyze';
        }
    }
}

// Update the showLoading function to include button state
function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
    updateAnalyzeButton(show);
}

// Add input validation
tickerInput.addEventListener('input', function(e) {
    // Remove any non-alphanumeric characters and convert to uppercase
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Limit to 10 characters
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    e.target.value = value;
});

// Add tooltips for better user experience
function addTooltips() {
    const tooltips = {
        'totalDays': 'Total number of trading days analyzed from January 2022 to today',
        'aboveAvgDays': 'Number of days where first 30-minute volume exceeded the average',
        'percentageAboveAvg': 'Percentage of days with above-average first 30-minute volume',
        'avgVolume': 'Average estimated volume in the first 30 minutes of trading'
    };
    
    Object.entries(tooltips).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.parentElement.title = text;
        }
    });
}

// Initialize tooltips when page loads
document.addEventListener('DOMContentLoaded', function() {
    addTooltips();
});

// Add print functionality
function printResults() {
    if (!currentAnalysis) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>NSE Volume Analysis - ${currentAnalysis.ticker}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
                    .summary-item { padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background-color: #f8f6f2; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>NSE Volume Analysis Report</h1>
                    <h2>${currentAnalysis.ticker}</h2>
                    <p>Analysis Period: ${currentAnalysis.analysis_period}</p>
                </div>
                <!-- Add more content here -->
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Export functionality
window.NSEVolumeAnalyzer = {
    setTicker,
    downloadCSV,
    printResults,
    getCurrentAnalysis: () => currentAnalysis
};
