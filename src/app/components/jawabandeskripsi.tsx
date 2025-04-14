"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageQuestionProps {
  imageUrl?: string;
  placeholder?: string;
}

export default function ImageQuestion({
  imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-14%20at%2016.19.19-5IIXRwRnOWUWodjhLqASlE7dh1A1I0.png",
  placeholder = "......",
}: ImageQuestionProps) {
  const [answer, setAnswer] = useState<string>(placeholder);

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-4">
      <div className="w-full flex flex-col justify-start items-center gap-6">
        <h2 className="w-full text-black text-base font-semibold font-['Poppins']">
          Lihat gambar di bawah ini. Tuliskan 2-3 kalimat tentang apa yang kamu
          lihat.
        </h2>
        <div className="w-full h-[328px] relative">
          <Image
            src={imageUrl}
            alt="Gambar banjir di kota dengan kendaraan penyelamat"
            layout="fill"
            objectFit="cover"
            className="rounded-[5px]"
            priority
          />
        </div>
      </div>

      <div className="w-full h-[308px] relative bg-white overflow-hidden rounded-[5px] border border-[#4B5565]">
        <div className="absolute left-[26px] top-[23px] text-black text-sm font-normal font-['Poppins'] leading-[21px]">
          Tulis jawabanmu di bawah ini!
        </div>
        <div className="w-[calc(100%-46px)] h-0 absolute left-[23px] top-[56.5px] border-t border-[#E3E8EF]"></div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-[533px] max-w-[calc(100%-64px)] h-[168px] absolute left-[32px] top-[80px] text-justify text-black text-sm font-normal font-['Poppins'] leading-[21px] resize-none outline-none"
          placeholder="Tulis jawabanmu di sini..."
        />
      </div>
    </div>
  );
}
