'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Lock, Key, CheckCircle, Database, Zap, Globe, Smartphone, ChevronRight, ArrowRight, Server, Cloud, LockIcon, MessageCircle } from 'lucide-react';
import Head from 'next/head';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>PassManager | Secure Password Management</title>
        <meta name="description" content="Store and access your passwords securely with AES-256 encryption. Free forever." />
      </Head>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-xl py-2' : 'bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'bg-green-100' : 'bg-green-100 group-hover:bg-green-200'}`}>
                  <Shield className="h-6 w-6 text-green-600 group-hover:animate-pulse" />
                </div>
                <span className={`ml-3 text-xl font-bold transition-all duration-300 text-gray-900`}>PassManager</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className={`px-3 py-2 font-medium transition-colors duration-200 text-gray-700 hover:text-green-600`}>Features</Link>
              <Link href="/" className={`px-3 py-2 font-medium transition-colors duration-200 text-gray-700 hover:text-green-600`}>About</Link>
              <Link href="#pricing" className={`px-3 py-2 font-medium transition-colors duration-200 text-gray-700 hover:text-green-600`}>Pricing</Link>
              <Link href="/login" className={`px-4 py-2 rounded-md font-medium transition-all duration-200 text-gray-700 border border-gray-300 hover:bg-gray-50`}>Log In</Link>
              <Link href="/signup" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 font-medium shadow hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center">
                Get Started <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-all duration-200 text-gray-500 hover:bg-gray-100`}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg animate-slide-in">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <Link href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">Features</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">About</Link>
              <Link href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">Pricing</Link>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Link href="/login" className="block w-full px-4 py-2 text-center text-base font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200">Log In</Link>
                <Link href="/signup" className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 mt-2 transition-all duration-200 items-center justify-center">
                  Get Started <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

