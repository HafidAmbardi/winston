"use client";

interface StudyPlanButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  text?: string;
}

export default function StudyPlanButton({
  isActive = false,
  onClick,
  text = "Buat Rencana Belajar",
}: StudyPlanButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        isActive ? "bg-amber-600 text-white" : "bg-amber-100 text-gray-800"
      }`}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M9 12H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 16H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="text-sm">{text}</span>
    </button>
  );
}
