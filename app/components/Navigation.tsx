"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <span className="text-lg font-semibold text-black tracking-tight">
            ask.io
          </span>
        </Link>

        <div className="flex items-center">
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
          </div>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
