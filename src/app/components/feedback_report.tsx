"use client";

import { useState } from "react";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import FeedbackSection from "@/app/components/feedback_section";

type FeedbackType = "audio" | "text" | null;

// Update the interface to match the data structure from Firestore
interface FeedbackItem {
  title: string;
  content?: string[];
}

interface FeedbackSectionData {
  title: string;
  items: FeedbackItem[];
}

interface FeedbackReportProps {
  title?: string;
  weaknesses?: FeedbackSectionData;
  improvements?: FeedbackSectionData;
}

export default function FeedbackReport({
  title = "Feedback report",
  weaknesses = {
    title: "Kekurangan",
    items: [],
  },
  improvements = {
    title: "Perbaikan",
    items: [],
  },
}: FeedbackReportProps) {
  const [activeTab, setActiveTab] = useState<FeedbackType>(null);

  // Add debug logging
  console.log("FeedbackReport props:", { title, weaknesses, improvements });

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div className="p-4">
        <div className="flex gap-3 mb-4">
          <AudioButton
            isActive={activeTab === "audio"}
            onClick={() => setActiveTab(activeTab === "audio" ? null : "audio")}
          />

          <TextButton
            isActive={activeTab === "text"}
            onClick={() => setActiveTab(activeTab === "text" ? null : "text")}
          />
        </div>

        <FeedbackSection
          type="weakness"
          title={weaknesses.title}
          items={weaknesses.items}
        />

        <FeedbackSection
          type="improvement"
          title={improvements.title}
          items={improvements.items}
        />
      </div>
    </div>
  );
}
