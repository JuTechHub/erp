import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white overflow-auto">
      {/* Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">α</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">ALPHAXINE</h1>
                <p className="text-xs text-gray-500">Enterprise ERP Suite</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Features</a>
              <a href="#solutions" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Solutions</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact</a>
              <button 
                onClick={handleGetStarted}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-purple-600 rounded-full"></div>
                <div className="w-full h-0.5 bg-purple-600 rounded-full"></div>
                <div className="w-full h-0.5 bg-purple-600 rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pb-6 border-t border-purple-100">
              <div className="flex flex-col space-y-4 pt-6">
                <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Features</a>
                <a href="#solutions" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Solutions</a>
                <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contact</a>
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold w-fit shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Transform Your
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Business</span>
                  <br />
                  <span className="text-4xl lg:text-5xl text-purple-200">with Smart ERP</span>
                </h1>
                <p className="text-xl text-purple-100 leading-relaxed">
                  Revolutionize your operations with ALPHAXINE - the most advanced ERP platform designed for modern enterprises. 
                  Seamlessly integrate HR, CRM, Finance, and more in one intelligent ecosystem.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
                  <span className="text-purple-100 text-lg">AI-Powered Business Intelligence</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                  <span className="text-purple-100 text-lg">Real-time Collaborative Workspace</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
                  <span className="text-purple-100 text-lg">Enterprise-Grade Security</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={handleGetStarted}
                  className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-xl"
                >
                  Start Free Trial
                </button>
                <button className="px-10 py-5 border-2 border-purple-300 text-purple-100 rounded-2xl hover:bg-purple-700 hover:border-purple-400 transition-all duration-300 font-semibold text-lg backdrop-blur-sm">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Content - Hero Visual */}
            <div className="relative">
              {/* Main Dashboard Mockup */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:rotate-1 transition-transform duration-500 border border-white/20">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl h-96 flex flex-col overflow-hidden shadow-inner">
                  {/* Mock Header */}
                  <div className="bg-white/10 backdrop-blur-sm p-4 border-b border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                          <span className="text-gray-900 font-bold text-sm">α</span>
                        </div>
                        <span className="text-white font-semibold">ALPHAXINE Dashboard</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="w-8 h-8 bg-green-400 rounded-lg mb-2"></div>
                        <div className="text-white text-sm font-medium">Revenue</div>
                        <div className="text-white/70 text-xs">$127,430</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="w-8 h-8 bg-blue-400 rounded-lg mb-2"></div>
                        <div className="text-white text-sm font-medium">Users</div>
                        <div className="text-white/70 text-xs">12,847</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="w-8 h-8 bg-yellow-400 rounded-lg mb-2"></div>
                        <div className="text-white text-sm font-medium">Growth</div>
                        <div className="text-white/70 text-xs">+24.7%</div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl h-32 flex items-center justify-center">
                      <div className="text-white/50 text-sm">Analytics Chart</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-2xl p-4 animate-float">
                <div className="w-12 h-12 bg-white/20 rounded-xl mb-2 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white rounded-lg"></div>
                </div>
                <p className="text-white font-semibold text-sm">HR Module</p>
                <p className="text-white/80 text-xs">Active</p>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl p-4 animate-float-delayed">
                <div className="w-12 h-12 bg-white/20 rounded-xl mb-2 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white rounded-lg"></div>
                </div>
                <p className="text-white font-semibold text-sm">CRM System</p>
                <p className="text-white/80 text-xs">Online</p>
              </div>
              
              <div className="absolute top-1/2 -right-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-4 animate-pulse">
                <div className="w-12 h-12 bg-white/20 rounded-xl mb-2 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white rounded-lg"></div>
                </div>
                <p className="text-white font-semibold text-sm">Analytics</p>
                <p className="text-white/80 text-xs">Real-time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Next-Generation Features for
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Digital Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Experience the future of business management with our AI-powered, cloud-native ERP platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                title: "Intelligent HR Hub",
                description: "AI-driven employee management with predictive analytics, automated workflows, and smart payroll processing",
                color: "from-purple-500 to-purple-700",
                bg: "bg-gradient-to-br from-purple-50 to-purple-100",
                icon: "👥"
              },
              {
                title: "Smart CRM Engine",
                description: "Advanced customer relationship management with AI insights, pipeline automation, and predictive sales forecasting",
                color: "from-blue-500 to-blue-700", 
                bg: "bg-gradient-to-br from-blue-50 to-blue-100",
                icon: "🎯"
              },
              {
                title: "Financial Command Center",
                description: "Real-time financial control with automated accounting, intelligent reporting, and compliance management",
                color: "from-emerald-500 to-emerald-700",
                bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
                icon: "💰"
              },
              {
                title: "Inventory Intelligence",
                description: "Smart inventory optimization with demand forecasting, automated reordering, and supply chain visibility",
                color: "from-orange-500 to-orange-700",
                bg: "bg-gradient-to-br from-orange-50 to-orange-100",
                icon: "📦"
              },
              {
                title: "Project Orchestrator",
                description: "Advanced project management with resource optimization, timeline intelligence, and collaborative workspaces",
                color: "from-teal-500 to-teal-700",
                bg: "bg-gradient-to-br from-teal-50 to-teal-100",
                icon: "🚀"
              },
              {
                title: "Business Intelligence Suite",
                description: "AI-powered analytics with real-time dashboards, predictive insights, and custom report generation",
                color: "from-indigo-500 to-indigo-700",
                bg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
                icon: "📊"
              }
            ].map((feature, index) => (
              <div key={index} className={`${feature.bg} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-white/50 backdrop-blur-sm`}>
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-6 shadow-lg`}>
                  <div className="w-10 h-10 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Enterprise Solutions
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Tailored for You</span>
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              From startups to global enterprises, our scalable platform grows with your ambitions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-white">
                  Built for Scale,
                  <span className="text-yellow-400"> Designed for Growth</span>
                </h3>
                <p className="text-lg text-purple-100 leading-relaxed">
                  Our cloud-native architecture ensures your ERP platform evolves with your business, 
                  providing unmatched flexibility and performance at every stage of your journey.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-lg"></div>
                  </div>
                  <h4 className="font-bold text-white mb-3 text-lg">Startup Ready</h4>
                  <p className="text-purple-200 text-sm leading-relaxed">Essential tools to launch and scale your business efficiently</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-lg"></div>
                  </div>
                  <h4 className="font-bold text-white mb-3 text-lg">Enterprise Grade</h4>
                  <p className="text-purple-200 text-sm leading-relaxed">Advanced features for complex global operations</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-lg"></div>
                  </div>
                  <h4 className="font-bold text-white mb-3 text-lg">Cloud Native</h4>
                  <p className="text-purple-200 text-sm leading-relaxed">Access your business anywhere, anytime, any device</p>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-lg"></div>
                  </div>
                  <h4 className="font-bold text-white mb-3 text-lg">AI Powered</h4>
                  <p className="text-purple-200 text-sm leading-relaxed">Machine learning insights for smarter decisions</p>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Dashboard */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl h-96 flex flex-col overflow-hidden shadow-inner">
                  {/* Mock Header */}
                  <div className="bg-white/10 backdrop-blur-sm p-4 border-b border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                          <span className="text-gray-900 font-bold text-sm">α</span>
                        </div>
                        <span className="text-white font-semibold">Business Intelligence</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock Analytics Content */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl p-4 backdrop-blur-sm border border-purple-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-6 h-6 bg-purple-400 rounded-lg"></div>
                          <span className="text-green-400 text-xs">+12%</span>
                        </div>
                        <div className="text-white text-sm font-medium">Sales Growth</div>
                        <div className="text-purple-200 text-xs">This Quarter</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl p-4 backdrop-blur-sm border border-blue-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-6 h-6 bg-blue-400 rounded-lg"></div>
                          <span className="text-green-400 text-xs">+8%</span>
                        </div>
                        <div className="text-white text-sm font-medium">Efficiency</div>
                        <div className="text-blue-200 text-xs">Operations</div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl h-24 flex items-center justify-center border border-white/10">
                      <div className="text-white/50 text-sm">Real-time Analytics Dashboard</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-lg p-2 border border-green-400/30">
                        <div className="text-white text-xs font-medium">HR</div>
                        <div className="text-green-200 text-xs">Active</div>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg p-2 border border-yellow-400/30">
                        <div className="text-white text-xs font-medium">CRM</div>
                        <div className="text-yellow-200 text-xs">Online</div>
                      </div>
                      <div className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg p-2 border border-cyan-400/30">
                        <div className="text-white text-xs font-medium">Finance</div>
                        <div className="text-cyan-200 text-xs">Synced</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <h3 className="text-5xl font-bold mb-3 text-shadow">10K+</h3>
              <p className="text-orange-100 font-medium">Active Users</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <h3 className="text-5xl font-bold mb-3 text-shadow">99.9%</h3>
              <p className="text-orange-100 font-medium">Uptime SLA</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <h3 className="text-5xl font-bold mb-3 text-shadow">24/7</h3>
              <p className="text-orange-100 font-medium">Expert Support</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <h3 className="text-5xl font-bold mb-3 text-shadow">150+</h3>
              <p className="text-orange-100 font-medium">Global Markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
            Ready to
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Revolutionize</span>
            <br />Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the thousands of forward-thinking companies already transforming their operations with ALPHAXINE ERP. 
            Experience the future of business management today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handleGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-xl"
            >
              Start Your Free Trial
            </button>
            <button className="px-12 py-5 border-2 border-purple-600 text-purple-600 rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold text-lg">
              Schedule Demo
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-500 mb-6">Trusted by industry leaders worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-bold">LOGO</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-bold">LOGO</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-bold">LOGO</span>
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-bold">LOGO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6 md:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-lg">α</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">ALPHAXINE</span>
                  <p className="text-purple-200 text-sm">ERP Excellence</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Empowering businesses worldwide with intelligent ERP solutions that drive growth, efficiency, and innovation.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Solutions</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">HR Management</li>
                <li className="hover:text-white transition-colors cursor-pointer">CRM System</li>
                <li className="hover:text-white transition-colors cursor-pointer">Financial Suite</li>
                <li className="hover:text-white transition-colors cursor-pointer">Inventory Control</li>
                <li className="hover:text-white transition-colors cursor-pointer">Project Management</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Press</li>
                <li className="hover:text-white transition-colors cursor-pointer">Partners</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Resources</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-white transition-colors cursor-pointer">API Reference</li>
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Community</li>
                <li className="hover:text-white transition-colors cursor-pointer">System Status</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">
                &copy; 2025 ALPHAXINE ERP. All rights reserved. Building the future of business management.
              </p>
              <div className="flex space-x-6 text-gray-400">
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                <span className="hover:text-white transition-colors cursor-pointer">Security</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
