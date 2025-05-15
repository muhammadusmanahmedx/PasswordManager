'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Key, CheckCircle, Database, Zap, Globe, Smartphone } from 'lucide-react';
import { connectToDatabase } from '@/lib/db';

export default  function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

//  await connectToDatabase();

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-green-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">PassManager</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Features</Link>
              <Link href="/pricing" className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Pricing</Link>
              <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium">About</Link>
              <Link href="/login" className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 font-medium">Log In</Link>
              <Link href="/signup" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 font-medium shadow hover:shadow-md transition-all">Get Started</Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
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
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <Link href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Features</Link>
              <Link href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Pricing</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">About</Link>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Link href="/login" className="block w-full px-4 py-2 text-center text-base font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Log In</Link>
                <Link href="/signup" className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 mt-2">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 md:pt-24 md:pb-20 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Secure Password Management <br className="hidden lg:block"/> Made Simple
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Store, organize, and access your passwords securely from anywhere. Never forget a password again.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="px-8 py-4 text-white bg-green-600 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-150 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Free Trial
              </Link>
              <Link href="/demo" className="px-8 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg text-lg font-semibold hover:bg-gray-50 transition duration-150 ease-in-out">
                Watch Demo
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4 text-gray-500">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No credit card required</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Cloud */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Trusted by security teams worldwide
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {[
              'Company 1',
              'Company 2',
              'Company 3',
              'Company 4',
              'Company 5'
            ].map((company) => (
              <div key={company} className="col-span-1 flex justify-center">
                <div className="h-12 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-700 font-medium">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to keep your digital life secure and organized
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <Lock className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 text-center">Military-Grade Encryption</h3>
              <p className="mt-4 text-gray-600 text-center">
                AES-256 encryption ensures your data is protected with the same technology used by governments and banks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <Key className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 text-center">One-Click Access</h3>
              <p className="mt-4 text-gray-600 text-center">
                Auto-fill passwords with a single click. No more typing or remembering complex passwords.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <Globe className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 text-center">Cross-Platform Sync</h3>
              <p className="mt-4 text-gray-600 text-center">
                Access your passwords on all devices - desktop, mobile, and tablet. Always in sync.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 text-center">Password Generator</h3>
              <p className="mt-4 text-gray-600 text-center">
                Create strong, unique passwords with our built-in generator. Never use weak passwords again.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <Smartphone className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 text-center">Mobile Friendly</h3>
              <p className="mt-4 text-gray-600 text-center">
                Full-featured mobile apps for iOS and Android with biometric login for quick access.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                  <Database className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 text-center">Secure Sharing</h3>
              <p className="mt-4 text-gray-600 text-center">
                Safely share passwords with family or team members without revealing the actual password.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by Thousands
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Don't just take our word for it. Here's what our users say:
            </p>
          </div>

          <div className="mt-10">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-inner">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User testimonial" />
                </div>
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-500">CTO at TechCorp</div>
                </div>
              </div>
              <div className="mt-4 text-lg text-gray-600">
                <p>
                  "PassManager has completely transformed how our team handles credentials. The security features give us peace of mind, and the interface is so intuitive that even our least tech-savvy team members adopted it immediately."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="mt-12 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8 lg:max-w-4xl lg:mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="mt-4 text-gray-600">Perfect for personal use</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-lg font-medium text-gray-500">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">50 passwords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">1 device</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Basic security</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/signup" className="block w-full px-6 py-3 text-center text-base font-medium text-green-700 bg-green-50 border border-green-100 rounded-md hover:bg-green-100">
                    Get started
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-green-500 transform scale-105 z-10">
              <div className="px-6 py-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                    <p className="mt-4 text-gray-600">For power users</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Most Popular
                  </span>
                </div>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">$4.99</span>
                  <span className="text-lg font-medium text-gray-500">/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Unlimited passwords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">5 devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Advanced security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Password sharing</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/signup" className="block w-full px-6 py-3 text-center text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 shadow">
                    Start free trial
                  </Link>
                </div>
              </div>
            </div>

            {/* Team Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">Team</h3>
                <p className="mt-4 text-gray-600">For businesses</p>
                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">$9.99</span>
                  <span className="text-lg font-medium text-gray-500">/user/month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Unlimited devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Team management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">Priority support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/signup" className="block w-full px-6 py-3 text-center text-base font-medium text-green-700 bg-green-50 border border-green-100 rounded-md hover:bg-green-100">
                    Contact sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Ready to secure your digital life?
            </h2>
            <p className="mt-5 text-xl text-green-100">
              Join over 1 million users who trust PassManager with their passwords.
            </p>
          </div>
          <div className="mt-10 flex-shrink-0 lg:mt-0 lg:ml-10 lg:flex lg:items-center">
            <div className="inline-flex rounded-md shadow">
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-green-600 bg-white hover:bg-green-50 transition-all duration-200 transform hover:scale-105">
                Get Started Free
              </Link>
            </div>
            <div className="ml-4 inline-flex rounded-md shadow">
              <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-green-500 bg-opacity-60 hover:bg-opacity-70 transition-all duration-200">
                Live Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Everything you need to know about PassManager
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <dl className="space-y-10">
              {[
                {
                  question: "Is my data really secure?",
                  answer: "Absolutely. We use AES-256 encryption, the same standard adopted by the U.S. government for classified information. Your data is encrypted before it leaves your device and can only be decrypted with your master password."
                },
                {
                  question: "What happens if I forget my master password?",
                  answer: "For security reasons, we don't store your master password. However, we provide account recovery options that you can set up in advance to regain access to your account."
                },
                {
                  question: "Can I share passwords with family members?",
                  answer: "Yes! Our secure sharing feature allows you to share passwords without revealing the actual password. You can revoke access at any time."
                },
                {
                  question: "Do you offer a family plan?",
                  answer: "Yes, our Family Plan allows up to 5 users to share premium features at a discounted rate compared to individual Pro accounts."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <dt className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/features" className="text-base text-gray-300 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-base text-gray-300 hover:text-white">Pricing</Link></li>
                <li><Link href="/security" className="text-base text-gray-300 hover:text-white">Security</Link></li>
                <li><Link href="/integrations" className="text-base text-gray-300 hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="/blog" className="text-base text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="text-base text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link href="/press" className="text-base text-gray-300 hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/support" className="text-base text-gray-300 hover:text-white">Support</Link></li>
                <li><Link href="/documentation" className="text-base text-gray-300 hover:text-white">Documentation</Link></li>
                <li><Link href="/guides" className="text-base text-gray-300 hover:text-white">Guides</Link></li>
                <li><Link href="/webinars" className="text-base text-gray-300 hover:text-white">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/privacy" className="text-base text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="text-base text-gray-300 hover:text-white">Terms</Link></li>
                <li><Link href="/cookie-policy" className="text-base text-gray-300 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold text-white">PassManager</span>
            </div>
            <p className="mt-4 md:mt-0 text-gray-400 text-sm">
              © {new Date().getFullYear()} PassManager. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}