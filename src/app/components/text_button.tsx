"use client";

import { FileText } from "lucide-react";

interface TextButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  text?: string;
}

export default function TextButton({
  isActive = false,
  onClick,
  text = "Ringkasan Teks",
}: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        isActive ? "bg-amber-600 text-white" : "bg-amber-100 text-gray-800"
      }`}
    >
      <FileText className="w-8 h-8" />
      <span className="text-xs">{text}</span>
    </button>
  );
}
