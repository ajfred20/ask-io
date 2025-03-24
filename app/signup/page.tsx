"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { generateOTP, verifyOTP } from '@/app/lib/otp';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [verifying, setVerifying] = useState(false);
  
  const { signup } = useAuth();
  const router = useRouter();

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Generate and send OTP
      const result = await generateOTP(email);
      if (result) {
        setStep('verify');
      } else {
        setError('Failed to send verification code. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setVerifying(true);
    
    try {
      const isValid = await verifyOTP(email, otpCode);
      if (isValid) {
        // Proceed with signup
        const success = await signup(email, password, name);
        if (success) {
          router.push('/dashboard');
        } else {
          setError('Failed to create an account. Email might be already in use.');
        }
      } else {
        setOtpError('Invalid or expired verification code.');
      }
    } catch (err) {
      setOtpError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Home */}
      <Link
        href="/"
        className="fixed top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="flex min-h-screen">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
          <div className="max-w-md w-full">
            {step === 'details' ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                    Start finding answers
                  </h1>
                  <p className="text-gray-600">
                    Join thousands of users getting instant answers to their
                    questions using AI
                  </p>
                </div>

                {/* Sign Up Form */}
                <div className="space-y-6">
                  <form onSubmit={handleInitialSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          className="block w-full pl-10 px-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
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
                          Create Account
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Social Login Section */}
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

                  {/* Social Buttons */}
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
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* OTP verification form */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                    Verify your email
                  </h1>
                  <p className="text-gray-600">
                    We've sent a verification code to {email}
                  </p>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-6">
                  {otpError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <p className="text-red-700">{otpError}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      className="block w-full px-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-center text-2xl tracking-widest font-mono"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={verifying || otpCode.length !== 6}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors disabled:opacity-50"
                  >
                    {verifying ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Verify Email
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleInitialSubmit}
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Resend
                    </button>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden lg:flex w-1/2 relative bg-blue-50">
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 to-blue-100" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
            <Image
              src="/assets/ai-answers.svg"
              alt="AI Answers Illustration"
              width={600}
              height={500}
              className="object-contain"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Instant Answers
              </h2>
              <p className="text-gray-600">
                Our AI scans the web to find the best answers to your questions
              </p>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
}
