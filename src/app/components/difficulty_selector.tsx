"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DifficultyOption {
  id: string;
  label: string;
}

interface DifficultyProps {
  options?: DifficultyOption[];
  defaultSelected?: string;
  totalPages?: number;
  defaultPage?: number;
  onDifficultyChange?: (difficulty: string) => void;
  onPageChange?: (page: number) => void;
}

export default function DifficultySelector({
  options = [
    { id: "easy", label: "Mudah" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Susah" },
  ],
  defaultSelected = "easy",
  totalPages = 6,
  defaultPage = 1,
  onDifficultyChange = () => {},
  onPageChange = () => {},
}: DifficultyProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(defaultSelected);
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    onDifficultyChange(difficulty);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="w-full">
      {/* Difficulty options */}
      <div className="flex justify-between border-b border-gray-200 pb-2">
        {options.map((option) => (
          <button
            key={option.id}
            className={`px-4 py-1 font-medium ${
              selectedDifficulty === option.id
                ? "text-amber-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => handleDifficultyChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-1 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === pageNumber
                  ? "bg-amber-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
