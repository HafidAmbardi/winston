"use client";

import { useState } from "react";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import FeedbackSection from "@/app/components/feedback_section";

type FeedbackType = "audio" | "text" | null;

interface FeedbackReportProps {
  title?: string;
  weaknesses?: {
    title: string;
    items: {
      title: string;
      content?: string[];
    }[];
  };
  improvements?: {
    title: string;
    items: {
      title: string;
      content?: string[];
    }[];
  };
}

export default function FeedbackReport({
  title = "Feedback report",
  weaknesses = {
    title: "Kekurangan",
    items: [
      {
        title: "Gagasan Utama",
        content: [
          "Mispronouncing key sounds may make certain words harder to understand.",
          "A strong accent or unclear enunciation can sometimes reduce clarity.",
          "A flat or monotonous tone may make your speech sound less natural.",
        ],
      },
      {
        title: "Detail",
        content: [
          "Mispronouncing key sounds may make certain words harder to understand.",
          "A strong accent or unclear enunciation can sometimes reduce clarity.",
          "A flat or monotonous tone may make your speech sound less natural.",
        ],
      },
    ],
  },
  improvements = {
    title: "Perbaikan",
    items: [
      {
        title: "Pilihan kata dan variasi kalimat",
        content: [
          "Mispronouncing key sounds may make certain words harder to understand.",
          "A strong accent or unclear enunciation can sometimes reduce clarity.",
          "A flat or monotonous tone may make your speech sound less natural.",
        ],
      },
      {
        title: "Tanda Baca & Spasi",
        content: [
          "Mispronouncing key sounds may make certain words harder to understand.",
          "A strong accent or unclear enunciation can sometimes reduce clarity.",
          "A flat or monotonous tone may make your speech sound less natural.",
        ],
      },
    ],
  },
}: FeedbackReportProps) {
  const [activeTab, setActiveTab] = useState<FeedbackType>(null);

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
