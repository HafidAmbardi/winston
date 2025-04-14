"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import RegularCourseMaterial from "@/app/components/regular_course_material";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import StudyPlanButton from "@/app/components/study_plan_button";
import QuizList from "@/app/components/quiz";
import FlashCardMath from "@/app/components/flashcards_math";
import MaterialSection from "@/app/components/material_section";

// Define interfaces for our data types
interface DetailedMaterial {
  id: string;
  category: string;
  difficulty: string;
  title: string;
  text: string;
  image_path: string;
  explanation_title: string;
  explanation: string;
}

interface AggregatedMaterial {
  id: string;
  category: string;
  difficulty: string;
  title: string;
  image_path: string;
  price: number;
  materials: string[]; // IDs of detailed materials
}

export default function DynamicMaterialPage() {
  const params = useParams();
  const materialId = params?.id as string;

  const [activeOption, setActiveOption] = useState<
    "audio" | "text" | "study" | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aggregatedMaterial, setAggregatedMaterial] =
    useState<AggregatedMaterial | null>(null);
  const [detailedMaterials, setDetailedMaterials] = useState<
    DetailedMaterial[]
  >([]);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchMaterial() {
      if (!materialId) {
        setError("No material ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching aggregated material:", materialId);

        // First, fetch the aggregated material
        const materialRef = doc(db, "aggregated_materials", materialId);
        const materialSnap = await getDoc(materialRef);

        if (!materialSnap.exists()) {
          setError("Material not found");
          setLoading(false);
          return;
        }

        const materialData = materialSnap.data() as AggregatedMaterial;
        materialData.id = materialSnap.id;
        setAggregatedMaterial(materialData);
        console.log("Loaded aggregated material:", materialData);

        // Check if we have detail materials to fetch
        if (!materialData.materials || !materialData.materials.length) {
          console.log(
            "No detailed materials found for this aggregated material"
          );
          setLoading(false);
          return;
        }

        // Fetch all detailed materials
        const detailedMaterialPromises = materialData.materials.map(
          async (detailId) => {
            const detailRef = doc(db, "detailed_materials", detailId);
            const detailSnap = await getDoc(detailRef);

            if (detailSnap.exists()) {
              const detailData = detailSnap.data() as DetailedMaterial;
              return {
                ...detailData,
                id: detailSnap.id,
              };
            }
            return null;
          }
        );

        const fetchedDetails = await Promise.all(detailedMaterialPromises);
        const validDetails = fetchedDetails.filter(
          Boolean
        ) as DetailedMaterial[];

        console.log("Loaded detailed materials:", validDetails);
        setDetailedMaterials(validDetails);
      } catch (err) {
        console.error("Error fetching material:", err);
        setError("Failed to load material data");
      } finally {
        setLoading(false);
      }
    }

    fetchMaterial();
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

  // Quiz data - would be fetched in a real implementation
  const quizzes = [
    { id: "1", title: "Integral Dasar", description: "50 soal tersedia" },
    { id: "2", title: "Kalkulus Terapan", description: "50 soal tersedia" },
    { id: "3", title: "Integral Tentu", description: "50 soal tersedia" },
    { id: "4", title: "Integral Tak Tentu", description: "50 soal tersedia" },
    { id: "5", title: "Integral Lanjutan", description: "50 soal tersedia" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen">
        <WinstonSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <WinstonHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-64 bg-gray-200 rounded mb-8"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !aggregatedMaterial) {
    return (
      <div className="flex h-screen">
        <WinstonSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <WinstonHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>{error || "Failed to load material data"}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                title="Masih belum mengerti? Tulis prompt pertanyaan disini"
                subtitle=""
                placeholder="Tulis pernyataanmu......"
              />
            </div>

            {/* Main Content with Sidebar Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="lg:w-2/3">
                {/* Title */}
                <h1 className="text-2xl font-bold mb-1">
                  {aggregatedMaterial.title}
                </h1>
                <p className="text-gray-600 mb-4">
                  {aggregatedMaterial.category} •{" "}
                  {aggregatedMaterial.difficulty}
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

                {/* Flashcard (shown when study option is active) */}
                {activeOption === "study" && (
                  <div className="mb-8">
                    <FlashCardMath
                      questionNumber="1"
                      marks={5}
                      question="Hitunglah integral berikut:"
                      latexExpression="∫ x² dx" // Ensure this matches the updated type
                    />
                  </div>
                )}

                {/* If no detailed materials are found */}
                {detailedMaterials.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-2">
                      Tidak ada materi detail
                    </h2>
                    <p>
                      Paket ini belum memiliki materi detail. Silakan coba paket
                      lain atau kembali lagi nanti.
                    </p>
                  </div>
                )}

                {/* Display all detailed materials */}

                {detailedMaterials.map((material, index) => (
                  <div key={material.id} className="mb-8">
                    <h2 className="text-lg font-medium mb-4">
                      {index + 1}. {material.title}
                    </h2>
                    <MaterialSection
                      id={material.id}
                      summaryPoints={material.text
                        .split(". ")
                        .map((s) => s.trim())
                        .filter(Boolean)}
                      detailedExplanation={material.explanation}
                      buttonText={`Baca Lebih Lanjut: ${material.explanation_title}`}
                      parentTitle={aggregatedMaterial.title}
                      materialType="detailed"
                    />
                  </div>
                ))}

                {/* Continue Button */}
                <div className="mt-8">
                  <button className="w-full bg-[#A36800] hover:bg-amber-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                    <span>Lanjutkan</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* Practice Exercises using QuizList component */}
                <div>
                  <QuizList
                    title="Latihan langsung!"
                    quizzes={quizzes}
                    onSelectQuiz={handleQuizSelect}
                  />
                </div>

                {/* Recommendations */}
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Top rekomendasi untukmu!
                  </h2>

                  <RegularCourseMaterial
                    id="integral-dasar"
                    title={`Latihan ${aggregatedMaterial.category} Rp ${
                      aggregatedMaterial.price?.toFixed(2) || "50.000,00"
                    }`}
                    imageSrc={aggregatedMaterial.image_path || "/learn.jpeg"}
                    onReadFullText={handleReadFullText}
                    onAudioSelect={handleAudioSelect}
                    onTextSelect={handleTextSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
