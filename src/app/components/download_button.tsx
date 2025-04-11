"use client";

interface TextButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  text?: string;
}

export default function TextButton({
  isActive = false,
  onClick,
  text = "Download Materi",
}: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        isActive ? "bg-amber-600 text-white" : "bg-amber-100 text-gray-800"
      }`}
    >
      {/* Import icon from public directory */}
      <img
        src="/download_button.svg"
        alt="Download Button Icon"
        className="w-8 h-8"
      />
      <span className="text-xs">{text}</span>
    </button>
  );
}
