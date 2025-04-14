"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import StudyPlanButton from "@/app/components/study_plan_button";
import { useRouter, usePathname } from "next/navigation";

interface PromptInputProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  initialValue?: string;
  onSubmit?: (prompt: string) => void;
  onOptionChange?: (option: "audio" | "text" | "study" | null) => void;
  showButtons?: boolean;
}

export default function PromptInput({
  title = "Apa informasi yang ingin kamu cari?",
  subtitle = "Tulis prompt kamu di bawah ini untuk mempersonalisasikan jawabanmu!",
  placeholder = "Tulis pernyataanmu......",
  initialValue = "",
  onSubmit = (prompt) => console.log("Submitted prompt:", prompt),
  onOptionChange,
  showButtons = true,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState(initialValue);
  const [activeButton, setActiveButton] = useState<
    "audio" | "text" | "study" | null
  >("text"); // Default to text mode

  const router = useRouter();
  const pathname = usePathname();

  // Update prompt if initialValue changes (e.g., from parent component)
  useEffect(() => {
    setPrompt(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // If we're already on the winston-ai page, just submit the prompt
    if (pathname === "/winston-ai") {
      onSubmit(prompt);
    } else {
      // Otherwise, navigate to winston-ai with the prompt as query parameter
      router.push(
        `/winston-ai?prompt=${encodeURIComponent(prompt)}&mode=${
          activeButton || "text"
        }`
      );
    }
  };

  const handleButtonClick = (button: "audio" | "text" | "study" | null) => {
    setActiveButton(activeButton === button ? null : button);
    if (onOptionChange) {
      onOptionChange(activeButton === button ? null : button);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-amber-50 rounded-lg border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showButtons && (
        <div className="flex flex-wrap gap-3 justify-center">
          <AudioButton
            isActive={activeButton === "audio"}
            onClick={() => handleButtonClick("audio")}
          />

          <TextButton
            isActive={activeButton === "text"}
            onClick={() => handleButtonClick("text")}
          />

          <StudyPlanButton
            isActive={activeButton === "study"}
            onClick={() => handleButtonClick("study")}
          />
        </div>
      )}
    </div>
  );
}
