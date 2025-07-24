import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  const images = [
    "/images/landing1.jpg",
    "/images/landing2.jpg"
  ];

  useEffect(() => {
    // Add fade-in effect on initial load
    setFadeIn(true);
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Add hover state for interactive elements
  const [usernameActive, setUsernameActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);

  // Handle input focus and blur events
  const handleInputFocus = (inputType) => {
    if (inputType === 'username') setUsernameActive(true);
    if (inputType === 'password') setPasswordActive(true);
  };

  const handleInputBlur = (inputType) => {
    if (inputType === 'username' && !username) setUsernameActive(false);
    if (inputType === 'password' && !password) setPasswordActive(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Store auth token, user role, and complete user data
        localStorage.setItem("authToken", data.token || "demo-token");
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userData", JSON.stringify(data.user || { id: data.userId, username: username, role: data.role }));
        
        // Open dashboard in a new tab based on role
        let url = "/";
        if (data.role === "SUPER_ADMIN") {
          url = "/superadmin/dashboard-selection";
        } else if (data.role === "EMPLOYEE") {
          url = "/employee";
        } else {
          setError("Unknown role: " + data.role);
          setLoading(false);
          return;
        }
        window.open(url, "_blank");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Connection error. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className={`flex min-h-screen transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Left Side - Login Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-teal-500 rounded-full"></div>
            </div>
            
            {/* Content - with higher z-index */}
            <div className="relative z-10 w-full max-w-md">
              {/* Logo and Brand */}
              <div className="flex items-center mb-12 justify-center transform transition-transform hover:scale-105 duration-300">
                <div className="bg-white p-3 rounded-xl shadow-lg mr-4">
                  <img
                    src="/images/alphaxine_logo.jpg"
                    alt="AlphaXine Logo"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">AlphaXine</span>
                  <span className="block text-lg text-gray-600 font-light">Enterprise Resource Planning</span>
                </div>
              </div>

              {/* Login Form Container */}
              <div className="w-full bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text" style={{ letterSpacing: '1px' }}>
                  Welcome Back
                </h3>

                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-pulse">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                      </div>
                    </div>
                  )}

                  {/* Username Input */}
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 transform ${usernameActive ? '-translate-y-8 text-blue-600 text-xs' : '-translate-y-1/2 text-gray-500'} transition-all duration-200 pointer-events-none`}>
                      Username
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => handleInputFocus('username')}
                      onBlur={() => handleInputBlur('username')}
                      className={`w-full px-4 py-4 pt-6 text-lg border ${usernameActive ? 'border-blue-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                      required
                      disabled={loading}
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${usernameActive ? 'w-full' : 'w-0'}`}></div>
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 transform ${passwordActive ? '-translate-y-8 text-blue-600 text-xs' : '-translate-y-1/2 text-gray-500'} transition-all duration-200 pointer-events-none`}>
                      Password
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => handleInputFocus('password')}
                      onBlur={() => handleInputBlur('password')}
                      className={`w-full px-4 py-4 pt-6 text-lg border ${passwordActive ? 'border-blue-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                      required
                      disabled={loading}
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${passwordActive ? 'w-full' : 'w-0'}`}></div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white py-4 px-6 rounded-xl font-medium text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:transform-none overflow-hidden relative"
                  >
                    <span className={`absolute inset-0 ${loading ? 'w-full' : 'w-0'} bg-white/20 skew-x-12 transition-all duration-1000 transform -translate-x-full group-hover:translate-x-full`}></span>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>Login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    )}
                  </button>

                  {/* Forgot Password Link */}
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    <a href="#!" className="text-blue-500 hover:text-blue-700 transition-colors hover:underline">
                      Forgot password?
                    </a>
                  </p>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-sm text-gray-500 text-center relative z-10">
              <p className="mb-1">© 2025 AlphaXine ERP System. All rights reserved.</p>
              <div className="flex justify-center space-x-3 mt-3">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Help Center</a>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden">
            {images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`ERP Login Background ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                style={{ 
                  objectPosition: 'center',
                  opacity: currentImageIndex === index ? 1 : 0,
                  zIndex: currentImageIndex === index ? 10 : 1
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-indigo-900/80 z-20"></div>
            
            {/* Enhanced Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 p-12">
              <div className="text-center text-white max-w-md">
                <div className="mb-6 inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <h2 className="text-4xl font-light mb-6">Modern ERP Solutions</h2>
                <p className="text-lg text-white/80 mb-8">Streamline your business operations with our comprehensive enterprise resource planning system.</p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4 text-left mt-8">
                  <div className="flex items-start space-x-2">
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">Resource Management</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">Financial Tracking</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">Inventory Control</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">Workflow Automation</span>
                  </div>
                </div>
              </div>
              
              {/* Image indicators */}
              <div className="absolute bottom-10 flex justify-center space-x-3">
                {images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)} 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index ? 'bg-white scale-110' : 'bg-white/50 scale-100'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
