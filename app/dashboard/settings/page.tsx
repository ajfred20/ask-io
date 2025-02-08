"use client";
import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Shield,
  Eye,
  Smartphone,
  Globe,
  Key,
  Mail,
} from "lucide-react";

const settingsSections = [
  {
    id: "profile",
    title: "Profile Settings",
    description: "Manage your personal information",
    icon: User,
  },
  {
    id: "security",
    title: "Security",
    description: "Protect your account",
    icon: Shield,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage your notifications",
    icon: Bell,
  },
] as const;

export default function Settings() {
  const [activeSection, setActiveSection] = useState<string>("profile");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid md:grid-cols-[240px,1fr] gap-8">
        {/* Settings Navigation */}
        <nav className="bg-white rounded-xl border border-gray-200 p-2 h-fit">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <section.icon className="w-5 h-5" />
              {section.title}
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div className="space-y-6">
          {activeSection === "profile" && (
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {/* Profile Photo */}
              <div className="p-6">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Profile Photo
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Change Photo
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="p-6">
                <h2 className="font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      defaultValue="johndoe"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {/* Password */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Password</h2>
                    <p className="text-sm text-gray-600">
                      Update your password
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-black font-medium hover:bg-gray-50 transition-colors">
                  Change Password
                </button>
              </div>

              {/* 2FA */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Two-Factor Authentication
                    </h2>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  Enable 2FA
                </button>
              </div>

              {/* Sessions */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Active Sessions
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage your active sessions
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors text-red-600 hover:text-red-700">
                  Sign out all devices
                </button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-gray-600">
                    Manage your notification settings
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  "Email notifications",
                  "Push notifications",
                  "Weekly digest",
                  "Monthly newsletter",
                  "Security alerts",
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-700">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
