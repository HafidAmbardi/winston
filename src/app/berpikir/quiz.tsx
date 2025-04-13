"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import MaterialSection from "@/app/components/material_section";
import PromptInput from "@/app/components/prompt_input";

export default function CriticalThinkingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

 
  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt);
    console.log("Searching for:", prompt);
  };

 
  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for section ${id}`);
    router.push(`/berpikir-kritis/material?id=${id}`);
  };

 
  const handleAudioSelect = () => {
    console.log("Audio option selected");
  };

  const handleTextSelect = () => {
    console.log("Text option selected");
  };


  const criticalThinkingSteps = [
    {
      id: 1,
      title: "Identifikasi Situasi",
      description:
        "🔹 Tentukan situasi atau masalah utama yang ingin diselesaikan. \n🔹 Pahami konteks dan faktor-faktor yang memengaruhi situasi tersebut.",
      example: "Contoh: Kamu bersiap ke sekolah tetapi hujan deras dan lupa membawa payung.",
    },
    {
      id: 2,
      title: "Analisis Pilihan",
      description:
        "✔ Cari berbagai solusi yang mungkin untuk menangani masalah. \n✔ Pertimbangkan risiko, konsekuensi, dan manfaat dari setiap pilihan.",
      example:
        "Contoh: Meminjam payung dari tetangga, membeli jas hujan, atau menunggu hujan reda.",
    },
    {
      id: 3,
      title: "Evaluasi Solusi",
      description:
        "🔹 Analisis solusi secara logis untuk menentukan pilihan terbaik. \n🔹 Pilih solusi berdasarkan efektivitas dan dampaknya.",
      example:
        "Contoh: Memilih menggunakan transportasi online untuk menghindari basah kuyup dan tetap nyaman.",
    },
  ];

 
  const recommendedExample = {
    id: "101",
    title: "Rekomendasi Contoh Tulisan yang Tepat",
    content:
      "Jika hujan turun sangat deras dan saya lupa membawa payung, saya bisa meminjam payung dari tetangga, membeli jas hujan, atau memilih transportasi umum seperti ojek online. Dengan mempertimbangkan situasi, saya dapat memilih opsi terbaik untuk tetap nyaman dan aman selama perjalanan.",
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
                title="Bingung dengan situasi yang sedang dihadapi?"
                subtitle="Tulis situasi atau masalahmu untuk menemukan solusi"
                placeholder="Contoh: bagaimana cara pergi ke sekolah saat hujan deras?"
                onSubmit={handlePromptSubmit}
              />
            </div>

           
            <h1 className="text-2xl font-bold mb-6">Langkah-Langkah Berpikir Kritis</h1>
            <div className="grid gap-6 mb-12">
              {criticalThinkingSteps.map((step) => (
                <MaterialSection
                  key={step.id}
                  title={step.title}
                  description={step.description}
                  example={step.example}
                  onAudioSelect={handleAudioSelect}
                  onTextSelect={handleTextSelect}
                />
              ))}
            </div>

            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">{recommendedExample.title}</h3>
              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-justify">{recommendedExample.content}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
