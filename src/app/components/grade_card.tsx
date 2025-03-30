"use client";
import {
  Calculator,
  FileImage,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";

interface ExerciseResult {
  id: string;
  title: string;
  timestamp: string;
  score: string;
  maxScore: string | number;
  icon: "calculator" | "image" | "graduation";
}

interface GradeCardProps {
  title?: string;
  totalScore?: number;
  results?: ExerciseResult[];
}

export default function GradeCard({
  title = "Nilai Hasil Latihanmu!",
  totalScore = 90.5,
  results = [
    {
      id: "1",
      title: "Latihan Integral",
      timestamp: "Today, 16:36",
      score: "80.5",
      maxScore: "100",
      icon: "calculator",
    },
    {
      id: "2",
      title: "Deskripsi Gambar",
      timestamp: "23 Jun, 13:06",
      score: "70",
      maxScore: "100",
      icon: "image",
    },
    {
      id: "3",
      title: "Pemecahan Masalah",
      timestamp: "21 Jun, 19:04",
      score: "16",
      maxScore: "24",
      icon: "graduation",
    },
  ],
}: GradeCardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      {/* Total Score Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-[#C77F00] to-amber-400 rounded-lg p-4 text-white relative">
          <p className="text-sm opacity-90">Total score</p>
          <p className="text-4xl font-bold mt-1">{totalScore}</p>
          <button className="absolute top-4 right-4 text-white">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Recent Results */}
      <div className="px-4 pb-4">
        <p className="text-sm text-blue-400 mb-3">Recent</p>

        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="flex items-center">
              {/* Icon */}
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                {result.icon === "calculator" && (
                  <Calculator className="w-4 h-4 text-gray-700" />
                )}
                {result.icon === "image" && (
                  <FileImage className="w-4 h-4 text-gray-700" />
                )}
                {result.icon === "graduation" && (
                  <GraduationCap className="w-4 h-4 text-gray-700" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-medium">{result.title}</p>
                <p className="text-xs text-gray-500">{result.timestamp}</p>
              </div>

              {/* Score */}
              <div className="text-right">
                <p className="text-sm font-medium text-blue-900">
                  {result.score}/{result.maxScore}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
