// Temporary setup script to set authentication values in localStorage
// You can run this in your browser console or add it to your app temporarily

// Set up temporary authentication for testing
localStorage.setItem('userRole', 'SUPER_ADMIN');
localStorage.setItem('employeeId', 'EMP001');
localStorage.setItem('userData', JSON.stringify({
  id: 1,
  username: 'admin', // Replace with your actual username
  role: 'SUPER_ADMIN'
}));

// Test credentials - replace these with your actual backend credentials
localStorage.setItem('authCredentials', JSON.stringify({
  username: 'admin', // Replace with your actual username
  password: 'admin'  // Replace with your actual password
}));

console.log('Authentication setup complete. You can now test the Claims and Collections features.');
console.log('Current settings:', {
  userRole: localStorage.getItem('userRole'),
  employeeId: localStorage.getItem('employeeId'),
  userData: JSON.parse(localStorage.getItem('userData'))
});