{/* Hero Section */}
<div className="relative overflow-hidden pt-0 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="text-center lg:text-left animate-fade-in">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-6">
          <span className="animate-pulse">🔒</span> <span className="ml-1">TRUSTED BY 1M+ USERS</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Fortify Your Data <br className="hidden lg:block"/> with <span className="text-green-600">PassManager</span>
        </h1>
        <p className="mt-6 max-w-md mx-auto lg:mx-0 text-xl text-gray-600">
          State-of-the-art data centers with AES-256 encryption ensure your passwords are locked down tight.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <Link href="/signup" className="px-8 py-4 text-white bg-green-600 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="" className="px-8 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Explore Data Center
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-gray-500">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
            <span className="ml-1.5">No Master Password Required</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
            <span className="ml-1.5">End-to-End Encryption</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative h-full">
        <div className="relative w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Custom SVG Security Background */}
            <rect x="50" y="50" width="300" height="300" rx="10" fill="#f0f9ff" stroke="#e6f1fa" strokeWidth="2" />
            
            {/* Security Pattern Background */}
            <g opacity="0.1">
              <path d="M70 70 L90 90" stroke="#0284c7" strokeWidth="1" />
              <path d="M110 70 L130 90" stroke="#0284c7" strokeWidth="1" />
              <path d="M150 70 L170 90" stroke="#0284c7" strokeWidth="1" />
              <path d="M190 70 L210 90" stroke="#0284c7" strokeWidth="1" />
              <path d="M230 70 L250 90" stroke="#0284c7" strokeWidth="1" />
              <path d="M270 70 L290 90" stroke="#0284c7" strokeWidth="1" />
              <path d="M310 70 L330 90" stroke="#0284c7" strokeWidth="1" />
              
              <path d="M70 110 L90 130" stroke="#0284c7" strokeWidth="1" />
              <path d="M110 110 L130 130" stroke="#0284c7" strokeWidth="1" />
              <path d="M150 110 L170 130" stroke="#0284c7" strokeWidth="1" />
              <path d="M190 110 L210 130" stroke="#0284c7" strokeWidth="1" />
              <path d="M230 110 L250 130" stroke="#0284c7" strokeWidth="1" />
              <path d="M270 110 L290 130" stroke="#0284c7" strokeWidth="1" />
              <path d="M310 110 L330 130" stroke="#0284c7" strokeWidth="1" />
              
              <path d="M70 150 L90 170" stroke="#0284c7" strokeWidth="1" />
              <path d="M110 150 L130 170" stroke="#0284c7" strokeWidth="1" />
              <path d="M150 150 L170 170" stroke="#0284c7" strokeWidth="1" />
              <path d="M190 150 L210 170" stroke="#0284c7" strokeWidth="1" />
              <path d="M230 150 L250 170" stroke="#0284c7" strokeWidth="1" />
              <path d="M270 150 L290 170" stroke="#0284c7" strokeWidth="1" />
              <path d="M310 150 L330 170" stroke="#0284c7" strokeWidth="1" />
              
              <path d="M70 190 L90 210" stroke="#0284c7" strokeWidth="1" />
              <path d="M110 190 L130 210" stroke="#0284c7" strokeWidth="1" />
              <path d="M150 190 L170 210" stroke="#0284c7" strokeWidth="1" />
              <path d="M190 190 L210 210" stroke="#0284c7" strokeWidth="1" />
              <path d="M230 190 L250 210" stroke="#0284c7" strokeWidth="1" />
              <path d="M270 190 L290 210" stroke="#0284c7" strokeWidth="1" />
              <path d="M310 190 L330 210" stroke="#0284c7" strokeWidth="1" />
              
              <path d="M70 230 L90 250" stroke="#0284c7" strokeWidth="1" />
              <path d="M110 230 L130 250" stroke="#0284c7" strokeWidth="1" />
              <path d="M150 230 L170 250" stroke="#0284c7" strokeWidth="1" />
              <path d="M190 230 L210 250" stroke="#0284c7" strokeWidth="1" />
              <path d="M230 230 L250 250" stroke="#0284c7" strokeWidth="1" />
              <path d="M270 230 L290 250" stroke="#0284c7" strokeWidth="1" />
              <path d="M310 230 L330 250" stroke="#0284c7" strokeWidth="1" />
              
              <path d="M70 270 L90 290" stroke="#0284c7" strokeWidth="1" />
              <path d="M110 270 L130 290" stroke="#0284c7" strokeWidth="1" />
              <path d="M150 270 L170 290" stroke="#0284c7" strokeWidth="1" />
              <path d="M190 270 L210 290" stroke="#0284c7" strokeWidth="1" />
              <path d="M230 270 L250 290" stroke="#0284c7" strokeWidth="1" />
              <path d="M270 270 L290 290" stroke="#0284c7" strokeWidth="1" />
              <path d="M310 270 L330 290" stroke="#0284c7" strokeWidth="1" />
            </g>

            {/* Shadow filter definition */}
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1"/>
              </filter>
            </defs>

            {/* Cyber Security Illustration */}
            <g filter="url(#shadow)" transform="translate(0, 50)">
              {/* Shield Base */}
              <path d="M200 80 L260 110 L260 210 L200 260 L140 210 L140 110 L200 80Z" fill="#E6F0FD" stroke="#0284c7" strokeWidth="3" />
              
              {/* Lock Body */}
              <rect x="175" y="150" width="50" height="60" rx="5" fill="#10B981" filter="url(#shadow)" />
              
              {/* Lock Shackle */}
              <path d="M190 150 L190 120 C190 105 210 105 210 120 L210 150" stroke="#10B981" strokeWidth="8" fill="none" />
              
              {/* Digital Circuit Lines */}
              <g stroke="#10B981" strokeWidth="2.5">
                <path d="M140 160 L175 160" />
                <path d="M225 160 L260 160" />
                <path d="M140 180 L175 180" />
                <path d="M225 180 L260 180" />
                <path d="M200 210 L200 240" />
                <path d="M175 130 L140 130" />
                <path d="M225 130 L260 130" />
              </g>
              
              {/* Digital Nodes */}
              <circle cx="140" cy="130" r="4" fill="#10B981" />
              <circle cx="140" cy="160" r="4" fill="#10B981" />
              <circle cx="140" cy="180" r="4" fill="#10B981" />
              <circle cx="260" cy="130" r="4" fill="#10B981" />
              <circle cx="260" cy="160" r="4" fill="#10B981" />
              <circle cx="260" cy="180" r="4" fill="#10B981" />
              <circle cx="200" cy="240" r="4" fill="#10B981" />
            </g>

            {/* Server Group */}
            <g className="group hover:animate-pulse" transform="translate(0, 80)">
              <rect x="90" y="70" width="30" height="40" rx="3" fill="#0284c7" className="group-hover:fill-blue-700 transition-colors duration-200"/>
              <rect x="95" y="76" width="20" height="3" rx="1" fill="#ffffff" />
              <rect x="95" y="84" width="20" height="3" rx="1" fill="#ffffff" />
              <rect x="95" y="92" width="20" height="3" rx="1" fill="#ffffff" />
              <circle cx="105" cy="110" r="12" fill="#10B981" className="group-hover:fill-green-700 transition-colors duration-200 animate-pulse"/>
            </g>

            {/* Cloud Group */}
            <g className="group hover:animate-pulse" transform="translate(0, 80)">
              <path d="M310 90 C310 80 302 72 292 72 C286 72 282 75 280 79 C278 72 272 68 264 68 C252 68 244 77 244 88 C244 89 244 90 244 91 C238 93 234 98 234 105 C234 112 240 118 248 118 L304 118 C310 118 316 112 316 105 C316 98 312 93 310 90Z" fill="#0284c7" className="group-hover:fill-blue-700 transition-colors duration-200"/>
              <circle cx="274" cy="100" r="12" fill="#10B981" className="group-hover:fill-green-700 transition-colors duration-200 animate-pulse"/>
            </g>

            {/* Lock Group */}
            <g className="group hover:animate-pulse" transform="translate(35, 180)">
              <rect x="100" y="50" width="50" height="60" rx="5" fill="#0284c7" className="group-hover:fill-blue-700 transition-colors duration-200"/>
              <path d="M115 50 L115 25 C115 13 135 13 135 25 L135 50" stroke="#0284c7" strokeWidth="8" fill="none" className="group-hover:stroke-blue-700 transition-colors duration-200"/>
              <circle cx="125" cy="80" r="10" fill="#10B981" className="group-hover:fill-green-700 transition-colors duration-200 animate-pulse"/>
            </g>
          </svg>

          {/* Enhanced blurred circles */}
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob"></div>
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-24 right-12 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Logo Cloud */}
      {/* <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Trusted by security teams at
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {[
              { name: 'TechCorp', logo: '/images/techcorp.svg' },
              { name: 'SecureNet', logo: '/images/securenets.svg' },
              { name: 'DataSafe', logo: '/images/datasafe.svg' },
              { name: 'CloudPeak', logo: '/images/cloudpeak.svg' },
              { name: 'InfoGuard', logo: '/images/infoguard.svg' }
            ].map((company) => (
              <div key={company.name} className="col-span-1 flex justify-center">
                <div className="h-12 w-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="h-8 max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <div className="py-22 bg-gray-50" id ="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to secure your digital life
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in group">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                  <Lock className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 text-center">AES-256 Encryption</h3>
              <p className="mt-4 text-gray-600 text-center">
                Military-grade encryption keeps your data secure with the same standard trusted by governments worldwide.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-10 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in group">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                  <Key className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 text-center">One-Click Access</h3>
              <p className="mt-4 text-gray-600 text-center">
                Auto-fill passwords instantly across all your devices. No more typing complex passwords.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-10 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in group">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                  <Globe className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 text-center">Cross-Platform Sync</h3>
              <p className="mt-4 text-gray-600 text-center">
                Access passwords on any device—desktop, mobile, or tablet—with seamless, encrypted sync.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-10 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in group">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 text-center">Password Generator</h3>
              <p className="mt-4 text-gray-600 text-center">
                Create strong, unique passwords with customizable complexity for each account.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-10 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in group">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                  <Smartphone className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 text-center">Mobile Friendly</h3>
              <p className="mt-4 text-gray-600 text-center">
                Biometric login (Face ID, Touch ID) for instant, secure access on iOS and Android.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-10 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in group">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                  <Database className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 text-center">Secure Sharing</h3>
              <p className="mt-4 text-gray-600 text-center">
                Share passwords safely with family or teams without exposing the actual credentials.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-10 bg-green-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Testimonial Section */}
      <div className="py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center animate-fade-in">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Loved by Thousands
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Don't just take our word for it
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO at TechCorp",
                avatar: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
                quote: "PassManagers encryption and intuitive design have made credential management a breeze for our team. A must-have for security-conscious organizations."
              },
              {
                name: "Michael Chen",
                role: "Security Engineer",
                avatar: "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg",
                quote: "Ive tried many password managers, but PassManagers seamless sync across all my devices is unmatched. Plus, the security gives me peace of mind."
              },
              {
                name: "Emma Rodriguez",
                role: "Digital Nomad",
                avatar: "https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg",
                quote: "As someone who travels constantly, having my passwords securely accessible everywhere has been a game-changer. Simple yet powerful."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="mt-6">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="mt-4 text-gray-600 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-600 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: "1M+", label: "Active Users" },
                { number: "99.9%", label: "Uptime" },
                { number: "256-bit", label: "Encryption" }
              ].map((stat, index) => (
                <div key={index} className="animate-fade-in">
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat.number}</div>
                  <div className="mt-2 text-lg font-medium text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-22 bg-gray-50 " id="pricing" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Get started for free. Upgrade when you need more.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="mt-4 text-gray-600">Perfect for individuals getting started</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-lg font-medium text-gray-500">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Unlimited passwords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">AES-256 encryption</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">2 device sync</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/signup" className="block w-full px-6 py-3 text-center text-lg font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors duration-200">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                <p className="mt-4 text-gray-600">For power users and small teams</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">$4</span>
                  <span className="text-lg font-medium text-gray-500">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Everything in Free</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Unlimited devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Password sharing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Priority support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/signup" className="block w-full px-6 py-3 text-center text-lg font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200">
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Team Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">Team</h3>
                <p className="mt-4 text-gray-600">For businesses and large teams</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">$10</span>
                  <span className="text-lg font-medium text-gray-500">/user/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Team management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Advanced reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-700">Dedicated account manager</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/signup" className="block w-full px-6 py-3 text-center text-lg font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors duration-200">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200C200 300 400 100 600 200S1000 300 1200 200" stroke="white" strokeWidth="40" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Ready to secure your passwords?
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-xl text-green-100">
              Join millions of users who trust PassManager with their digital security.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="px-8 py-4 text-green-600 bg-white rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/demo" className="px-8 py-4 text-white border border-white rounded-lg text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                Explore Data Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
<div className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center animate-fade-in">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
        Everything you need to know about PassManager
      </p>
    </div>

    <div className="mt-12 max-w-3xl mx-auto">
      <div className="space-y-4">
        {[
          {
            question: "Is my data really secure?",
            answer: "Absolutely. We use AES-256 encryption, which is the same standard trusted by governments and financial institutions worldwide. Your data is encrypted before it leaves your device and can only be decrypted with your master password, which we never store."
          },
          {
            question: "What happens if I forget my master password?",
            answer: "For security reasons, we dont store your master password. However, you can set up account recovery options in advance, such as security questions or a recovery email, to help you regain access to your account if needed."
          },
          {
            question: "Is PassManager really free?",
            answer: "Yes! Our free plan includes all the essential features with no time limits. We offer premium plans with additional features for power users and teams, but you can use PassManager completely free forever if the free plan meets your needs."
          },
          {
            question: "How does cross-device sync work?",
            answer: "Your encrypted data is synced securely through our servers. Even though your data passes through our servers, we cant read it because its encrypted with your master password before it leaves your device. Only you hold the key to decrypt your information."
          },
          {
            question: "Can I share passwords with family or team members?",
            answer: "Yes! Our secure sharing feature lets you share passwords without revealing the actual credentials. The recipient gets access to the service but never sees the actual password unless you choose to reveal it."
          }
        ].map((faq, index) => (
          <div key={index} className="group">
            <button 
              className="flex justify-between items-center w-full px-6 py-5 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200"
              onClick={(e) => {
                const answer = e.currentTarget.nextElementSibling;
                const icon = e.currentTarget.querySelector('svg');
                if (answer) {
                  answer.classList.toggle('max-h-0');
                  answer.classList.toggle('max-h-screen');
                  answer.classList.toggle('pb-4');
                }
                if (icon) {
                  icon.classList.toggle('rotate-180');
                }
              }}
            >
              <span className="text-lg font-semibold text-green-800">{faq.question}</span>
              <svg 
                className="h-6 w-6 text-green-600 transition-transform duration-200 transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className="px-6 max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-b-lg"
            >
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional CTA */}
      <div className="mt-12 text-center">
  <p className="text-lg text-gray-600 mb-6">
    Still have questions? We're here to help.
  </p>
  <a 
    href="https://usmans.vercel.app/#contact" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-sm"
  >
    <MessageCircle className="h-5 w-5 mr-2" />
    Contact Support
  </a>
</div>

    </div>
  </div>
</div>

      {/* Footer */}
      <footer className="bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100C200 150 400 50 600 100S1000 150 1200 100" stroke="white" strokeWidth="20" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/features" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Features</Link></li>
                <li><Link href="/pricing" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Pricing</Link></li>
                <li><Link href="/security" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Security</Link></li>
                <li><Link href="/integrations" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/about" className="text-base text-gray-300 hover:text-white transition-colors duration-200">About</Link></li>
                <li><Link href="/blog" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Blog</Link></li>
                <li><Link href="/careers" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Careers</Link></li>
                <li><Link href="/press" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/help" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Help Center</Link></li>
                <li><Link href="/contact" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Contact Us</Link></li>
                <li><Link href="/status" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Status</Link></li>
                <li><Link href="/community" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/privacy" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Privacy</Link></li>
                <li><Link href="/terms" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Terms</Link></li>
                <li><Link href="/cookies" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Cookie Policy</Link></li>
                <li><Link href="/licenses" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Licenses</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-400 animate-pulse" />
              <span className="ml-2 text-xl font-bold text-white">PassManager</span>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} PassManager, Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes slide-in {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.7s ease-out;
        }
        @keyframes blob {
          0% { transform: translate(0px, 计算机语言: 简体中文 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}