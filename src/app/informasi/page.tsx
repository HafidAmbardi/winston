"use client";

import { useState } from "react";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import RegularCourseMaterial from "@/app/components/regular_course_material";
import PremiumCourseMaterial from "@/app/components/premium_course_material";

// Sample course data
const premiumCourseMaterials = [
  {
    id: "1",
    title:
      "Peluang Karir atau Pekerjaan Sebagai Perempuan di Bidang Sains dan Teknologi!",
    imageSrc: "/learn.jpeg",
    isFavorite: true,
  },
  {
    id: "2",
    title:
      "Peluang Karir atau Pekerjaan Sebagai Perempuan di Bidang Sains dan Teknologi!",
    imageSrc: "/learn.jpeg",
    isFavorite: true,
  },
];

const regularCourseMaterials = [
  {
    id: "3",
    title: "Peluang Karir atau Pekerjaan Sains dan Tekno!",
    imageSrc: "/learn.jpeg",
  },
  {
    id: "4",
    title: "Peluang Karir atau Pekerjaan Sains dan Tekno!",
    imageSrc: "/learn.jpeg",
  },
  {
    id: "5",
    title: "Peluang Karir atau Pekerjaan Sains dan Tekno!",
    imageSrc: "/learn.jpeg",
  },
  {
    id: "6",
    title: "Peluang Karir atau Pekerjaan Sains dan Tekno!",
    imageSrc: "/learn.jpeg",
  },
  {
    id: "7",
    title: "Peluang Karir atau Pekerjaan Sains dan Tekno!",
    imageSrc: "/learn.jpeg",
  },
  {
    id: "",
    title: "Peluang Karir atau Pekerjaan Sains dan Tekno!",
    imageSrc: "/learn.jpeg",
  },
];

export default function CoursesPage() {
  const [premiumMaterials, setPremiumMaterials] = useState(
    premiumCourseMaterials
  );
  const [regularMaterials, setRegularMaterials] = useState(
    regularCourseMaterials
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Handle prompt submission
  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt);
    console.log("Searching for:", prompt);
    // Here you would typically fetch search results from an API
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setPremiumMaterials(
      premiumMaterials.map((material) =>
        material.id === id
          ? { ...material, isFavorite: !material.isFavorite }
          : material
      )
    );
  };

  // Handle read full text
  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for course ${id}`);
    // Here you would typically navigate to the course detail page
  };

  // Handle audio select
  const handleAudioSelect = () => {
    console.log("Audio option selected");
    // Implement audio playback logic
  };

  // Handle text select
  const handleTextSelect = () => {
    console.log("Text option selected");
    // Implement text view logic
  };

  // Split regular materials into rows
  const firstRowRegular = regularMaterials.slice(0, 3);
  const secondRowRegular = regularMaterials.slice(3, 6);

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
                title="Apa informasi yang ingin kamu cari?"
                subtitle="Tulis prompt kamu di bawah ini untuk mempersonalisasikan jawabanmu!"
                placeholder="Tulis pernyataanmu......"
                onSubmit={handlePromptSubmit}
              />
            </div>

            {/* Course Materials Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                Top rekomendasi info untukmu!
              </h2>

              {/* Premium Course Materials - Always exactly 2 in the first row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {premiumMaterials.slice(0, 2).map((material) => (
                  <div key={material.id}>
                    <PremiumCourseMaterial
                      id={material.id}
                      title={material.title}
                      imageSrc={material.imageSrc}
                      isFavorite={material.isFavorite}
                      onToggleFavorite={toggleFavorite}
                      onReadFullText={handleReadFullText}
                      onAudioSelect={handleAudioSelect}
                      onTextSelect={handleTextSelect}
                    />
                  </div>
                ))}
              </div>

              {/* Regular Courses Section */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-4">
                  Rekomendasi lainnya untukmu
                </h3>

                {/* First Row of Regular Courses */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {firstRowRegular.map((material) => (
                    <div key={material.id}>
                      <RegularCourseMaterial
                        id={material.id}
                        title={material.title}
                        imageSrc={material.imageSrc}
                        onReadFullText={handleReadFullText}
                      />
                    </div>
                  ))}
                </div>

                {/* Second Row of Regular Courses */}
                {secondRowRegular.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {secondRowRegular.map((material) => (
                      <div key={material.id}>
                        <RegularCourseMaterial
                          id={material.id}
                          title={material.title}
                          imageSrc={material.imageSrc}
                          onReadFullText={handleReadFullText}
                        />
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
