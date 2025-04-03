"use client";

import { useState } from "react";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import RegularCourseMaterial from "@/app/components/regular_course_material";
import PremiumCourseMaterial from "@/app/components/premium_course_material";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import ReadingSection from "@/app/components/reading";
import Image from "next/image";

// Sample recommended courses
const recommendedCourses = [
  {
    id: "1",
    title: "Peluang Karir atau Pekerjaan Sains dan Teknologi!",
    imageSrc: "/learn.jpeg",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Peluang Karir atau Pekerjaan Sains dan Teknologi!",
    imageSrc: "/learn.jpeg",
    isFavorite: false,
  },
];

export default function ReadingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOption, setActiveOption] = useState<"audio" | "text" | null>(
    null
  );

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
                label="Dengarkan Penjelasan"
              />

              <TextButton
                isActive={activeOption === "text"}
                onClick={handleTextSelect}
                label="Ringkasan Teks"
              />
            </div>

            {/* Main Content with Sidebar Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Reading Content */}
              <div className="lg:w-2/3">
                <ReadingSection
                  level="Sains dan Teknologi"
                  title="Peluang Karir atau Pekerjaan Sebagai Perempuan di Bidang Sains dan Teknologi"
                  imageSrc="/learn.jpeg"
                  imageDimensions={{ width: 600, height: 300 }}
                  paragraphs={[
                    "Keterampilan STEM (Sains, Teknologi, Teknik, dan Matematika) telah dipandang sebagai sebuah keharusan bagi negara yang ingin tetap bersaing di bidang ekonomi. Para ahli telah mengemukakan bahwa kualitas masyarakat secara keseluruhan akan meningkat saat berbagai tim dapat mengatasi masalah teknologi dan sains. Sayangnya, tingkat keterwakilan kaum perempuan di bidang STEM terus mengalami penurunan, dan kesenjangan ini bermula di kelas perguruan tinggi. Namun, kesenjangan ini juga memiliki dasar sejarah.",
                    "Keterampilan STEM (Sains, Teknologi, Teknik, dan Matematika) telah dipandang sebagai sebuah keharusan bagi negara yang ingin tetap bersaing di bidang ekonomi. Para ahli telah mengemukakan bahwa kualitas masyarakat secara keseluruhan akan meningkat saat berbagai tim dapat mengatasi masalah teknologi dan sains. Sayangnya, tingkat keterwakilan kaum perempuan di bidang STEM terus mengalami penurunan, dan kesenjangan ini bermula di kelas perguruan tinggi. Namun, kesenjangan ini juga memiliki dasar sejarah.",
                    "Keterampilan STEM (Sains, Teknologi, Teknik, dan Matematika) telah dipandang sebagai sebuah keharusan bagi negara yang ingin tetap bersaing di bidang ekonomi. Para ahli telah mengemukakan bahwa kualitas masyarakat secara keseluruhan akan meningkat saat berbagai tim dapat mengatasi masalah teknologi dan sains. Sayangnya, tingkat keterwakilan kaum perempuan di bidang STEM terus mengalami penurunan, dan kesenjangan ini bermula di kelas perguruan tinggi. Namun, kesenjangan ini juga memiliki dasar sejarah.",
                  ]}
                  className="shadow-sm"
                />
              </div>

              {/* Sidebar with Recommendations */}
              <div className="lg:w-1/3">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">
                    Top rekomendasi untukmu!
                  </h2>
                </div>

                {/* Recommended Courses */}
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
