"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/app/firebase/config";

interface QuizItem {
  id: string;
  title: string;
  description: string;
  materialId?: string;
  category?: string;
}

interface QuizListProps {
  title?: string;
  quizzes?: QuizItem[];
  onSelectQuiz?: (quizId: string) => void;
  category?: string;
}

export default function QuizList({
  title = "Uji Pengetahuan dan Kemampuanmu!",
  quizzes = [], // We'll ignore this prop as we're fetching from Firestore
  onSelectQuiz = (quizId) => console.log(`Quiz ${quizId} selected`),
  category = "mathematics",
}: QuizListProps) {
  const router = useRouter();
  const [loadedQuizzes, setLoadedQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);

        // Query materials by category and limit to 5 random materials
        const materialsQuery = query(
          collection(db, "materials"),
          where("category", "==", category),
          limit(5)
        );

        const materialsSnapshot = await getDocs(materialsQuery);

        if (materialsSnapshot.empty) {
          console.log("No matching materials found");
          setLoadedQuizzes([]);
          return;
        }

        // Create quiz items from materials
        const materialQuizzes = materialsSnapshot.docs.map((doc) => {
          const material = doc.data();
          return {
            id: doc.id,
            title: material.title,
            description: `${material.difficulty} • ${
              material.quizzes?.length || 0
            } soal tersedia`,
            materialId: doc.id,
            category: material.category,
          };
        });

        setLoadedQuizzes(materialQuizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setLoadedQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [category]);

  // Handle quiz selection and navigation
  const handleQuizSelect = (quiz: QuizItem) => {
    onSelectQuiz(quiz.id);

    if (quiz.materialId) {
      // Navigate directly to the material page using the materialId
      router.push(`/matematika/${quiz.materialId}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      {loadedQuizzes.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Tidak ada quiz tersedia
        </div>
      ) : (
        <div>
          {loadedQuizzes.map((quiz, index) => (
            <div key={quiz.id}>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h4 className="font-bold">{quiz.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {quiz.description}
                  </p>
                </div>
                <button
                  onClick={() => handleQuizSelect(quiz)}
                  className="w-8 h-8 bg-[#C77F00] rounded flex items-center justify-center text-white hover:bg-[#A36800] transition-colors"
                  aria-label={`Lihat ${quiz.title}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              {index < loadedQuizzes.length - 1 && (
                <div className="border-b"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
