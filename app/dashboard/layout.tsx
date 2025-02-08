"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bot,
  Clock,
  Settings,
  User,
  Menu,
  X,
  LogOut,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

type SidebarLink =
  | {
      title: string;
      icon: LucideIcon;
      href: string;
    }
  | {
      divider: true;
    };

const sidebarLinks: SidebarLink[] = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "AI Chat",
    icon: Bot,
    href: "/dashboard/ai",
  },
  {
    title: "Recent",
    icon: Clock,
    href: "/dashboard/recent",
  },
  {
    divider: true,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
] as const;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-4 border-b border-gray-100">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <span className="text-xl text-black font-semibold">ask.io</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {sidebarLinks.map((link, index) =>
                "divider" in link ? (
                  <li key={index} className="my-4 border-t border-gray-100" />
                ) : (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">
                  john@example.com
                </p>
              </div>
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <LogOut className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Top Bar */}
        <header className="h-16 fixed top-0 right-0 left-0 md:left-64 bg-white border-b border-gray-200 z-30">
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 md:hidden"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-4">
              {/* Add any header content here */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
