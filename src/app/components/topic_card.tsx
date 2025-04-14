"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
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
  // Split title into multiple lines if it's too long
  let firstLine = title;
  let secondLine = titleSecondLine;

  if (!titleSecondLine && title.length > 20) {
    const words = title.split(" ");
    const midpoint = Math.ceil(words.length / 2);
    firstLine = words.slice(0, midpoint).join(" ");
    secondLine = words.slice(midpoint).join(" ");
  }

  return (
    <div
      className={cn(
        "bg-[#FFEBC9] rounded-lg shadow-md overflow-hidden border border-gray-200 mb-3",
        className
      )}
    >
      <div className="flex p-3">
        <div className="w-16 h-16 relative flex-shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 64px, 64px"
          />
        </div>
        <div className="flex-1 pl-3 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold leading-tight">{firstLine}</h2>
            {secondLine && (
              <h2 className="text-base font-bold leading-tight">
                {secondLine}
              </h2>
            )}
          </div>
          <div className="mt-1">
            <button
              onClick={onClick}
              className="bg-[#BD7800] text-white px-3 py-1 rounded-md flex items-center text-xs font-medium"
            >
              Lihat Materi <ChevronRight className="w-3 h-3 ml-1" />
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

export default function TopicCard({
  title = "Matematika Dasar",
  cards = [],
  className,
}: MathTopicsProps) {
  return (
    <div className={cn("w-fit bg-gray-100 pb-3 rounded-lg", className)}>
      {/* Header with icon */}
      <div className="bg-white text-black p-3 rounded-t-lg border-b-2 border-amber-500 flex items-center justify-center">
        <h1 className="font-bold text-base">{title}</h1>
      </div>

      <div className="p-3">
        {/* Render cards iteratively */}
        {cards.map((card) => (
          <SubjectCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
