"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import RegularCourseMaterial from "@/app/components/regular_course_material";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import StudyPlanButton from "@/app/components/study_plan_button";
import QuizList from "@/app/components/quiz";
import FlashCard from "@/app/components/flashcards";
import InfoBar from "@/app/components/info_bar";
import DifficultySelector from "@/app/components/difficulty_selector";

// Interface for quiz structure from Firestore
interface Quiz {
  id: string;
  category: string;
  difficulty: string;
  instruction: string;
  text: string;
  image_path: string;
  answer: string;
}

// Interface for Material document structure
interface Material {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  image_path: string;
  price: number;
  quizzes: { quizId: string; marks: number }[];
}

interface MaterialQuizComponentProps {
  materialId: string;
}

export default function MaterialQuizComponent({
  materialId,
}: MaterialQuizComponentProps) {
  const [activeOption, setActiveOption] = useState<
    "audio" | "text" | "study" | null
  >(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState<Material | null>(null);
  const [quizzes, setQuizzes] = useState<Array<Quiz & { marks: number }>>([]);
  const [recommendedQuizzes, setRecommendedQuizzes] = useState<
    { id: string; title: string; description: string }[]
  >([]);

  // Fetch material and quiz data
  useEffect(() => {
    const fetchData = async () => {
      if (!materialId) return;

      try {
        setLoading(true);

        // Fetch material document
        const materialRef = doc(db, "materials", materialId);
        const materialDoc = await getDoc(materialRef);

        if (!materialDoc.exists()) {
          console.error("Material not found");
          setLoading(false);
          return;
        }

        const materialData = {
          id: materialDoc.id,
          ...materialDoc.data(),
        } as Material;
        setMaterial(materialData);

        // Fetch all related quizzes
        const quizPromises = materialData.quizzes.map(async (quizInfo) => {
          const quizRef = doc(db, "quizzes", quizInfo.quizId);
          const quizDoc = await getDoc(quizRef);

          if (quizDoc.exists()) {
            return {
              ...quizDoc.data(),
              id: quizDoc.id,
              marks: quizInfo.marks,
            } as Quiz & { marks: number };
          }
          return null;
        });

        const quizResults = await Promise.all(quizPromises);
        const validQuizzes = quizResults.filter((q) => q !== null) as Array<
          Quiz & { marks: number }
        >;
        setQuizzes(validQuizzes);

        // Also fetch some recommended quizzes from the same category
        const categoryQuery = query(
          collection(db, "quizzes"),
          where("category", "==", materialData.category),
          where("difficulty", "==", materialData.difficulty)
        );

        const categoryDocs = await getDocs(categoryQuery);
        const recommendations = categoryDocs.docs
          .map((doc) => ({
            id: doc.id,
            title:
              doc.data().text.substring(0, 30) +
              (doc.data().text.length > 30 ? "..." : ""),
            description: `${doc.data().difficulty} level - ${
              doc.data().category
            }`,
          }))
          .slice(0, 5); // Limit to 5 recommendations

        setRecommendedQuizzes(recommendations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [materialId]);

  // Handle audio selection
  const handleAudioSelect = () => {
    setActiveOption(activeOption === "audio" ? null : "audio");
  };

  // Handle text selection
  const handleTextSelect = () => {
    setActiveOption(activeOption === "text" ? null : "text");
  };

  // Handle study plan selection
  const handleStudyPlanSelect = () => {
    setActiveOption(activeOption === "study" ? null : "study");
  };

  // Handle read full text
  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for course ${id}`);
  };

  // Handle quiz selection
  const handleQuizSelect = (quizId: string) => {
    console.log(`Quiz ${quizId} selected`);
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle download
  const handleDownload = () => {
    console.log("Downloading materials");
  };

  // Handle answers
  const handleAnswers = () => {
    console.log("Showing answers");
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-8 mb-8">
        <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="lg:w-2/3">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-1">
          {material?.title || "Materi Quiz"}
        </h1>
        <p className="text-gray-600 mb-4">
          {material?.category || "Loading category..."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <AudioButton
            isActive={activeOption === "audio"}
            onClick={handleAudioSelect}
          />
          <TextButton
            isActive={activeOption === "text"}
            onClick={handleTextSelect}
          />
          <StudyPlanButton
            isActive={activeOption === "study"}
            onClick={handleStudyPlanSelect}
          />
        </div>

        {/* Difficulty Selector */}
        <div className="mb-4">
          <DifficultySelector
            options={[
              { id: "easy", label: "Mudah" },
              { id: "medium", label: "Medium" },
              { id: "hard", label: "Susah" },
            ]}
            defaultSelected={difficulty}
            totalPages={Math.max(1, Math.ceil(quizzes.length / 3))}
            defaultPage={currentPage}
            onDifficultyChange={handleDifficultyChange}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Info Bar */}
        <div className="mb-6">
          <InfoBar
            duration={`${Math.ceil(quizzes.length * 5)} minutes`}
            questionCount={quizzes.length}
            onDownload={handleDownload}
            onAnswers={handleAnswers}
          />
        </div>

        {/* FlashCards */}
        <div className="space-y-8 mb-8">
          {quizzes
            // Apply pagination
            .slice((currentPage - 1) * 3, currentPage * 3)
            .map((quiz, index) => (
              <FlashCard
                key={quiz.id}
                questionNumber={`${(currentPage - 1) * 3 + index + 1}`}
                marks={quiz.marks}
                question={quiz.instruction}
                latexExpression={quiz.text}
                answer={quiz.answer}
                imageUrl={quiz.image_path}
              />
            ))}

          {quizzes.length === 0 && (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700">
                Tidak ada quiz tersedia
              </h3>
              <p className="text-gray-500 mt-1">
                Materi ini belum memiliki quiz yang tersedia
              </p>
            </div>
          )}
        </div>

        {/* Continue Button */}
        {quizzes.length > 0 && (
          <div className="mt-8">
            <button className="w-full bg-[#A36800] hover:bg-amber-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
              <span>Selesai</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="lg:w-1/3 space-y-6">
        {/* Practice Exercises using QuizList component */}
        <div>
          <QuizList
            title="Latihan langsung!"
            quizzes={recommendedQuizzes}
            onSelectQuiz={handleQuizSelect}
          />
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-xl font-bold mb-4">Top rekomendasi untukmu!</h2>

          <RegularCourseMaterial
            id={material?.id || "default"}
            title={`${material?.title || "Loading material"} ${
              material?.price ? `Rp ${material.price.toLocaleString()}` : ""
            }`}
            imageSrc={
              material?.image_path || "/placeholder.svg?height=200&width=400"
            }
            onReadFullText={handleReadFullText}
            onAudioSelect={handleAudioSelect}
            onTextSelect={handleTextSelect}
          />
        </div>
      </div>
    </div>
  );
}
