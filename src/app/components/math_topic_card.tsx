"use client";

import Image from "next/image";
import { ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for subject card data
interface SubjectCardProps {
  id: number;
  title: string;
  titleSecondLine?: string; // For two-line titles
  imageSrc: string;
  onClick?: () => void;
  className?: string;
}

// Reusable subject card component
function SubjectCard({
  title,
  titleSecondLine,
  imageSrc,
  onClick = () => {},
  className,
}: SubjectCardProps) {
  return (
    <div
      className={cn(
        "bg-[#FFEBC9] rounded-lg shadow-md overflow-hidden border border-gray-200 mb-4",
        className
      )}
    >
      <div className="flex p-4">
        <div className="w-24 h-24 relative flex-shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 96px, 96px"
          />
        </div>
        <div className="flex-1 pl-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {titleSecondLine && (
              <h2 className="text-xl font-bold">{titleSecondLine}</h2>
            )}
          </div>
          <div className="mt-2">
            <button
              onClick={onClick}
              className="bg-[#BD7800] text-white px-4 py-1 rounded-md flex items-center text-sm font-medium"
            >
              Lihat Materi <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MathTopicsProps {
  title?: string;
  cards?: SubjectCardProps[];
  className?: string;
}

export default function MathTopicCard({
  title = "Matematika Dasar",
  cards = [],
  className,
}: MathTopicsProps) {
  return (
    <div className={cn("max-w-md mx-auto bg-gray-100 pb-4", className)}>
      {/* Header with icon */}
      <div className="bg-white text-black p-4 rounded-3xl border-2 border-amber-500 flex items-center justify-center">
        <h1 className="font-bold text-lg">{title}</h1>
      </div>

      <div className="p-4">
        {/* Render cards iteratively */}
        {cards.map((card) => (
          <SubjectCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
