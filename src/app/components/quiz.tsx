"use client";

import { ChevronRight } from "lucide-react";

interface QuizItem {
  id: string;
  title: string;
  description: string;
}

interface QuizListProps {
  title?: string;
  quizzes?: QuizItem[];
  onSelectQuiz?: (quizId: string) => void;
}

export default function QuizList({
  title = "Uji Pengetahuan dan Kemampuanmu!",
  quizzes = [
    { id: "1", title: "Quiz A", description: "50 soal tersedia" },
    { id: "2", title: "Quiz A", description: "50 soal tersedia" },
    { id: "3", title: "Quiz A", description: "50 soal tersedia" },
    { id: "4", title: "Quiz A", description: "50 soal tersedia" },
    { id: "5", title: "Quiz A", description: "50 soal tersedia" },
  ],
  onSelectQuiz = (quizId) => console.log(`Quiz ${quizId} selected`),
}: QuizListProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div>
        {quizzes.map((quiz, index) => (
          <div key={quiz.id}>
            <div className="flex items-center justify-between p-4">
              <div>
                <h4 className="font-medium">{quiz.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
              </div>
              <button
                onClick={() => onSelectQuiz(quiz.id)}
                className="w-10 h-10 bg-[#C77F00] rounded flex items-center justify-center text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            {index < quizzes.length - 1 && <div className="border-b"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
