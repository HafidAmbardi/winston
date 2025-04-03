"use client";

import { Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";

interface PremiumCourseMaterialProps {
  id: string;
  title: string;
  imageSrc: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onReadFullText?: (id: string) => void;
  onAudioSelect?: () => void;
  onTextSelect?: () => void;
}

export default function PremiumCourseMaterial({
  id,
  title,
  imageSrc,
  isFavorite = false,
  onToggleFavorite = () => {},
  onReadFullText,
  onAudioSelect = () => {},
  onTextSelect = () => {},
}: PremiumCourseMaterialProps) {
  const router = useRouter();

  const handleReadFullText = () => {
    if (onReadFullText) {
      onReadFullText(id);
    } else {
      // Default behavior: Navigate to material page with the course ID
      router.push(`/informasi/material?id=${id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 relative">
      {/* Favorite Button */}
      {isFavorite && (
        <div className="absolute top-2 right-2 z-10">
          <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
        </div>
      )}

      {/* Course Image */}
      <div className="relative h-56 w-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-4">{title}</h3>

        {/* Action Buttons and Premium Badge in a single row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex gap-2">
            <AudioButton
              isActive={false}
              onClick={onAudioSelect}
              label="Dengar"
              compact={true}
            />

            <TextButton
              isActive={false}
              onClick={onTextSelect}
              label="Ringkasan"
              compact={true}
            />
          </div>

          <span className="px-3 py-1.5 bg-amber-500 text-white text-sm font-medium rounded-md">
            Premium
          </span>
        </div>

        {/* Read Full Text Button */}
        <button
          onClick={handleReadFullText}
          className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-900 rounded-md flex items-center justify-center gap-1 transition-colors"
        >
          <span>Baca full teks</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
