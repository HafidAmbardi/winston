"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import RegularCourseMaterial from "@/app/components/regular_course_material";
import PremiumCourseMaterial from "@/app/components/premium_course_material";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import ReadingSection from "@/app/components/reading";
import QuizList from "@/app/components/quiz";
import { Skeleton } from "@/app/components/ui/skeleton";

// Handle quiz selection
const handleQuizSelect = (quizId: string) => {
  console.log(`Quiz ${quizId} selected`);
};

// Default quizzes (will be replaced with related quizzes if available)
const defaultQuizzes = [
  { id: "1", title: "Quiz Pemahaman", description: "10 soal tersedia" },
  { id: "2", title: "Quiz Penerapan", description: "5 soal tersedia" },
];

interface ReadingData {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  text: string;
  image_path: string;
  price?: number;
  relatedQuizzes?: { id: string; title: string; description: string }[];
  relatedMaterials?: string[];
}

export default function DynamicReadingPage() {
  const params = useParams();
  const readingId = params?.id as string;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeOption, setActiveOption] = useState<"audio" | "text" | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [readingData, setReadingData] = useState<ReadingData | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [relatedQuizzes, setRelatedQuizzes] = useState(defaultQuizzes);

  // Fetch reading data
  useEffect(() => {
    async function fetchReadingData() {
      try {
        setLoading(true);

        // Check if readingId is valid
        if (!readingId) {
          console.error("No reading ID provided");
          return;
        }

        console.log("Fetching reading with ID:", readingId);

        // Fetch reading document
        const readingRef = doc(db, "readings", readingId);
        const readingSnap = await getDoc(readingRef);

        if (readingSnap.exists()) {
          const data = readingSnap.data() as ReadingData;
          setReadingData({
            id: readingSnap.id,
            ...data,
          });

          // If the reading has related materials, fetch them for recommendations
          if (
            Array.isArray(data.relatedMaterials) &&
            data.relatedMaterials.length > 0
          ) {
            const relatedMaterialPromises = data.relatedMaterials.map(
              async (materialId) => {
                // Check multiple collections for the related material
                const collections = [
                  "materials",
                  "detailed_materials",
                  "readings",
                ];

                for (const collection of collections) {
                  const materialRef = doc(db, collection, materialId);
                  const materialSnap = await getDoc(materialRef);

                  if (materialSnap.exists()) {
                    return {
                      id: materialSnap.id,
                      title: materialSnap.data().title || "Untitled",
                      imageSrc:
                        materialSnap.data().image_path || "/placeholder.svg",
                      isFavorite: false,
                      collection,
                    };
                  }
                }
                return null;
              }
            );

            const resolvedMaterials = await Promise.all(
              relatedMaterialPromises
            );
            setRecommendedCourses(resolvedMaterials.filter(Boolean));
          } else {
            // Default recommendations if no related materials
            setRecommendedCourses([
              {
                id: "1",
                title: "Peluang Karir atau Pekerjaan Sains dan Teknologi!",
                imageSrc: "/learn.jpeg",
                isFavorite: true,
              },
              {
                id: "2",
                title: "Penerapan Teknologi dalam Kehidupan Sehari-hari",
                imageSrc: "/learn.jpeg",
                isFavorite: false,
              },
            ]);
          }

          // If the reading has related quizzes, use them
          if (
            Array.isArray(data.relatedQuizzes) &&
            data.relatedQuizzes.length > 0
          ) {
            setRelatedQuizzes(data.relatedQuizzes);
          }
        } else {
          console.error("Reading not found:", readingId);
        }
      } catch (error) {
        console.error("Error fetching reading:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReadingData();
  }, [readingId]);

  // Rest of your component remains the same...
  // Handle prompt submission
  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt);
    console.log("Searching for:", prompt);
  };

  // Handle read full text
  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for course ${id}`);
  };

  // Handle audio selection
  const handleAudioSelect = () => {
    setActiveOption(activeOption === "audio" ? null : "audio");
    console.log("Audio selected");
  };

  // Handle text selection
  const handleTextSelect = () => {
    setActiveOption(activeOption === "text" ? null : "text");
    console.log("Text selected");
  };

  // Parse reading text into paragraphs
  const paragraphs = readingData?.text
    ? readingData.text.split(/\n\n+/).filter((p) => p.trim() !== "")
    : [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Prompt Input */}
            <div className="mb-8">
              <PromptInput
                showButtons={false}
                title="Apa informasi yang ingin kamu cari?"
                subtitle="Tulis prompt kamu di bawah ini untuk mempersonalisasikan jawabanmu!"
                placeholder="Tulis pernyataanmu......"
                onSubmit={handlePromptSubmit}
              />
            </div>

            {/* Audio and Text Buttons */}
            <div className="flex gap-3 mb-6">
              <AudioButton
                isActive={activeOption === "audio"}
                onClick={handleAudioSelect}
              />

              <TextButton
                isActive={activeOption === "text"}
                onClick={handleTextSelect}
              />
            </div>

            {/* Main Content with Sidebar Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Reading Content */}
              <div className="lg:w-2/3">
                {loading ? (
                  // Skeleton loading state
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-12 w-2/3" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : readingData ? (
                  <ReadingSection
                    level={readingData.category || "Sains dan Teknologi"}
                    title={readingData.title || "Untitled Reading"}
                    imageSrc={readingData.image_path || "/placeholder.svg"}
                    imageDimensions={{ width: 600, height: 300 }}
                    paragraphs={paragraphs}
                    className="shadow-sm"
                  />
                ) : (
                  <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-bold text-red-700">
                      Materi tidak ditemukan
                    </h3>
                    <p className="text-red-600">
                      Maaf, materi bacaan yang Anda cari tidak dapat ditemukan.
                      Silakan coba materi lainnya.
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar with Recommendations */}
              <div className="lg:w-1/3">
                {/* Practice Exercises using QuizList component */}
                <div className="mb-6">
                  <QuizList
                    title="Latihan langsung!"
                    quizzes={relatedQuizzes}
                    onSelectQuiz={handleQuizSelect}
                  />
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">
                    Top rekomendasi untukmu!
                  </h2>
                </div>

                {/* Recommended Courses */}
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {recommendedCourses.map((course, index) => (
                      <div key={course.id} className="relative">
                        {index === 0 ? (
                          <PremiumCourseMaterial
                            id={course.id}
                            title={course.title}
                            imageSrc={course.imageSrc}
                            isFavorite={course.isFavorite}
                            onReadFullText={handleReadFullText}
                            onAudioSelect={handleAudioSelect}
                            onTextSelect={handleTextSelect}
                          />
                        ) : (
                          <RegularCourseMaterial
                            id={course.id}
                            title={course.title}
                            imageSrc={course.imageSrc}
                            onReadFullText={handleReadFullText}
                            onAudioSelect={handleAudioSelect}
                            onTextSelect={handleTextSelect}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
