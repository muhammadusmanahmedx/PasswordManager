'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Login successful, redirecting to /dashboard');
        // Hard redirect to ensure JWT cookie is sent to server
        window.location.href = '/dashboard';
      } else {
        console.error('Login failed:', data.message);
        setError(data.message || 'Login failed');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link href="/" className="flex items-center mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Passbuild2Manager</span>
            </Link>
            <Link href="/" className="flex items-center text-gray-700 hover:text-gray-900 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
          <p className="text-gray-600 mb-6">Enter your credentials to access your account</p>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded mb-4 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-800 font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded transition duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Signup Link */}
      <div className="mt-6 text-gray-600">
        Don't have an account?{' '}
        <Link href="/signup" className="text-green-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
