"use client";

import { Bell, Search } from "lucide-react";
import Image from "next/image";

export default function WinstonHeader() {
  return (
    <header className="h-16 bg-[#fdf6ed] border-b border-[#e8e0d5] flex items-center justify-between px-6">
      {/* Dashboard Title */}
      <h1 className="text-xl font-medium">Dashboard</h1>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <button className="w-10 h-10 bg-[#f0a030] rounded-full flex items-center justify-center text-white">
          <Search className="w-5 h-5" />
        </button>

        {/* Notification Button */}
        <button className="w-10 h-10 bg-[#f0a030] rounded-full flex items-center justify-center text-white">
          <Bell className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full border border-[#e8e0d5]">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">Daniel Mandela Tulung</span>
        </div>
      </div>
    </header>
  );
}
