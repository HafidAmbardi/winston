"use client";

import { Bell, Search } from "lucide-react";
import Image from "next/image";
import WhiteNoiseToggle from "@/app/components/whitenoise";

interface WinstonHeaderProps {
  userName?: string;
  onWhiteNoiseToggle?: (enabled: boolean) => void;
}

export default function WinstonHeader({
  userName = "Rafael Pereira",
  onWhiteNoiseToggle,
}: WinstonHeaderProps) {
  return (
    <header className="h-16 bg-[#fdf6ed] border-b border-[#e8e0d5] flex items-center justify-between px-6">
      <h1 className="text-xl font-medium">Dashboard</h1>

      <div className="flex items-center gap-3">
        <WhiteNoiseToggle onChange={onWhiteNoiseToggle} />

        <button className="w-10 h-10 bg-[#f0a030] rounded-full flex items-center justify-center text-white">
          <Search className="w-5 h-5" />
        </button>

        <button className="w-10 h-10 bg-[#f0a030] rounded-full flex items-center justify-center text-white">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full border border-[#e8e0d5]">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <Image
              src="/avatar.webp"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">{userName}</span>
        </div>
      </div>
    </header>
  );
}
