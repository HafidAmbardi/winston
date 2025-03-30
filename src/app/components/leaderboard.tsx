"use client";

import { Medal, BarChart3 } from "lucide-react";

interface AchievementProps {
  value: number;
  percentage: number;
  icon: "medal" | "chart";
}

function Achievement({ value, percentage, icon }: AchievementProps) {
  const iconColor = icon === "medal" ? "text-amber-500" : "text-emerald-500";
  const bgColor = icon === "medal" ? "bg-amber-500/10" : "bg-emerald-500/10";

  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-full ${bgColor}`}>
        {icon === "medal" ? (
          <Medal className={`w-6 h-6 ${iconColor}`} />
        ) : (
          <BarChart3 className={`w-6 h-6 ${iconColor}`} />
        )}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-sm ${iconColor}`}>
          {percentage.toFixed(2)}% da Meta
        </div>
      </div>
    </div>
  );
}

interface LeaderboardUser {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
}

interface LeaderboardProps {
  title?: string;
  achievements?: {
    medal: { value: number; percentage: number };
    chart: { value: number; percentage: number };
  };
  users?: LeaderboardUser[];
}

export default function Leaderboard({
  title = "Pencapaian Terbaikmu",
  achievements = {
    medal: { value: 13, percentage: 109.72 },
    chart: { value: 13, percentage: 109.72 },
  },
  users = [
    { rank: 1, name: "Rafael Pereira", score: 20, avatar: "" },
    { rank: 2, name: "Rafael Pereira", score: 20, avatar: "" },
    { rank: 3, name: "Rafael Pereira", score: 20, avatar: "" },
    { rank: 4, name: "Rafael Pereira", score: 20, avatar: "" },
  ],
}: LeaderboardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <Achievement
          value={achievements.medal.value}
          percentage={achievements.medal.percentage}
          icon="medal"
        />
        <Achievement
          value={achievements.chart.value}
          percentage={achievements.chart.percentage}
          icon="chart"
        />
      </div>

      {/* Leaderboard Users List */}
      <div className="px-4">
        {users.map((user, index) => (
          <div key={index} className="py-3 border-t first:border-t-0">
            <div className="flex items-center">
              <span className="w-6 text-gray-500 font-medium">{user.rank}</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
              <span className="ml-3 flex-grow font-medium">{user.name}</span>
              <span className="text-purple-600 font-bold text-xs">
                {user.score}
                <span className="block text-center text-xs">0</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
