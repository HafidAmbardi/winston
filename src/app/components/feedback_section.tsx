"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, XCircle, CheckCircle } from "lucide-react";

interface FeedbackItem {
  title: string;
  content?: string[];
}

interface FeedbackSectionProps {
  type: "weakness" | "improvement";
  title: string;
  items: FeedbackItem[];
}

export default function FeedbackSection({
  type,
  title,
  items,
}: FeedbackSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleItem = (itemTitle: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        {type === "weakness" ? (
          <XCircle className="w-5 h-5 text-[#912018]" />
        ) : (
          <CheckCircle className="w-5 h-5 text-[#095C37]" />
        )}
        <span
          className={`font-medium ${
            type === "weakness" ? "text-[#912018]" : "text-[#095C37]"
          }`}
        >
          {title}
        </span>
      </div>

      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.title} className="border-b pb-1 last:border-b-0">
            <button
              onClick={() => toggleItem(item.title)}
              className="w-full flex items-center justify-between py-2"
            >
              <span className="font-medium">{item.title}</span>
              {expandedItems[item.title] ? (
                <ChevronUp className="w-5 h-5 text-amber-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-500" />
              )}
            </button>

            {expandedItems[item.title] && item.content && (
              <div className="py-2 pl-5 pr-2">
                <ul className="list-disc space-y-2 pl-5">
                  {item.content.map((point, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
