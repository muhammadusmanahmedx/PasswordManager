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

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

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
                <span className="ml-3 text-xl font-bold transition-all duration-300 text-gray-900">PassManager</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="px-3 py-2 font-medium transition-colors duration-200 text-gray-700 hover:text-green-600">Features</Link>
              <Link href="/" className="px-3 py-2 font-medium transition-colors duration-200 text-gray-700 hover:text-green-600">About</Link>
              <Link href="#pricing" className="px-3 py-2 font-medium transition-colors duration-200 text-gray-700 hover:text-green-600">Pricing</Link>
              <Link href="/login" className="px-4 py-2 rounded-md font-medium transition-all duration-200 text-gray-700 border border-gray-300 hover:bg-gray-50">Log In</Link>
              <Link href="/signup" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 font-medium shadow hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-1">
                <span>Get Started</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-all duration-200 text-gray-500 hover:bg-gray-100"
                aria-expanded={isMenuOpen}
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
              <Link href="#features" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">Features</Link>
              <Link href="/" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">About</Link>
              <Link href="#pricing" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">Pricing</Link>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Link href="/login" onClick={closeMobileMenu} className="block w-full px-4 py-2 text-center text-base font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200">Log In</Link>
                <Link href="/signup" onClick={closeMobileMenu} className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 mt-2 transition-all duration-200 flex items-center justify-center space-x-1">
                  <span>Get Started</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
<div className="bg-white py-20 md:py-32 px-6 md:px-12">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
    
    {/* Left Content */}
    <div className="text-center md:text-left">
      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full mb-4">
        🔒 <span className="ml-2">Trusted by 1M+ Users</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Fortify Your Data with <span className="text-green-600">PassManager</span>
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto md:mx-0">
        State-of-the-art data centers with AES-256 encryption ensure your passwords are locked down tight.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <a href="/signup" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold">
          Get Started Free
        </a>
        <a href="#" className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 px-6 py-3 rounded-lg shadow-md text-lg font-semibold flex items-center gap-2">
          ▶ Explore Data Center
        </a>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          ✅ No Master Password Required
        </div>
        <div className="flex items-center gap-2">
          ✅ End-to-End Encryption
        </div>
      </div>
    </div>

    {/* Right Image (Larger) */}
    <div className="flex justify-center md:justify-end">
      <img 
        src="https://i.postimg.cc/4dnyB9tp/Frame-25.png" 
        alt="Hero Image" 
        className="w-full max-w-2xl" // Increased size
      />
    </div>
  </div>
</div>





      {/* Features Section */}
      <div className="py-22 bg-gray-50" id="features">
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
      <div className="py-22 bg-gray-50" id="pricing">
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
              <Link href="/signup" className="px-8 py-4 text-green-600 bg-white rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/demo" className="px-8 py-4 text-white border border-white rounded-lg text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span>Explore Data Center</span>
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
            <div className="mt-12 text-center">
              <p className="text-lg text-gray-600 mb-6">
                Still have questions? We're here to help.
              </p>
              <a 
                href="https://usmans.vercel.app/#contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-sm space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Support</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#features" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Features</Link></li>
                <li><Link href="#pricing" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Pricing</Link></li>
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Security</Link></li>
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">About</Link></li>
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Blog</Link></li>
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Careers</Link></li>
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Help Center</Link></li>
                
                <li> 
                   <a 
                href="https://usmans.vercel.app/#contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base text-gray-300 hover:text-white transition-colors duration-200"
              >Contact Us
                </a></li>
                     <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Status</Link></li>
                <li><Link href="/" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Privacy</Link></li>
                <li><Link href="" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Terms</Link></li>
                <li><Link href="" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Cookie Policy</Link></li>
                <li><Link href="" className="text-base text-gray-300 hover:text-white transition-colors duration-200">Licenses</Link></li>
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
          0% { transform: translate(0px, 0px) scale(1); }
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        /* Ensure buttons don't wrap */
        .no-wrap {
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}