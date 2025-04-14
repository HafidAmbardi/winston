"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  text?: string;
  contentSelector?: string;
  language?: string;
}

export default function AudioButton({
  isActive: initialIsActive = false,
  onClick,
  text = "Dengarkan Penjelasan",
  contentSelector = "main",
  language = "id-ID",
}: AudioButtonProps) {
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    // Check if the browser supports speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthRef.current = new SpeechSynthesisUtterance();
      speechSynthRef.current.lang = language;
      speechSynthRef.current.rate = 1;
      speechSynthRef.current.pitch = 1;

      // Add event listeners
      speechSynthRef.current.onend = () => {
        setIsActive(false);
        setIsSpeaking(false);
      };

      speechSynthRef.current.onerror = () => {
        setIsActive(false);
        setIsSpeaking(false);
      };
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  // Function to get text content from the page
  const getTextToRead = () => {
    if (typeof document !== "undefined") {
      const contentElement = document.querySelector(contentSelector);
      if (contentElement) {
        // Get all text nodes and exclude hidden elements
        return contentElement.textContent || "";
      }
    }
    return "No content found to read.";
  };

  // Handle button click
  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsActive(false);
        setIsSpeaking(false);
      } else {
        if (speechSynthRef.current) {
          const textToRead = getTextToRead();

          speechSynthRef.current.text = textToRead;

          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(speechSynthRef.current);

          setIsActive(true);
          setIsSpeaking(true);
        }
      }
    } else {
      alert("Your browser does not support text-to-speech functionality.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        isActive ? "bg-amber-600 text-white" : "bg-amber-100 text-gray-800"
      }`}
      aria-pressed={isActive}
      title={isActive ? "Stop speaking" : "Start speaking"}
    >
      {isActive ? (
        <VolumeX className="w-8 h-8" />
      ) : (
        <Volume2 className="w-8 h-8" />
      )}
      <span className="text-xs">{text}</span>
    </button>
  );
}
