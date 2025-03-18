"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <span className="text-lg font-semibold text-black tracking-tight">
              ask.io
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-8 mr-8">
              {[
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/docs", label: "Docs" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {user && (
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    pathname?.startsWith("/dashboard")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <span className="text-sm font-medium">{user.name}</span>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/dashboard/ai"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    AI Assistant
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3">
            <div className="flex flex-col gap-4">
              {[
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/docs", label: "Docs" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors px-2 py-1.5 rounded-lg ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium transition-colors px-2 py-1.5 rounded-lg ${
                      pathname?.startsWith("/dashboard")
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="text-sm font-medium transition-colors px-2 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/dashboard/ai"
                    className="text-sm font-medium transition-colors px-2 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    AI Assistant
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium transition-colors px-2 py-1.5 rounded-lg text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium transition-colors px-2 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
