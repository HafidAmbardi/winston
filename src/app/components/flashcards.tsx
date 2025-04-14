"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Flag, Star } from "lucide-react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/auth_context";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";

interface FlashCardProps {
  id?: string; // ID of the quiz or flashcard
  questionNumber: string;
  marks: number;
  question: string;
  latexExpression?: string;
  imageUrl?: string;
  answer?: string;
  category?: string;
  parentTitle?: string;
  isBookmarkable?: boolean;
}

export default function FlashCard({
  id = `flashcard-${Math.random().toString(36).substring(2)}`,
  questionNumber,
  marks,
  question,
  latexExpression,
  imageUrl = "/math-placeholder.png",
  answer,
  category = "mathematics",
  parentTitle = "Practice Flashcards",
  isBookmarkable = true,
}: FlashCardProps) {
  const { user } = useAuth();
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<
    "correct" | "incorrect" | "flagged" | null
  >(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Store original ID to avoid re-generation on re-renders
  const stableId = useRef(id);

  // Generate a consistent bookmark ID
  const bookmarkId = id.startsWith("flashcard-")
    ? id
    : `flashcard-${stableId.current}`;

  // Check if this flashcard is already bookmarked when the component mounts
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user || !isBookmarkable) return;

      try {
        const bookmarkRef = doc(db, `users/${user.uid}/bookmarks`, bookmarkId);
        const bookmarkDoc = await getDoc(bookmarkRef);
        setIsBookmarked(bookmarkDoc.exists());
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [user, bookmarkId, isBookmarkable]);

  const handleViewAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleAnswerSelection = (
    answer: "correct" | "incorrect" | "flagged"
  ) => {
    setUserAnswer(answer);
  };

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast.error("Please login to save flashcards");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      const bookmarkRef = doc(db, `users/${user.uid}/bookmarks`, bookmarkId);
      const bookmarkDoc = await getDoc(bookmarkRef);
      const currentlyBookmarked = bookmarkDoc.exists();

      if (currentlyBookmarked) {
        // Remove bookmark
        await deleteDoc(bookmarkRef);
        toast.success("Flashcard removed from saved items");
        setIsBookmarked(false);
      } else {
        // Add bookmark
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        await setDoc(bookmarkRef, {
          id: bookmarkId,
          type: "flashcard",
          title: question,
          materialType: "flashcard",
          parentTitle: parentTitle,
          summaryPoints: [latexExpression || ""],
          detailedExplanation: answer || "",
          createdAt: Timestamp.now(),
          // SRS fields
          reviewCount: 1,
          lastReviewedDate: Timestamp.now(),
          nextReviewDate: Timestamp.fromDate(tomorrow),
          srsStatus: "new",
        });
        toast.success("Flashcard saved for later review");
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update saved items");
    } finally {
      setLoading(false);
    }
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
          {isBookmarkable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!loading) handleBookmarkToggle();
              }}
              disabled={loading}
              aria-label={
                isBookmarked ? "Remove from saved items" : "Save for later"
              }
              className={`p-1 rounded-full hover:bg-amber-100 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Star
                className={`w-5 h-5 ${
                  isBookmarked
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              />
            </button>
          )}
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
            {answer ? (
              <p className="font-mono">{answer}</p>
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
