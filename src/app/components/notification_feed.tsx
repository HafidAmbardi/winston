"use client";

import { Bell } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  timestamp: string;
  description: string;
}

interface NotificationFeedProps {
  title?: string;
  notifications?: NotificationItem[];
}

export default function NotificationFeed({
  title = "Rekomendasi Materi",
  notifications = [
    {
      id: "1",
      title: "Belajar Matematika Dasar",
      timestamp: "22 DEC 7:20 PM",
      description: "People care about how you see the world, how you think,",
    },
    {
      id: "2",
      title: "Belajar Matematika Dasar",
      timestamp: "22 DEC 7:20 PM",
      description: "People care about how you see the world, how you think,",
    },
    {
      id: "3",
      title: "Belajar Matematika Dasar",
      timestamp: "22 DEC 7:20 PM",
      description: "People care about how you see the world, how you think,",
    },
    {
      id: "4",
      title: "Belajar Matematika Dasar",
      timestamp: "22 DEC 7:20 PM",
      description: "People care about how you see the world, how you think,",
    },
    {
      id: "5",
      title: "Belajar Matematika Dasar",
      timestamp: "22 DEC 7:20 PM",
      description: "People care about how you see the world, how you think,",
    },
    {
      id: "6",
      title: "Belajar Matematika Dasar",
      timestamp: "22 DEC 7:20 PM",
      description: "People care about how you see the world, how you think,",
    },
  ],
}: NotificationFeedProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      <div className="relative p-4">
        {/* Timeline connector line */}
        <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gray-200"></div>

        {/* Notification items */}
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div key={notification.id} className="relative flex">
              {/* Icon with circle */}
              <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#BD7800] flex items-center justify-center mr-4">
                <Bell className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-base font-bold">{notification.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {notification.timestamp}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
