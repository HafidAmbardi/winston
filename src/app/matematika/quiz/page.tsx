"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import RegularCourseMaterial from "@/app/components/regular_course_material";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import StudyPlanButton from "@/app/components/study_plan_button";
import QuizList from "@/app/components/quiz";
import FlashCard from "@/app/components/flashcards";
import InfoBar from "@/app/components/info_bar";
import DifficultySelector from "@/app/components/difficulty_selector";

export default function IntegralPage() {
  const [activeOption, setActiveOption] = useState<
    "audio" | "text" | "study" | null
  >(null);

  const [difficulty, setDifficulty] = useState("easy");
  const [currentPage, setCurrentPage] = useState(1);

  // Handle audio selection
  const handleAudioSelect = () => {
    setActiveOption(activeOption === "audio" ? null : "audio");
    console.log("Audio option selected");
  };

  // Handle text selection
  const handleTextSelect = () => {
    setActiveOption(activeOption === "text" ? null : "text");
    console.log("Text option selected");
  };

  // Handle study plan selection
  const handleStudyPlanSelect = () => {
    setActiveOption(activeOption === "study" ? null : "study");
    console.log("Study plan option selected");
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
    console.log(`Difficulty changed to: ${newDifficulty}`);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Page changed to: ${page}`);
  };

  // Handle download
  const handleDownload = () => {
    console.log("Downloading materials");
  };

  // Handle answers
  const handleAnswers = () => {
    console.log("Showing answers");
  };

  // Quiz data
  const quizzes = [
    { id: "1", title: "Integral Dasar", description: "50 soal tersedia" },
    { id: "2", title: "Kalkulus Terapan", description: "50 soal tersedia" },
    { id: "3", title: "Integral Tentu", description: "50 soal tersedia" },
    { id: "4", title: "Integral Tak Tentu", description: "50 soal tersedia" },
    { id: "5", title: "Integral Lanjutan", description: "50 soal tersedia" },
  ];

  // Flashcard data
  const flashcards = [
    {
      questionNumber: "1",
      marks: 5,
      question: "Hitunglah integral berikut:",
      latexExpression: "∫ x² dx",
    },
    {
      questionNumber: "2",
      marks: 8,
      question: "Tentukan integral dari fungsi berikut:",
      latexExpression: "∫ sin(x) cos(x) dx",
    },
    {
      questionNumber: "3",
      marks: 10,
      question: "Carilah nilai dari integral berikut:",
      latexExpression: "∫ x·e^x dx",
    },
  ];

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
                <h1 className="text-2xl font-bold mb-1">Introduksi Integral</h1>
                <p className="text-gray-600 mb-4">
                  Kalkulus & Analisis Matematika
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
                    totalPages={6}
                    defaultPage={currentPage}
                    onDifficultyChange={handleDifficultyChange}
                    onPageChange={handlePageChange}
                  />
                </div>

                {/* Info Bar */}
                <div className="mb-6">
                  <InfoBar
                    duration="2 hours"
                    questionCount={24}
                    onDownload={handleDownload}
                    onAnswers={handleAnswers}
                  />
                </div>

                {/* FlashCards replacing Material Section */}
                <div className="space-y-8 mb-8">
                  {flashcards.map((card, index) => (
                    <FlashCard
                      key={index}
                      questionNumber={card.questionNumber}
                      marks={card.marks}
                      question={card.question}
                      latexExpression={card.latexExpression}
                    />
                  ))}
                </div>

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
                    title="Latihan Integral Dasar Rp 50.000,00"
                    imageSrc="/placeholder.svg?height=200&width=400"
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
