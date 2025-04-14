"use client";

import { useState, useRef, useEffect } from "react";

interface WhiteNoiseToggleProps {
  label?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  audioSrc?: string;
}

export default function WhiteNoiseToggle({
  label = "White Noise",
  defaultChecked = false,
  onChange,
  audioSrc = "/rain-07.mp3", // Corrected path for the audio file
}: WhiteNoiseToggleProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;

    // Set up event listeners
    audio.addEventListener("canplaythrough", () => {
      setAudioLoaded(true);
    });

    audioRef.current = audio;

    // Clean up on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  // Handle audio playback when toggle state changes
  useEffect(() => {
    if (!audioLoaded || !audioRef.current) return;

    const audioElement = audioRef.current;

    if (isChecked) {
      // Play the audio
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log(
            "Play prevented by browser, requires user interaction first"
          );
          setIsChecked(false); // Reset toggle if playback fails
        });
      }
    } else {
      // Pause the audio
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [isChecked, audioLoaded]);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);

    // Immediately try to play/pause audio on user interaction
    if (audioRef.current && audioLoaded) {
      if (newState) {
        // User clicked to turn on - try to play immediately
        audioRef.current.play().catch(() => {
          console.log("Play failed on direct user interaction");
        });
      } else {
        // User clicked to turn off - pause immediately
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="inline-flex items-center gap-[7px]">
      <div className="text-right text-black font-medium ">{label}</div>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        className={`relative inline-flex h-[22.75px] w-[35.75px] shrink-0 cursor-pointer rounded-full border-2 border-[#121926] transition-colors duration-200 ease-in-out ${
          isChecked ? "bg-[#121926]" : "bg-white"
        }`}
      >
        <span
          className={`pointer-events-none relative inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            isChecked
              ? "translate-x-[12px] border border-[#121926]"
              : "translate-x-0 border border-[#121926]"
          }`}
        />
      </button>
    </div>
  );
}
