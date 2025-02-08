"use client";
import { useState } from "react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your login logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-32 pb-20 px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">Sign in to continue your research</p>
          </div>

          {/* Login Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
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
  );
}
