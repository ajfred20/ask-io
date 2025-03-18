"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { Bot, User, Settings, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Assistant Card */}
        <Link
          href="/dashboard/ai"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            AI Assistant
          </h2>
          <p className="text-gray-600 mb-4">
            Ask questions and get instant answers from our AI research assistant.
          </p>
          <div className="flex items-center text-blue-600 font-medium">
            <span>Start chatting</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Profile Card */}
        <Link
          href="/dashboard/profile"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            Your Profile
          </h2>
          <p className="text-gray-600 mb-4">
            View and update your profile information and preferences.
          </p>
          <div className="flex items-center text-blue-600 font-medium">
            <span>Manage profile</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Settings Card */}
        <Link
          href="/dashboard/settings"
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            Settings
          </h2>
          <p className="text-gray-600 mb-4">
            Configure your account settings and preferences.
          </p>
          <div className="flex items-center text-blue-600 font-medium">
            <span>Adjust settings</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="text-gray-600 text-center py-8">
          <p>Your recent activity will appear here.</p>
        </div>
      </div>
    </div>
  );
}
