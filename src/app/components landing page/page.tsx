import Image from "next/image"
import Navbar from "@/app/components/navbar"
import ButtonOptimal from "@/app/components/button-optimal"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FBFCFC] relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Gradients */}
      <div className="absolute w-[409px] h-[421px] left-[433px] top-[192px] -rotate-[14deg] origin-top-left bg-gradient-to-br from-[rgba(255,236,189,0.3)] to-[rgba(255,206,132,0.9)] rounded-full" />
      <div className="absolute w-[423px] h-[424px] left-[1009px] top-[11px] bg-gradient-to-br from-[rgba(255,236,189,0.3)] to-[#FFCE85] rounded-full" />
      <div className="absolute w-[376px] h-[386px] left-[-15px] top-[66px] bg-gradient-to-br from-[rgba(255,236,189,0.3)] to-[rgba(255,206,132,0.9)] rounded-full" />

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-black">Belajar </span>
              <span className="text-[#BD7800]">Tanpa Batas</span>
              <span className="text-black">, Untuk Semua Cara </span>
              <span className="text-[#BD7800]">Berpikir</span>
            </h1>

            <p className="text-lg mb-2">Pengalaman belajar yang dipersonalisasi dengan teknologi adaptif, untuk</p>
            <p className="text-lg font-semibold mb-8">Disabilitas Kognitif</p>

            <ButtonOptimal href="/optimize">Optimalkan Cara Belajarmu Sekarang</ButtonOptimal>
          </div>

          <div className="relative h-[500px] lg:h-auto">
            {/* Student Images */}
            <Image
              src="/images/daniel.png"
              alt="Student with glasses thinking"
              width={525}
              height={755}
              className="absolute right-0 top-0 z-20"
            />
            <Image
              src="/images/guy.png"
              alt="Student with headphones"
              width={470}
              height={764}
              className="absolute right-[-100px] top-[-40px] z-10"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
