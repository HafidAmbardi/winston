import { useState } from "react";
import { useTTS } from "../context/ttsContext";

// Define proper types for the response structure
interface SummarySection {
  summaryPoints: string[];
  detailedExplanation: string;
  buttonText?: string;
}

interface ChatResponse {
  title: string;
  sections: SummarySection[];
}

export function useChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTtsContent } = useTTS();

  const sendMessage = async (mode: "text" | "study" = "text") => {
    // Only show error if user manually clicks submit with empty prompt
    // Don't show error on initial page load
    if (prompt.trim() === "") {
      // Only set error if user actually tried to submit an empty prompt
      if (prompt !== "") {
        setError("Please enter a prompt");
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const responseData = data.message as ChatResponse;
      setResponse(responseData);

      // Generate a readable text version of the response
      const formattedText = formatTTSContent(responseData);
      setTtsContent(formattedText);
    } catch (err) {
      console.error("Error sending message:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching the response"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format response for TTS
  const formatTTSContent = (response: ChatResponse): string => {
    if (!response) return "";

    let ttsText = `${response.title}. `;

    // Add each section content
    response.sections.forEach((section, index) => {
      ttsText += `Bagian ${index + 1}. `;

      // Add summary points
      if (section.summaryPoints && section.summaryPoints.length > 0) {
        ttsText += "Ringkasan: ";
        section.summaryPoints.forEach((point) => {
          ttsText += `${point}. `;
        });
      }

      // Add detailed explanation
      if (section.detailedExplanation) {
        ttsText += `Penjelasan: ${section.detailedExplanation} `;
      }

      ttsText += " ";
    });

    return ttsText;
  };

  return {
    prompt,
    setPrompt,
    response,
    isLoading,
    error,
    sendMessage,
  };
}
