"use client";

import { Medal } from "lucide-react";
import Image from "next/image";

interface AchievementProps {
  value: number;
  percentage?: number;
}

function Achievement({ value }: AchievementProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-amber-500/10">
        <Medal className="w-6 h-6 text-amber-500" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}/100</div>
        <div className="text-sm text-amber-500">
          Nilai terbaikmu sejauh ini!
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
  achievement?: {
    value: number;
    percentage?: number;
  };
  users?: LeaderboardUser[];
}

export default function Leaderboard({
  title = "Pencapaian Terbaikmu",
  achievement = { value: 0, percentage: 0 },
  users = [],
}: LeaderboardProps) {
  // Safety check - ensure users is an array
  const safeUsers = Array.isArray(users) ? users : [];

  // Ensure achievement has valid values
  const safeAchievement = {
    value: achievement?.value || 0,
    percentage: achievement?.percentage || 0,
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="p-6">
        <Achievement
          value={safeAchievement.value}
          percentage={safeAchievement.percentage}
        />
      </div>

      {/* Leaderboard Users List */}
      <div className="px-4">
        {safeUsers.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            Belum ada data pencapaian
          </div>
        ) : (
          safeUsers.map((user, index) => (
            <div key={index} className="py-3 border-t first:border-t-0">
              <div className="flex items-center">
                <span className="w-6 text-gray-500 font-medium">
                  {user.rank}
                </span>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <span className="ml-3 flex-grow font-medium">{user.name}</span>
                <span className="text-purple-600 font-bold">{user.score}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
