"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import WinstonSidebar from "@/app/components/sidebar"
import WinstonHeader from "@/app/components/header"

const mathTopics = [
  {
    id: 1,
    title: "Integral Dasar",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png",
    onClick: () => console.log("Navigating to /matematika/integral"),
  },
  {
    id: 2,
    title: "Kalkulus Terapan",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png",
    onClick: () => console.log("Navigating to /matematika/kalkulus"),
  },
  {
    id: 3,
    title: "Integral Tentu",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png",
    onClick: () => console.log("Navigating to /matematika/integraltentu"),
  },
  {
    id: 4,
    title: "Integral Tak Tentu",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png",
    onClick: () => console.log("Navigating to /matematika/integraltaktentu"),
  },
  {
    id: 5,
    title: "Integral Lanjutan",
    subtitle: "50 soal tersedia",
    price: "Rp 50.000,00",
    imageSrc: "/material.png",
    onClick: () => console.log("Navigating to /matematika/integrallanjutan"),
  },
]

export default function FlashcardsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<string>("Mudah")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleViewMaterial = (id: string) => {
    setSelectedTopic(id)
    console.log(`Viewing material for topic ${id}`)
  }

  return (
    <div className="flex h-screen">
      <WinstonSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Search prompt */}
            <div className="mb-8">
              <p className="text-xs text-gray-600 mb-2">Masih belum mengerti? Tulis prompt pertanyaan disini</p>
              <div className="bg-[#FEF1D5] rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Tulis pernyataanmu......</span>
                <div className="w-6 h-6 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title and info */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-semibold">"Apa yang akan kamu lakukan?" Challenge</h1>
                <p className="mt-2 text-lg">Kalkulus & Analisis Matematika : Latihan Soal</p>
              </div>

              {/* Info and White Noise */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-md">{difficulty} • 25 questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>White Noise</span>
                  <div className="w-8 h-5 bg-white border border-black rounded-md flex items-center">
                    <div className="w-4 h-4 bg-black rounded-sm ml-0.5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content - Two columns */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left column - Difficulty tabs, pagination, and flashcards */}
              <div className="flex-1">
                {/* Difficulty tabs */}
                <div className="mb-6">
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8">
                      <button
                        className={`py-2 px-1 border-b-2 ${difficulty === "Mudah" ? "border-yellow-500 text-yellow-600" : "border-transparent text-gray-500"}`}
                        onClick={() => setDifficulty("Mudah")}
                      >
                        Mudah
                      </button>
                      <button
                        className={`py-2 px-1 border-b-2 ${difficulty === "Medium" ? "border-yellow-500 text-yellow-600" : "border-transparent text-gray-500"}`}
                        onClick={() => setDifficulty("Medium")}
                      >
                        Medium
                      </button>
                      <button
                        className={`py-2 px-1 border-b-2 ${difficulty === "Susah" ? "border-yellow-500 text-yellow-600" : "border-transparent text-gray-500"}`}
                        onClick={() => setDifficulty("Susah")}
                      >
                        Susah
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    {[1, 2, 3, 4, 5, 6].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === page ? "bg-yellow-500 text-white" : "border border-gray-300"}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Flashcards */}
                <div className="flex flex-col gap-6">
                  <div className="bg-[#FFF8E7] p-4 rounded-md shadow-sm border border-[#C77F00]">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold text-lg">1a</h2>
                      <span className="text-sm">2 marks</span>
                    </div>
                    <p>Jika kamu menghadapi deadline ketat dan timmu belum selesai, apa yang akan kamu lakukan?</p>
                    <textarea className="w-full mt-4 p-2 border rounded-md" placeholder="..." rows={3}></textarea>

                    <div className="mt-4">
                      <p className="text-sm mb-2">Bagaimana pengerjaanmu?</p>
                      <div className="flex gap-2 mb-4">
                        <button className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-green-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center border border-red-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border border-yellow-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full">Lihat Pembahasan</button>
                  </div>

                  <div className="bg-[#FFF8E7] p-4 rounded-md shadow-sm border border-[#C77F00]">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold text-lg">1b</h2>
                      <span className="text-sm">2 marks</span>
                    </div>
                    <p>Apa yang akan kamu lakukan jika menemukan kesalahan dalam proyek yang hampir selesai?</p>
                    <textarea className="w-full mt-4 p-2 border rounded-md" placeholder="..." rows={3}></textarea>

                    <div className="mt-4">
                      <p className="text-sm mb-2">Bagaimana pengerjaanmu?</p>
                      <div className="flex gap-2 mb-4">
                        <button className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-green-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center border border-red-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border border-yellow-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full">Lihat Pembahasan</button>
                  </div>

                  {/* Continue button */}
                  <div className="text-center">
                    <button className="bg-[#BD7800] text-white py-2 px-8 rounded-md flex items-center mx-auto">
                      Lanjutkan
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column - Latihan langsung and Top recommendations */}
              <div className="md:w-[346px] space-y-6">
                {/* Latihan langsung section */}
                <div className="border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="text-xl font-medium">Latihan langsung!</h3>
                  </div>
                  <div className="flex flex-col">
                    {mathTopics.map((topic, index) => (
                      <div
                        key={topic.id}
                        className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#FDFDFD] hover:bg-gray-50 cursor-pointer"
                        onClick={topic.onClick}
                      >
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold">{topic.title}</h4>
                          <p className="text-sm">{topic.subtitle}</p>
                        </div>
                        <button className="bg-[#C77F00] p-2 rounded-lg">
                          <ChevronRight className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top recommendations section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Top rekomendasi untukmu!</h3>

                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="p-6">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Practice A"
                        className="w-full h-48 object-cover rounded-md mb-4 bg-gray-200"
                      />
                      <h4 className="text-2xl font-semibold">Practice A</h4>
                      <p className="text-xl">Rp 50.000,00</p>

                      <div className="flex gap-3 mt-4">
                        <div className="flex items-center gap-2 p-2 bg-[#FFEBC9] rounded-lg border border-[#FFCE85]">
                          <div className="w-6 h-6 bg-black"></div>
                          <span className="text-xs">Dengarkan Penjelasan</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-[#FFEBC9] rounded-lg border border-[#FFCE85]">
                          <div className="w-6 h-6 bg-black"></div>
                          <span className="text-xs">Ringkasan Teks</span>
                        </div>
                      </div>

                      <button className="mt-4 w-full bg-[#FFC052] text-black py-2 rounded-lg border border-[#FFA405] flex items-center justify-center">
                        Baca full teks
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
