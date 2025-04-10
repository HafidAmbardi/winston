"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import MathTopicCard from "@/app/components/math_topic_card";
import PromptInput from "@/app/components/prompt_input";
import RegularCourseMaterial from "@/app/components/regular_course_material";

export default function MathTopicsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle prompt submission
  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt);
    console.log("Searching for:", prompt);
    // Here you would typically filter topics or fetch search results
  };

  // Handle read full text
  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for course ${id}`);
    router.push(`/matematika/material?id=${id}`);
  };

  // Handle audio and text selection
  const handleAudioSelect = () => {
    console.log("Audio option selected");
  };

  const handleTextSelect = () => {
    console.log("Text option selected");
  };

  // Sample math topics data
  const basicMathTopics = [
    {
      id: 1,
      title: "Bilangan &",
      titleSecondLine: "Operasi Dasar",
      imageSrc: "/membaca.png",
      onClick: () => router.push("/matematika/bilangan"),
    },
    {
      id: 2,
      title: "Pengukuran &",
      titleSecondLine: "Geometri",
      imageSrc: "/membaca.png",
      onClick: () => router.push("/matematika/geometri"),
    },
    {
      id: 3,
      title: "Statistika &",
      titleSecondLine: "Probabilitas",
      imageSrc: "/membaca.png",
      onClick: () => router.push("/matematika/statistika"),
    },
  ];

  const intermediateMathTopics = [
    {
      id: 4,
      title: "Aljabar &",
      titleSecondLine: "Fungsi",
      imageSrc: "/membaca.png",
      onClick: () => router.push("/matematika/aljabar"),
    },
    {
      id: 5,
      title: "Trigonometri",
      imageSrc: "/membaca.png",
      onClick: () => router.push("/matematika/trigonometri"),
    },
  ];

  const advancedMathTopics = [
    {
      id: 6,
      title: "Kalkulus",
      imageSrc: "/membaca.png",
      onClick: () => router.push("/matematika/kalkulus"),
    },
    {
      id: 7,
      title: "Teori Bilangan",
      imageSrc: "/membaca.png",
      onClick: () => router.push("/matematika/teori-bilangan"),
    },
  ];

  // Sample regular course materials data
  const recommendedCourses = [
    {
      id: "101",
      title: "Dasar-Dasar Geometri untuk Pemula",
      imageSrc: "/membaca.png",
    },
    {
      id: "102",
      title: "Pengantar Statistika dan Analisis Data",
      imageSrc: "/membaca.png",
    },
    {
      id: "103",
      title: "Teknik Problem Solving Matematika",
      imageSrc: "/membaca.png",
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
            <div className="mb-8 w-1/2 mx-auto">
              <PromptInput
                showButtons={false}
                title="Cari materi matematika yang kamu inginkan"
                subtitle="Tulis kata kunci untuk mencari topik matematika"
                placeholder="Contoh: aljabar, statistika, kalkulus..."
                onSubmit={handlePromptSubmit}
              />
            </div>

            {/* Math Topics Section */}
            <h1 className="text-2xl font-bold mb-6">Materi Matematika</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <MathTopicCard
                title="Matematika Dasar"
                cards={basicMathTopics}
                className="h-full"
              />

              <MathTopicCard
                title="Matematika Menengah"
                cards={intermediateMathTopics}
                className="h-full"
              />

              <MathTopicCard
                title="Matematika Lanjut"
                cards={advancedMathTopics}
                className="h-full"
              />
            </div>

            {/* Recommended Regular Courses Section */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">
                Rekomendasi lainnya untukmu
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <div key={course.id}>
                    <RegularCourseMaterial
                      id={course.id}
                      title={course.title}
                      imageSrc={course.imageSrc}
                      onReadFullText={handleReadFullText}
                      onAudioSelect={handleAudioSelect}
                      onTextSelect={handleTextSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
