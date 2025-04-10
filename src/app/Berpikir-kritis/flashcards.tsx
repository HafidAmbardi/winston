"use client";

import { useState } from "react";
import FlashcardWrite from "@/app/components/flashcard_write";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import Flashcards from "@/app/components/flashcards_write";

=const Flashcards = [
  {
    id: 1,
    title: "Integral Dasar",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png", 
    onClick: () => router.push("/matematika/integral"),
  },
  {
    id: 2,
    title: "Kalkulus Terapan",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png",
    onClick: () => router.push("/matematika/kalkulus"),
  },
  {
    id: 3,
    title: "Integral Tentu",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png",
    onClick: () => router.push("/matematika/integraltentu"),
  },
];

export default function FlashcardsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>("Mudah");

  const handleViewMaterial = (id: string) => {
    setSelectedTopic(id);
    console.log(`Viewing material for topic ${id}`);
  };

  return (
    <div className="flex h-screen">
      <WinstonSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

    
        <main className="flex-1 overflow-auto p-6">
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">“Apa yang akan kamu lakukan?” Challenge</h1>
            <p className="mt-2 text-lg">Kalkulus & Analisis Matematika : Latihan Soal</p>
          </div>

          
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-md">{difficulty} - 25 questions</span>
              <div className="flex space-x-4 mt-2">
                <button onClick={() => setDifficulty("Mudah")} className="bg-yellow-400 text-white p-2 rounded">
                  Mudah
                </button>
                <button onClick={() => setDifficulty("Medium")} className="bg-gray-300 text-black p-2 rounded">
                  Medium
                </button>
                <button onClick={() => setDifficulty("Susah")} className="bg-red-400 text-white p-2 rounded">
                  Susah
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span>White Noise</span>
              <div className="border border-black rounded p-1">
                <div className="w-6 h-6 bg-black"></div>
              </div>
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-yellow-200 p-4 rounded-md shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">1a</h2>
                <span className="text-sm">2 marks</span>
              </div>
              <p>Jika kamu menghadapi deadline ketat dan timmu belum selesai, apa yang akan kamu lakukan?</p>
              <textarea className="w-full mt-4 p-2 border rounded-md" placeholder="Your answer..." rows={3}></textarea>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 w-full">
                Lihat Pembahasan
              </button>
            </div>

            <div className="bg-yellow-200 p-4 rounded-md shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">1b</h2>
                <span className="text-sm">2 marks</span>
              </div>
              <p>Apa yang akan kamu lakukan jika menemukan kesalahan dalam proyek yang hampir selesai?</p>
              <textarea className="w-full mt-4 p-2 border rounded-md" placeholder="Your answer..." rows={3}></textarea>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 w-full">
                Lihat Pembahasan
              </button>
            </div>
          </div>

          
          <div className="text-center">
            <button className="bg-orange-600 text-white py-2 px-8 rounded-md">Lanjutkan</button>
          </div>

         
          <div className="mt-12">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">Latihan langsung!</h2>
              <p className="text-lg">Integral Dasar, Kalkulus Terapan, Integral Tentu, dll</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mathTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-md shadow-md cursor-pointer"
                  onClick={topic.onClick}
                >
                  <img src={topic.imageSrc} alt={topic.title} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h3 className="font-semibold text-xl">{topic.title}</h3>
                  <p className="text-sm text-gray-500">{topic.subtitle}</p>
                  <div className="mt-4 text-center">
                    <span className="text-lg font-semibold">{topic.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
