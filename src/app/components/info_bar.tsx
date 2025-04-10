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
  onDownload = () => console.log("Download clicked"),
  onAnswers = () => console.log("Jawaban clicked"),
}: InfoBarProps) {
  return (
    <div className="w-full flex justify-between items-center py-3 border-b border-gray-200">
      <div className="text-gray-900 font-medium">
        {duration} <span className="mx-1">•</span> {questionCount} questions
      </div>
      <div className="flex gap-2">
        <button
          onClick={onDownload}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-md font-medium text-sm"
        >
          Download
        </button>
        <button
          onClick={onAnswers}
          className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-4 py-1.5 rounded-md font-medium text-sm"
        >
          Jawaban
        </button>
      </div>
    </div>
  );
}
