"use client";
import {
  Bot,
  Clock,
  Calendar,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useState } from "react";

type ResearchSession = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  topics: string[];
};

export default function Recent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "today" | "week" | "month"
  >("all");

  const researchSessions: ResearchSession[] = [
    {
      id: 1,
      title: "AI and Machine Learning Research",
      description:
        "Explored neural networks, deep learning architectures, and their applications in modern technology",
      timestamp: "2 hours ago",
      topics: ["AI", "Neural Networks", "Deep Learning"],
    },
    {
      id: 2,
      title: "Quantum Computing Basics",
      description:
        "Researched fundamental principles of quantum computing and its potential impact on cryptography",
      timestamp: "5 hours ago",
      topics: ["Quantum", "Computing", "Cryptography"],
    },
    {
      id: 3,
      title: "Renewable Energy Technologies",
      description:
        "Investigated current trends in solar, wind, and hydroelectric power generation methods",
      timestamp: "1 day ago",
      topics: ["Energy", "Solar", "Sustainability"],
    },
  ];

  const filteredSessions = researchSessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Research History</h1>
        <p className="text-gray-600">
          View and manage your past research sessions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search your research..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-gray-600 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            Sort
          </button>
        </div>
      </div>

      {/* Time Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {["all", "today", "week", "month"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as typeof selectedFilter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === filter
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Research Sessions */}
      <div className="grid gap-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {session.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {session.timestamp}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-gray-600 text-sm">
                  {session.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {session.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
