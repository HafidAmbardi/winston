import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export default function Popup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Card className="bg-[#FBFCFC] rounded-lg w-[500px] p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img src=" alt="Logo" className="w-14 h-8" />
            <div>
              <p className="text-black font-bold text-sm">Selamat datang di Winston!</p>
              <p className="text-black text-xs">Pilihlah sesuai preferensimu</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={24} />
          </button>
        </div>
        <hr className="border-[#E3E8EF] my-3" />
        <div className="bg-[#C77F00] rounded-md overflow-hidden relative">
          <img
            src=""
            alt="Background"
            className="w-full h-[157px] object-cover"/>
        </div>
        <h2 className="text-black font-bold text-lg mt-4 text-center">
          Kamu lebih suka belajar dengan audio? Kami siap membantu!
        </h2>
        <p className="text-black text-sm mt-2 text-center">
          Karena kamu memilih audio sebagai metode utama, berikut adalah kursus pembelajaran dengan narasi suara.
        </p>
        <Button className="w-full mt-6 bg-[#BD7800] text-white font-medium flex justify-center items-center gap-2 border 
        border-[#FAA500]">
          Lihat Halaman
        </Button>
      </Card>
    </div>
  );
}
