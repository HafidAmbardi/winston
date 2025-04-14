"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

// Update to match what's in Firestore
export type MaterialStatus =
  | "completed"
  | "in_progress"
  | "not_started"
  | "on_hold";

interface MaterialItemProps {
  title: string;
  status: MaterialStatus;
  imageSrc: string;
  onVisit?: () => void;
}

export default function MaterialItem({
  title,
  status,
  imageSrc,
  onVisit,
}: MaterialItemProps) {
  // Status badge styling - update keys to match Firestore values
  const statusConfig = {
    completed: {
      text: "Completed",
      bgColor: "bg-green-200",
      textColor: "text-green-800",
    },
    in_progress: {
      text: "In Progress",
      bgColor: "bg-purple-200",
      textColor: "text-purple-800",
    },
    not_started: {
      text: "Not Started",
      bgColor: "bg-gray-200",
      textColor: "text-gray-800",
    },
    on_hold: {
      text: "On Hold",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
    },
  };

  // Add fallback for unknown status values
  const statusData = statusConfig[status] || {
    text: status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    bgColor: "bg-gray-200",
    textColor: "text-gray-800",
  };

  const { text, bgColor, textColor } = statusData;

  return (
    <div className="bg-amber-50 rounded-xl p-4 mb-4 flex">
      {/* Material Preview Image */}
      <div className="w-32 h-32 bg-white rounded-lg overflow-hidden mr-4 flex-shrink-0">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Status Badge */}
        <div className="flex justify-end mb-2">
          <span
            className={`text-xs px-3 py-1 rounded-full ${bgColor} ${textColor}`}
          >
            {text}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-auto">{title}</h3>

        {/* Visit Button */}
        <button
          onClick={onVisit}
          className="bg-[#BD7800] text-white rounded-md px-4 py-2 flex items-center justify-center gap-1 w-full md:w-auto md:self-end"
        >
          <span>Kunjungi</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
