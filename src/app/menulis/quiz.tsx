"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import FeedbackReport from "@/app/components/feedback_report";
import PromptInput from "@/app/components/prompt_input";

export default function WritingFeedbackPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");


  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt);
    console.log("Searching for:", prompt);
  };

  
  const handleNavigation = (path: string) => {
    console.log(`Navigating to ${path}`);
    router.push(path);
  };

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
                title="Belum mengerti? Tulis pertanyaanmu di sini"
                subtitle="Ajukan pertanyaan terkait materi menulis"
                placeholder="Contoh: bagaimana cara mendeskripsikan gambar?"
                onSubmit={handlePromptSubmit}
              />
            </div>

           
            <h1 className="text-2xl font-bold mb-6">Feedback dan Saran</h1>
            <FeedbackReport
              title="Feedback untuk Deskripsi Tulisan"
              weaknesses={{
                title: "Kekurangan",
                items: [
                  {
                    title: "Gagasan Utama",
                    content: [
                      "Poin utama tidak cukup jelas untuk pembaca.",
                      "Detail kurang mendukung argumen yang disampaikan.",
                      "Terlalu banyak informasi yang tidak relevan.",
                    ],
                  },
                  {
                    title: "Detail",
                    content: [
                      "Detail yang diberikan kurang mendalam.",
                      "Kurangnya contoh konkret untuk mendukung gagasan.",
                    ],
                  },
                ],
              }}
              improvements={{
                title: "Saran Perbaikan",
                items: [
                  {
                    title: "Pilihan kata dan variasi kalimat",
                    content: [
                      "Gunakan kata-kata yang lebih spesifik dan langsung.",
                      "Variasikan struktur kalimat untuk meningkatkan keterbacaan.",
                    ],
                  },
                  {
                    title: "Tanda Baca & Spasi",
                    content: [
                      "Periksa penggunaan tanda baca untuk memastikan kejelasan.",
                      "Hindari spasi ganda antar kata atau kalimat.",
                    ],
                  },
                ],
              }}
            />

            
            <div className="mt-12">
              <h2 className="text-xl font-medium mb-4">Latihan Mendeskripsikan Gambar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Lihat Gambar</h3>
                  <img
                    src="https://placehold.co/644x328"
                    alt="Deskripsi gambar"
                    className="mt-4 rounded"
                  />
                  <button
                    className="mt-4 px-4 py-2 bg-primary-700 text-white rounded"
                    onClick={() => handleNavigation("/feedback/gambar")}
                  >
                    Lanjutkan
                  </button>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Feedback Tulisan</h3>
                  <p className="mt-2">
                    Dapatkan feedback langsung untuk tulisanmu.
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-primary-700 text-white rounded"
                    onClick={() => handleNavigation("/feedback/tulisan")}
                  >
                    Lihat Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
