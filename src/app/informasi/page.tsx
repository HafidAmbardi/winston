"use client";

import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import Section from "@/app/components/assesment_test";
import MaterialSection from "@/app/components/material_section";
import FlashCardMath from "@/app/components/flashcards_math";
import FlashCardWrite from "@/app/components/flashcards_write";
import ReadingSection from "@/app/components/reading";
import Popup from "@/app/components/popup";
import { useState } from "react";
export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Section
            title="How comfortable are you with basic mathematics?"
            name="math-comfort"
            options={[
              { value: "beginner", label: "Beginner" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
            ]}
          />
          <MaterialSection
            summaryPoints={[
              "Integrasi merupakan kebalikan dari diferensiasi",
              "Integrasi disebut sebagai antidiferensiasi",
              "Hasil integrasi disebut sebagai antiturunan",
            ]}
            detailedExplanation={
              <div>
                <p className="mb-3">
                  Integral adalah salah satu konsep dasar dalam kalkulus yang
                  merupakan kebalikan dari diferensial. Jika diferensial
                  berfokus pada menghitung laju perubahan suatu fungsi, integral
                  berfokus pada menghitung luas di bawah kurva atau
                  mengakumulasi nilai-nilai.
                </p>

                <h3 className="font-semibold mt-4 mb-2">Rumus Dasar</h3>
                <p className="mb-2">
                  {"Jika F'(x) = f(x), maka ∫f(x)dx = F(x) + C"}
                </p>

                <h3 className="font-semibold mt-4 mb-2">Contoh</h3>
                <p>
                  Integral dari f(x) = 2x adalah F(x) = x² + C, karena turunan
                  dari x² adalah 2x.
                </p>

                <h3 className="font-semibold mt-4 mb-2">Aplikasi</h3>
                <ul className="list-disc pl-5">
                  <li>Menghitung luas di bawah kurva</li>
                  <li>Menghitung volume benda putar</li>
                  <li>Menyelesaikan persamaan diferensial</li>
                </ul>
              </div>
            }
          />
          <FlashCardMath
            questionNumber="1"
            marks={5}
            question="Hitunglah integral berikut:"
            latexExpression="∫ 2x dx"
          />
          <FlashCardWrite
            questionNumber="2b"
            marks={3}
            question="Bagaimana cara efektif untuk mengelola waktu ketika mengerjakan multiple projects?"
            explanation="Pembahasan: Prioritaskan tugas berdasarkan tingkat urgensi dan kepentingan. Gunakan teknik time-blocking dan delegasikan tugas bila memungkinkan."
          />
          <ReadingSection />

          <button
            onClick={() => setShowPopup(true)}
            className="px-4 py-2 bg-[#BD7800] text-white rounded-md"
          >
            Open Audio Popup
          </button>

          {showPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Popup
                onClose={() => setShowPopup(false)}
                onAction={() => {
                  console.log("Action clicked");
                  setShowPopup(false);
                  // Navigate or perform other actions
                }}
                title="Apakah kamu lebih suka belajar dengan audio?"
                subtitle="Personalisasi Pengalaman"
                description="Pilih metode pembelajaran yang paling sesuai dengan gayamu untuk hasil terbaik."
                actionText="Mulai Belajar"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
