"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ExplanationBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
 
      <div className="border border-[#A36800] rounded-md p-5">
        <ul className="text-black text-sm font-normal leading-[25px] font-[Poppins]">
          <li>Integrasi merupakan kebalikan dari diferensiasi</li>
          <li>Integrasi disebut sebagai antidiferensiasi</li>
          <li>Hasil integrasi disebut sebagai antiturunan</li>
        </ul>
      </div>

   
      <button
        className="w-full mt-2 flex justify-between items-center bg-[#BD7800] 
        text-white text-sm font-medium font-[Inter] py-3 px-5 rounded-lg 
        shadow-sm border border-[#FAA500] hover:bg-[#A36800] transition-all"
        onClick={() => setIsOpen(!isOpen)}>
        Penjelasan Lengkap
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

     
    </div>
  );
}
