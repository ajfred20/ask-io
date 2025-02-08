import { Bot, Clock, Calendar } from "lucide-react";

export default function Recent() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recent Activity</h1>
        <p className="text-gray-600">Your research history and recent chats</p>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <h2 className="font-semibold text-gray-900">Today</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    Research Session #{i + 1}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Explored topics related to artificial intelligence and
                    machine learning
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">2 hours ago</span>
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
