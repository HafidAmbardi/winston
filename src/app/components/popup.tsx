import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

const Popup = () => {
    return (
      <div className="w-full h-full relative bg-[#FBFCFC] overflow-hidden rounded-[10px] p-6">

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Image src="/winston_logo.png" width={54} height={33} alt="Winston Logo" />
            <div>
              <p className="text-black text-xs font-bold leading-4">Selamat datang di Winston!</p>
              <p className="text-black text-[10px] font-normal leading-[15px]">Pilihlah sesuai preferensimu</p>
            </div>
          </div>
          <button className="w-6 h-6 flex items-center justify-center border-none bg-transparent">
            <span className="text-black text-lg">×</span>
          </button>
        </div>
        <hr className="border-[#E3E8EF]" />
       
        <div className="relative w-[468px] h-[225px] mt-6 rounded-md bg-[#C77F00] overflow-hidden">
          <Image src="/popup_avatar.png" width={205} height={242} alt="Avatar" className="absolute left-[210px] top-[100px]
          rotate-[-41deg]" />
          <Image src="/popup_sound.png" width={148} height={141} alt="Sound Icon" className="absolute left-[32px] top-[75px] 
          rotate-[-25deg]" />
        </div>
        <p className="text-black text-lg font-bold mt-4">Kamu lebih suka belajar dengan audio? Kami siap membantu!</p>
        <p className="text-black text-xs font-normal mt-2">Karena kamu memilih audio sebagai metode utama, berikut adalah kursus pembelajaran dengan narasi suara.</p>
      
        <button className="w-full mt-6 px-5 py-3 bg-[#BD7800] text-white text-sm font-medium rounded-md f
        lex justify-center items-center gap-2">
          Lihat Halaman
        </button>
      </div>
    );
  };
  
  export default Popup;
  
