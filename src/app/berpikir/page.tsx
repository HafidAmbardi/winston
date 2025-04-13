"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import WinstonSidebar from "@/app/components/sidebar"
import WinstonHeader from "@/app/components/header"
import MaterialSection from "@/app/components/material_section"
import PromptInput from "@/app/components/prompt_input"
import RegularCourseMaterial from "@/app/components/regular_course_material"

interface ProblemSolvingStep {
  id: number
  title: string
  description: string
  example: string
}

interface RecommendedCourse {
  id: string
  title: string
  imageSrc: string
}

export default function ProblemSolvingPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt)
    console.log("Searching for:", prompt)
  }

  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for section ${id}`)
    router.push(`/problem-solving/material?id=${id}`)
  }

  const handleAudioSelect = () => {
    console.log("Audio option selected")
  }

  const handleTextSelect = () => {
    console.log("Text option selected")
  }

  const problemSolvingSteps: ProblemSolvingStep[] = [
    {
      id: 1,
      title: "Identifikasi Masalah",
      description:
        "🔹 Tentukan masalah utama yang ingin diselesaikan.\n🔹 Pastikan pemahaman yang jelas terhadap situasi yang terjadi.\n🔹 Gunakan metode 5W+1H (What, Why, Who, When, Where, How) untuk menggali informasi lebih dalam.",
      example:
        "Masalah: 'Penurunan engagement pengguna pada platform edukasi online.' Apa yang terjadi? Engagement menurun dalam 3 bulan terakhir. Mengapa? Mungkin karena materi kurang menarik atau persaingan tinggi.",
    },
    {
      id: 2,
      title: "Analisis Akar Masalah",
      description:
        "✔ Gunakan metode Root Cause Analysis (Analisis Akar Masalah).\n✔ Terapkan Metode 5 Whys untuk menemukan penyebab utama masalah.",
      example:
        "Masalah: 'Kenapa engagement menurun?' Karena pengguna kurang tertarik dengan fitur baru. Kenapa pengguna kurang tertarik? Karena fitur tidak sesuai dengan kebutuhan mereka.",
    },
    {
      id: 3,
      title: "Brainstorming Solusi",
      description:
        "✔ Kumpulkan berbagai ide solusi dari tim atau stakeholder terkait.\n✔ Gunakan metode SCAMPER untuk mengembangkan solusi kreatif.\n✔ Pilih solusi terbaik berdasarkan feasibility (kelayakan), impact (dampak), dan effort (usaha yang diperlukan).",
      example:
        "Solusi untuk meningkatkan engagement: 🔹 Lakukan survei cepat untuk memahami preferensi pengguna.\n🔹 Tambahkan fitur gamifikasi untuk meningkatkan interaksi.\n🔹 Optimalkan UI/UX agar lebih menarik dan intuitif.",
    },
  ]

  const recommendedCourses: RecommendedCourse[] = [
    {
      id: "201",
      title: "Penerapan SCAMPER dalam Problem Solving",
      imageSrc: "/problem-solving-1.jpeg",
    },
    {
      id: "202",
      title: "Root Cause Analysis untuk Pemula",
      imageSrc: "/problem-solving-2.jpeg",
    },
    {
      id: "203",
      title: "Metode 5W+1H untuk Analisis Masalah",
      imageSrc: "/problem-solving-3.jpeg",
    },
  ]

  return (
    <div className="flex h-screen">
      <WinstonSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Prompt Input Section */}
            <div className="mb-8 w-1/2 mx-auto">
              <PromptInput
                showButtons={false}
                title="Bingung topik yang cocok dengan masalahmu?"
                subtitle="Tulis kata kunci atau pertanyaan untuk mencari solusi"
                placeholder="Contoh: bagaimana cara meningkatkan engagement?"
                onSubmit={handlePromptSubmit}
              />
            </div>

            {/* Problem Solving Steps */}
            <h1 className="text-2xl font-bold mb-6">Langkah-Langkah Pemecahan Masalah</h1>
            <div className="grid gap-6 mb-12">
              {problemSolvingSteps.map((step) => (
             <MaterialSection
             summaryPoints={[
               "🔹 Tentukan masalah utama yang ingin diselesaikan.",
               "🔹 Pastikan pemahaman yang jelas terhadap situasi yang terjadi.",
               "🔹 Gunakan metode 5W+1H (What, Why, Who, When, Where, How) untuk menggali informasi lebih dalam.",
             ]}
             detailedExplanation={
               <div>
                 <p>
                   Masalah: "Penurunan engagement pengguna pada platform edukasi online."
                 </p>
                 <p>
                   Apa yang terjadi? Engagement menurun dalam 3 bulan terakhir. Mengapa?
                   Mungkin karena materi kurang menarik atau persaingan tinggi.
                 </p>
               </div>
             }
             buttonText="Lihat Penjelasan Lengkap"
           />
              ))}
            </div>

            {/* Recommended Courses */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">Rekomendasi lainnya untukmu</h3>
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
  )
}
