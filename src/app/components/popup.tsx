"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PopupProps {
  onClose?: () => void;
  onAction?: () => void;
  title?: string;
  subtitle?: string;
  description?: string;
  actionText?: string;
  className?: string;
}

export default function Popup({
  onClose = () => {},
  onAction = () => {},
  title = "Kamu lebih suka belajar dengan audio? Kami siap membantu!",
  subtitle = "Selamat datang di Winston!",
  description = "Karena kamu memilih audio sebagai metode utama, berikut adalah kursus pembelajaran dengan narasi suara.",
  actionText = "Lihat Halaman",
  className,
}: PopupProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md bg-[#FBFCFC] overflow-hidden rounded-[10px] p-6",
        className
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Image
            src="/winston_logo.png"
            width={54}
            height={33}
            alt="Winston Logo"
            priority
          />
          <div>
            <p className="text-black text-xs font-bold leading-4">{subtitle}</p>
            <p className="text-black text-[10px] font-normal leading-[15px]">
              Pilihlah sesuai preferensimu
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <hr className="border-[#E3E8EF] my-4" />

      <div className="relative w-full h-[225px] rounded-md bg-[#C77F00] overflow-hidden">
        <Image
          src="/popup_avatar.png"
          width={205}
          height={242}
          alt="Avatar"
          className="absolute left-[210px] top-[100px] rotate-[-41deg]"
        />
        <Image
          src="/popup_sound.png"
          width={148}
          height={141}
          alt="Sound Icon"
          className="absolute left-[32px] top-[75px] rotate-[-25deg]"
        />
      </div>

      <h2 className="text-black text-lg font-bold mt-4">{title}</h2>

      <p className="text-black text-xs font-normal mt-2">{description}</p>

      <Button
        onClick={onAction}
        className="w-full mt-6 px-5 py-3 bg-[#BD7800] text-white text-sm font-medium rounded-md hover:bg-[#A36800] transition-colors"
      >
        {actionText}
      </Button>
    </div>
  );
}
