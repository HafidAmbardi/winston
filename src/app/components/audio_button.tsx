"use client";

import { Volume2 } from "lucide-react";

interface AudioButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  text?: string;
}

export default function AudioButton({
  isActive = false,
  onClick,
  text = "Dengarkan Penjelasan",
}: AudioButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        isActive ? "bg-amber-600 text-white" : "bg-amber-100 text-gray-800"
      }`}
    >
      <Volume2 className="w-8 h-8" />
      <span className="text-xs">{text}</span>
    </button>
  );
}
