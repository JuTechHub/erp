import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeLandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate fade opacity based on scroll position
      // Fade starts at 0px and completes at 400px scroll
      const fadeStart = 0;
      const fadeEnd = 350;
      const opacity = Math.max(0, 1 - (currentScrollY - fadeStart) / (fadeEnd - fadeStart));
      setFadeOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleExploreFeatures = () => {
    navigate("/features");
  };

  return (
    <div className="relative">
      {/* Fade Overlay Screen */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300"
        style={{ 
          background: 'linear-gradient(135deg, #fde047 0%, #fb923c 33%, #ef4444 66%, #dc2626 100%)',
          opacity: fadeOpacity,
          pointerEvents: fadeOpacity > 0 ? 'auto' : 'none',
          visibility: fadeOpacity > 0 ? 'visible' : 'hidden'
        }}
      >
        <div className="text-center space-y-8 px-6">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-2xl p-2">
              <img 
                src="/images/alphaxine_logo.jpg" 
                alt="ALPHAXINE Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-black">ALPHAXINE</h1>
              <p className="text-white/80 text-sm">Enterprise Resource Planning</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              The Workplace That
              <br />
              <span className="text-white/90">Works For You.</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Experience seamless operations, intelligent automation, and data-driven insights
            </p>
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-16">
            <div className="flex flex-col items-center space-y-3">
              <p className="text-white/70 text-sm font-medium">Scroll to explore</p>
              <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Only visible when overlay fades */}
      <div 
        className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50"
        style={{ 
          opacity: fadeOpacity > 0 ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          visibility: fadeOpacity > 0 ? 'hidden' : 'visible'
        }}
      >
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Navigation Header */}
      <nav className="relative z-40 bg-white shadow-sm border-b border-gray-100" style={{
        transform: `translateY(${Math.min(scrollY * 0.5, 100)}px)`,
        transition: 'transform 0.1s ease-out'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 p-1">
                <img 
                  src="/images/alphaxine_logo.jpg" 
                  alt="ALPHAXINE Logo"
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">ALPHAXINE</h1>
                <p className="text-xs text-gray-500">Enterprise Resource Planning</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Solutions</a>
              <a href="#modules" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Modules</a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Contact</a>
              <button 
                onClick={handleGetStarted}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600 rounded-full"></div>
                <div className="w-full h-0.5 bg-gray-600 rounded-full"></div>
                <div className="w-full h-0.5 bg-gray-600 rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3 pt-4">
                <a href="#features" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Solutions</a>
                <a href="#modules" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Modules</a>
                <a href="#pricing" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Contact</a>
                <button 
                  onClick={handleGetStarted}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium w-fit"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 py-40" style={{ paddingTop: '500px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
                  <span className="text-orange-600 text-sm font-medium">✓ Trusted by 500+ Enterprises</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Streamline Your
                  <span className="text-orange-600"> Business</span>
                  <br />Operations
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  ALPHAXINE ERP provides comprehensive business management solutions to help organizations 
                  optimize their operations, improve efficiency, and drive sustainable growth.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Integrated HR & Payroll Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Advanced Financial Controls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Real-time Business Analytics</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Right Content - ERP Dashboard Preview */}
            <div className="relative">
              {/* Main Dashboard Image */}
              <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                <img 
                  src="/images/landing1.jpg" 
                  alt="ALPHAXINE ERP Dashboard"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>

              {/* Secondary Image - Floating */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 border border-gray-100 w-32 h-24">
                <img 
                  src="/images/landing2.jpg" 
                  alt="Business Analytics"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Business Modules Section */}
      <section id="modules" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Business Management Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage every aspect of your organization with our integrated ERP modules designed for modern enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Human Resources",
                description: "Employee management, payroll processing, attendance tracking, and performance evaluation",
                icon: "bg-blue-100 text-blue-600",
                features: ["Employee Database", "Payroll Management", "Leave Tracking", "Performance Reviews"]
              },
              {
                title: "Customer Relationship",
                description: "Lead management, sales pipeline, customer communication, and support ticket system",
                icon: "bg-green-100 text-green-600",
                features: ["Lead Tracking", "Sales Pipeline", "Customer Support", "Communication"]
              },
              {
                title: "Financial Management",
                description: "Accounting, invoicing, expense tracking, and comprehensive financial reporting",
                icon: "bg-purple-100 text-purple-600",
                features: ["Accounting", "Invoicing", "Expense Tracking", "Financial Reports"]
              },
              {
                title: "Inventory Control",
                description: "Stock management, supplier relations, purchase orders, and warehouse operations",
                icon: "bg-orange-100 text-orange-600",
                features: ["Stock Management", "Supplier Relations", "Purchase Orders", "Warehouse"]
              },
              {
                title: "Project Management",
                description: "Task planning, resource allocation, timeline tracking, and team collaboration",
                icon: "bg-teal-100 text-teal-600",
                features: ["Task Planning", "Resource Allocation", "Timeline Tracking", "Collaboration"]
              },
              {
                title: "Business Analytics",
                description: "Data visualization, performance metrics, custom reports, and business intelligence",
                icon: "bg-indigo-100 text-indigo-600",
                features: ["Data Visualization", "Performance Metrics", "Custom Reports", "Business Intelligence"]
              }
            ].map((module, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className={`w-12 h-12 ${module.icon} rounded-lg flex items-center justify-center mb-4`}>
                  <div className="w-6 h-6 bg-current rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{module.title}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <ul className="space-y-2">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Why Choose ALPHAXINE ERP?
                </h2>
                <p className="text-lg text-gray-600">
                  Built specifically for growing businesses that need powerful, yet easy-to-use enterprise solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Scalable Architecture</h4>
                  <p className="text-gray-600 text-sm">Grows with your business from startup to enterprise</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Cloud-Based</h4>
                  <p className="text-gray-600 text-sm">Access your data anywhere, anytime, any device</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Secure & Compliant</h4>
                  <p className="text-gray-600 text-sm">Enterprise-grade security and industry compliance</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">Expert support team available around the clock</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Implementation Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Average Implementation Time</span>
                      <span className="text-orange-600 font-bold">30 Days</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">User Adoption Rate</span>
                      <span className="text-green-600 font-bold">94%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-11/12"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">ROI Achievement</span>
                      <span className="text-purple-600 font-bold">180%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business Operations?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join hundreds of companies already using ALPHAXINE ERP to streamline their business processes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
