import Image from "next/image"
import Navbar from "./navbar"
import OptimizeButton from "./button_optimal"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FBFCFC] relative overflow-hidden">
     
      <Image
              src="/Ellipse54.png"
              alt="A student with glasses thinking"
              width={409}
              height={421}
              className="absolute left-[433px] top-[192px] -rotate-[14deg] origin-top-left0"
              priority
            />
      <Image
              src="/Ellipse53.png"
              alt="A student with glasses thinking"
              width={423}
              height={424}
              className="absolute left-[1009px] top-[100px] -rotate-[14deg] origin-top-left0"
              priority
            />
      <div className="absolute w-[376px] h-[386px] left-[-15px] top-[100px] bg-gradient-to-br from-[rgba(255,236,189,0.3)] to-[rgba(255,206,132,0.9)] rounded-full" />
     
      <Navbar />

      
      <section className="container mx-auto px-6 pt-36 pb-24 relative z-10">
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
    <div className="lg:col-span-3 max-w-3xl mt-18 pl-0"> 
      
      <h1 className="mb-6 leading-[64px]">
        <span className="text-black text-[64px] font-['Poltawski_Nowy'] font-normal">Belajar </span>
        <span
          className="text-[64px] font-['Poltawski_Nowy'] font-bold"
          style={{
            background: "linear-gradient(90deg, #1E1E1E 13%, #A36800 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}
        >
          Tanpa Batas
        </span>
        <span className="text-black text-[64px] font-['Poltawski_Nowy'] font-normal">, Untuk Semua Cara </span>
        <span
          className="text-[64px] font-['Poltawski_Nowy'] font-bold"
          style={{
            background: "linear-gradient(90deg, #1E1E1E 13%, #A36800 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}
        >
          Berpikir
        </span>
      </h1>

    
      <div className="mb-8">
        <span className="text-black text-[28px] font-['Plus_Jakarta_Sans'] font-medium leading-[42px]">
          Pengalaman belajar yang dipersonalisasi dengan teknologi adaptif, untuk{" "}
        </span>
        <span className="text-black text-[28px] font-['Plus_Jakarta_Sans'] font-bold leading-[42px]">
          Disabilitas Kognitif
        </span>
      </div>

   
      <OptimizeButton dimension="lg" href="/optimize">
        Optimalkan Cara Belajarmu Sekarang
      </OptimizeButton>
    </div>

          <div className="lg:col-span-2 relative h-[500px] lg:h-auto">
          
            <Image
              src="/Daniel.png"
              alt="A student with glasses thinking"
              width={470}
              height={678}
              className="absolute right-0 top-[-300px] z-10"
              priority
            />
            <Image
              src="/guy.png"
              alt="A student with headphones"
              width={470}
              height={678}
              className="absolute right-[-150px] top-[-340px] z-10"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  )
}
