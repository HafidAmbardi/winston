"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import MaterialSection from "@/app/components/material_section";
import Button from "@/app/components/button";
import PromptInput from "@/app/components/prompt_input";

export default function WritingStepsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");


  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt);
    console.log("Searching for:", prompt);

  };


  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for section ${id}`);
    router.push(`/writing/material?id=${id}`);
  };

  const handleAudioSelect = () => {
    console.log("Audio option selected");
  };

  const handleTextSelect = () => {
    console.log("Text option selected");
  };

  const writingSteps = [
    {
      id: 1,
      title: "Langkah-Langkah Mendeskripsikan Gambar",
      subtitle: "Keadaan Lingkungan",
      sections: [
        {
          id: "1-1",
          title: "Lihat & Pahami Gambar",
          description:
            "🔹 Apa yang terlihat? (Orang, tempat, benda, suasana) 🔹 Apa yang terjadi di dalam gambar? (Aksi, ekspresi, situasi) 🔹 Bagaimana warna, bentuk, ukuran, dan posisi objek?",
          imageSrc: "/public/deskripsigambar_material.png", // Image from public folder
          tips: [
            "✔️ Perhatikan semua bagian gambar, jangan hanya fokus pada satu objek.",
            "✔️ Gunakan pertanyaan 'Siapa? Apa? Di mana? Kapan? Mengapa?' untuk membantu memahami isi gambar.",
          ],
        },
        {
          id: "1-2",
          title: "Gunakan Panca Indera untuk Menjelaskan",
          description:
            "✔ Penglihatan: Apa warna, bentuk, dan ukuran objek? ✔ Pendengaran: Adakah suara dalam gambar yang bisa dibayangkan? ✔ Perasaan: Apa yang dirasakan karakter atau suasana gambar? ✔ Penciuman & Perasa: Adakah elemen yang bisa digambarkan melalui bau atau rasa?",
          example: "Suasana ramai, warna-warni buah dan sayur, bau rempah-rempah yang khas, suara pedagang menawarkan dagangan.",
        },
        {
          id: "1-3",
          title: "Pilih Kata yang Tepat",
          description:
            "🔹 Gunakan kata sifat untuk menggambarkan warna, ukuran, dan suasana (cerah, besar, gelap, dingin). 🔹 Gunakan kata kerja untuk menunjukkan aksi (berlari, bermain, melambaikan tangan). 🔹 Gunakan kata keterangan untuk menambah detail (dengan cepat, perlahan).",
          example: `"Seorang anak kecil sedang berlari di tepi pantai. Ombak yang putih berbuih menyentuh kakinya. Di kejauhan, matahari bersinar keemasan, membuat langit tampak indah berwarna jingga."`,
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
     
      <WinstonSidebar />


      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
           
            <div className="mb-8 w-1/2 mx-auto">
              <PromptInput
                showButtons={false}
                title="Cari langkah menulis yang ingin dipelajari"
                subtitle="Tulis kata kunci untuk mencari topik"
                placeholder="Contoh: deskripsi gambar, teknik menulis..."
                onSubmit={handlePromptSubmit}
              />
            </div>


            <h1 className="text-2xl font-bold mb-6">Langkah-Langkah Menulis</h1>
            {writingSteps.map((step) => (
              <MaterialSection
                key={step.id}
                title={step.title}
                subtitle={step.subtitle}
                sections={step.sections.map((section) => ({
                  ...section,
                  onReadFullText: () => handleReadFullText(section.id),
                  onAudioSelect: handleAudioSelect,
                  onTextSelect: handleTextSelect,
                }))}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
