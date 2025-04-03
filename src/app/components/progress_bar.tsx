"use client";

import { useState, useEffect } from "react";

interface ProgressBarProps {
  percentage: number;
  totalSteps?: number;
  showPercentage?: boolean;
  showFraction?: boolean;
  showCompletionText?: boolean;
}

export default function ProgressBar({
  percentage = 70,
  totalSteps = 6,
  showPercentage = true,
  showFraction = true,
  showCompletionText = true,
}: ProgressBarProps) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    // Calculate completed steps based on percentage
    const completed = Math.round((percentage / 100) * totalSteps);
    setCompletedSteps(Math.min(completed, totalSteps));
  }, [percentage, totalSteps]);

  return (
    <div className="w-full mx-auto p-4">
      {showPercentage && (
        <div className="text-4xl font-bold mb-6">{percentage}%</div>
      )}

      <div className="relative">
        {/* Step Indicators - Moved before the progress bar */}
        <div className="flex justify-between absolute w-full z-10">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isCompleted = index < completedSteps;
            return (
              <div
                key={index}
                className={`w-12 h-12 rounded-full ${
                  isCompleted ? "bg-[#f0a030]" : "bg-gray-200"
                } shadow-sm transition-colors duration-300 -mt-2.5`}
              />
            );
          })}
        </div>

        {/* Progress Bar Track */}
        <div className="h-6 bg-gray-200 rounded-full">
          {/* Progress Bar Fill */}
          <div
            className="h-6 bg-[#f0a030] rounded-full absolute top-0 left-0 transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Bottom Labels */}
      <div className="flex justify-between mt-8 text-sm">
        {showFraction && (
          <div className="text-gray-600">
            {completedSteps}/{totalSteps}
          </div>
        )}
        {showCompletionText && (
          <div className="text-gray-600">Task Completed</div>
        )}
      </div>
    </div>
  );
}
