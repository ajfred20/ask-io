"use client";
import { Bot, Clock, ArrowUp, ArrowDown, Zap, Brain, Target } from "lucide-react";
import { useState } from "react";

type Stat = {
  label: string;
  value: string;
  change: number;
  timeframe: string;
};

type RecentActivity = {
  id: number;
  title: string;
  timestamp: string;
  type: "research" | "chat" | "analysis";
};

export default function Dashboard() {
  const stats: Stat[] = [
    {
      label: "Research Sessions",
      value: "156",
      change: 12,
      timeframe: "vs last month",
    },
    {
      label: "Questions Asked",
      value: "2,451",
      change: -4,
      timeframe: "vs last month",
    },
    {
      label: "Topics Explored",
      value: "38",
      change: 8,
      timeframe: "vs last month",
    },
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: 1,
      title: "Quantum Computing Research",
      timestamp: "2 hours ago",
      type: "research",
    },
    {
      id: 2,
      title: "AI Ethics Discussion",
      timestamp: "5 hours ago",
      type: "chat",
    },
    {
      id: 3,
      title: "Climate Data Analysis",
      timestamp: "1 day ago",
      type: "analysis",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your research activity</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">New Chat</h3>
              <p className="text-sm text-white/80">Start a research conversation</p>
            </div>
          </div>
        </button>
        <button className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Quick Analysis</h3>
              <p className="text-sm text-gray-600">Analyze a document or link</p>
            </div>
          </div>
        </button>
        <button className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Set Goals</h3>
              <p className="text-sm text-gray-600">Track your research goals</p>
            </div>
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change > 0 ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.timeframe}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  {activity.type === "research" && <Bot className="w-5 h-5 text-blue-600" />}
                  {activity.type === "chat" && <Zap className="w-5 h-5 text-blue-600" />}
                  {activity.type === "analysis" && <Brain className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
