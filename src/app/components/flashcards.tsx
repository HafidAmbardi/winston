"use client";

import { useState } from "react";
import Image from "next/image";
import { Flag } from "lucide-react";

interface FlashCardProps {
  questionNumber: string;
  marks: number;
  question: string;
  latexExpression?: string;
  imageUrl?: string; // Add image URL prop
}

export default function FlashCard({
  questionNumber,
  marks,
  question,
  latexExpression,
  imageUrl = "/math-placeholder.png", // Default image if none provided
}: FlashCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<
    "correct" | "incorrect" | "flagged" | null
  >(null);

  const handleViewAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleAnswerSelection = (
    answer: "correct" | "incorrect" | "flagged"
  ) => {
    setUserAnswer(answer);
  };

  return (
    <div className="w-full p-4 bg-[#FEF1D5] border border-gray-500 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FFC052] rounded-full flex items-center justify-center text-black font-medium border border-[#EEF2F6]">
            {questionNumber}
          </div>
        </div>
        <div className="flex items-center gap-2 text-black font-medium">
          <Flag size={20} />
          <span>{marks} marks</span>
        </div>
      </div>

      <hr className="my-2 border-gray-500" />

      <div className="text-black font-medium mb-4">{question}</div>

      <div className="flex justify-center bg-white p-4 rounded-md shadow">
        {/* Display LaTeX expression if provided, otherwise show image */}
        {latexExpression ? (
          <div className="py-8 text-center text-xl font-mono">
            {latexExpression}
          </div>
        ) : (
          <div className="relative w-[322px] h-[92px]">
            <Image
              src={imageUrl}
              alt="Mathematical expression"
              fill
              sizes="(max-width: 768px) 100vw, 322px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        )}
      </div>

      {!showAnswer && (
        <div className="mt-4">
          <p className="text-black font-medium">Bagaimana pengerjaanmu?</p>
          <div className="flex gap-4 mt-2">
            <button
              className={`p-2 ${
                userAnswer === "correct" ? "bg-green-200" : "bg-[#FFC052]"
              } rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center`}
              onClick={() => handleAnswerSelection("correct")}
              aria-label="Jawaban benar"
            >
              <div className="relative w-4 h-4">
                <Image src="/check.png" alt="Check Icon" fill sizes="16px" />
              </div>
            </button>

            <button
              className={`p-2 ${
                userAnswer === "incorrect" ? "bg-red-200" : "bg-[#FFC052]"
              } rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center`}
              onClick={() => handleAnswerSelection("incorrect")}
              aria-label="Jawaban salah"
            >
              <div className="relative w-4 h-4">
                <Image
                  src="/no(wrong).png"
                  alt="Wrong Icon"
                  fill
                  sizes="16px"
                />
              </div>
            </button>

            <button
              className={`p-2 ${
                userAnswer === "flagged" ? "bg-yellow-300" : "bg-[#FFC052]"
              } rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center`}
              onClick={() => handleAnswerSelection("flagged")}
              aria-label="Tandai soal"
            >
              <div className="relative w-4 h-4">
                <Image src="/flag.png" alt="Flag Icon" fill sizes="16px" />
              </div>
            </button>
          </div>
        </div>
      )}

      {showAnswer && (
        <div className="mt-4 p-4 bg-white rounded-md">
          <h3 className="font-medium text-lg mb-2">Jawaban:</h3>
          <div className="text-gray-800">
            {latexExpression === "∫ x² dx" ? (
              <p className="font-mono">x³/3 + C</p>
            ) : (
              <p>Jawaban tidak tersedia</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-[#FFC052] text-black font-medium rounded-md shadow"
          onClick={handleViewAnswer}
        >
          {showAnswer ? "Sembunyikan Jawaban" : "Lihat Jawaban"}
        </button>
      </div>
    </div>
  );
}
