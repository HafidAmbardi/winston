"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";

interface RegularCourseMaterialProps {
  id: string;
  title: string;
  imageSrc: string;
  onReadFullText?: (id: string) => void;
  onAudioSelect?: () => void;
  onTextSelect?: () => void;
}

export default function RegularCourseMaterial({
  id,
  title,
  imageSrc,
  onReadFullText = () => {},
  onAudioSelect = () => {},
  onTextSelect = () => {},
}: RegularCourseMaterialProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative h-40 w-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title with fixed height and ellipsis */}
        <h3 className="font-medium text-base mb-3 line-clamp-2 h-12">
          {title}
        </h3>

        {/* Action Buttons - Flexibly sized */}
        <div className="flex justify-between gap-2 mb-3 flex-overflow">
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

        {/* Read Full Text Button - pushes to bottom with margin-top: auto */}
        <button
          onClick={() => onReadFullText(id)}
          className="w-full py-2 mt-auto bg-amber-400 hover:bg-amber-500 text-amber-900 rounded-md flex items-center justify-center gap-1 transition-colors text-sm"
        >
          <span>Baca full teks</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
