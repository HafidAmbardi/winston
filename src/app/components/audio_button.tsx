"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTTS } from "@/app/context/ttsContext";

interface AudioButtonProps {
  onClick?: () => void;
  text?: string;
  isActive?: boolean; // Add the isActive prop to the interface
}

export default function AudioButton({
  onClick,
  text = "Ringkasan Audio",
  isActive = false, // Add default value for isActive
}: AudioButtonProps) {
  const { isSpeaking, startSpeaking, stopSpeaking, ttsContent } = useTTS();
  const [chunks, setChunks] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const isPlayingRef = useRef(false);

  // Split the content into chunks of 30 words when ttsContent changes
  useEffect(() => {
    if (ttsContent) {
      const words = ttsContent.split(" ");
      const textChunks: string[] = [];

      for (let i = 0; i < words.length; i += 30) {
        textChunks.push(words.slice(i, i + 30).join(" "));
      }

      setChunks(textChunks);
      setCurrentChunkIndex(0);
    }
  }, [ttsContent]);

  // Set up speech end detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleSpeechEnd = () => {
        if (isPlayingRef.current) {
          playNextChunk();
        }
      };

      window.speechSynthesis?.addEventListener("end", handleSpeechEnd);

      return () => {
        window.speechSynthesis?.removeEventListener("end", handleSpeechEnd);
      };
    }
  }, [chunks, currentChunkIndex]);

  // Play the next chunk if available
  const playNextChunk = () => {
    const nextIndex = currentChunkIndex + 1;

    if (nextIndex < chunks.length) {
      setCurrentChunkIndex(nextIndex);
      // Use a slight timeout to ensure proper speech synthesis reset
      setTimeout(() => {
        startSpeaking(chunks[nextIndex]);
      }, 100);
    } else {
      // We've reached the end of all chunks
      isPlayingRef.current = false;
      stopSpeaking();
      setCurrentChunkIndex(0);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (isSpeaking) {
      isPlayingRef.current = false;
      stopSpeaking();
      setCurrentChunkIndex(0);
    } else {
      if (chunks.length > 0) {
        isPlayingRef.current = true;
        startSpeaking(chunks[currentChunkIndex]);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        isSpeaking || isActive
          ? "bg-amber-600 text-white"
          : "bg-amber-100 text-gray-800"
      }`}
      aria-pressed={isSpeaking || isActive}
      title={isSpeaking ? "Stop speaking" : "Start speaking"}
    >
      {isSpeaking ? (
        <VolumeX className="w-8 h-8" />
      ) : (
        <Volume2 className="w-8 h-8" />
      )}
      <span className="text-xs">{text}</span>
    </button>
  );
}
