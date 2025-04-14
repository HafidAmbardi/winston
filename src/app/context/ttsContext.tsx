"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface TTSContextType {
  ttsContent: string;
  setTtsContent: (content: string) => void;
  isSpeaking: boolean;
  startSpeaking: () => void;
  stopSpeaking: () => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export function TTSProvider({ children }: { children: ReactNode }) {
  const [ttsContent, setTtsContent] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    // Set up speech synthesis
    if (typeof window !== "undefined") {
      // Configure speech synthesis end event
      const handleSpeechEnd = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.addEventListener("end", handleSpeechEnd);

      return () => {
        window.speechSynthesis.removeEventListener("end", handleSpeechEnd);
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const startSpeaking = (text?: string) => {
    const textToRead = text || ttsContent;

    if (typeof window === "undefined" || !textToRead) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "id-ID";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Start speaking
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <TTSContext.Provider
      value={{
        ttsContent,
        setTtsContent,
        isSpeaking,
        startSpeaking,
        stopSpeaking,
      }}
    >
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  const context = useContext(TTSContext);
  if (context === undefined) {
    throw new Error("useTTS must be used within a TTSProvider");
  }
  return context;
}
