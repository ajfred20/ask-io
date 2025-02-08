import { Bot, Clock, Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, John!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your research
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all text-left group">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">New AI Chat</h3>
          <p className="text-sm text-gray-600">
            Start a new research conversation
          </p>
        </button>

        <button className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all text-left group">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Quick Search</h3>
          <p className="text-sm text-gray-600">Search through your research</p>
        </button>

        <button className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all text-left group">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Recent Activity</h3>
          <p className="text-sm text-gray-600">View your recent research</p>
        </button>
      </div>

      {/* Recent Chats */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Chats</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Bot className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Research Chat #{i + 1}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Last updated 2 hours ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
