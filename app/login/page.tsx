"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Failed to log in. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Home */}
      <Link
        href="/"
        className="fixed top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="flex min-h-screen">
        {/* Left Column - Image */}
        <div className="hidden lg:flex w-1/2 relative bg-blue-50">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
            <Image
              src="/assets/ai-search.svg"
              alt="AI Search Illustration"
              width={600}
              height={500}
              className="object-contain"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your AI Research Companion
              </h2>
              <p className="text-gray-600">
                Get instant answers to your questions from across the web
              </p>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600">
                Continue exploring answers to your questions
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className="block w-full pl-10 px-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      required
                      className="block w-full pl-10 px-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Image
                    src="/assets/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Google
                  </span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Image
                    src="/assets/github.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    GitHub
                  </span>
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
