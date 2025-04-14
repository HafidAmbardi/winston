"use client";

interface InfoBarProps {
  duration: string;
  questionCount: number;
  onDownload: () => void;
  onAnswers: () => void;
}

export default function InfoBar({
  duration = "3 hours",
  questionCount = 25,
}: InfoBarProps) {
  return (
    <div className="w-full flex justify-between items-center py-3 border-b border-gray-200">
      <div className="text-gray-900 font-medium">
        {duration} <span className="mx-1">•</span> {questionCount} questions
      </div>
    </div>
  );
}
