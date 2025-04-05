"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MaterialSectionProps {
  summaryPoints: string[];
  detailedExplanation: string | React.ReactNode;
  buttonText?: string;
}

export default function MaterialSection({
  summaryPoints,
  detailedExplanation,
  buttonText = "Penjelasan Lengkap",
}: MaterialSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="border border-[#A36800] rounded-md p-5">
        <ul className="text-black text-sm font-normal leading-[25px]">
          {summaryPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <button
        className="w-full mt-2 flex justify-between items-center bg-[#BD7800] 
        text-white text-sm font-medium font-[Inter] py-3 px-5 rounded-lg 
        shadow-sm border border-[#FAA500] hover:bg-[#A36800] transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-3 p-5 border border-[#A36800] rounded-md bg-[#FFF8EB] text-sm">
          {detailedExplanation}
        </div>
      )}
    </div>
  );
}
