"use client";
import {
  Calculator,
  FileImage,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";

// Export this interface so it can be imported elsewhere
export interface ExerciseResult {
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
  totalScore = 0,
  results = [],
}: GradeCardProps) {
  // Ensure totalScore is a valid number
  const safeTotalScore =
    typeof totalScore === "number" && !isNaN(totalScore) ? totalScore : 0;

  // Ensure results is an array with valid items
  const safeResults = Array.isArray(results)
    ? results.filter(
        (result) =>
          typeof result === "object" &&
          result !== null &&
          typeof result.id === "string" &&
          typeof result.title === "string" &&
          typeof result.timestamp === "string" &&
          (typeof result.score === "string" ||
            typeof result.score === "number") &&
          (typeof result.maxScore === "string" ||
            typeof result.maxScore === "number") &&
          (result.icon === "calculator" ||
            result.icon === "image" ||
            result.icon === "graduation")
      )
    : [];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      {/* Total Score Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-40% from-[#C77F00] to-[#FFCE84] rounded-3xl p-4 text-white relative">
          <p className="text-sm opacity-90">Total score</p>
          <p className="text-4xl font-bold mt-1">{safeTotalScore.toFixed(1)}</p>
          <button className="absolute top-4 right-4 text-white">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Recent Results */}
      <div className="px-4 pb-4">
        <p className="text-sm text-blue-400 mb-3">Recent</p>

        <div className="space-y-4">
          {safeResults.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No practice results yet. Complete a quiz to see your results here.
            </div>
          ) : (
            safeResults.map((result) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
