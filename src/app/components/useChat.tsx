"use client";

import { useState } from "react";

interface Section {
  summaryPoints: string[];
  detailedExplanation: string;
  buttonText?: string;
}

interface StructuredResponse {
  title: string;
  sections: Section[];
}

interface UseChatReturn {
  prompt: string;
  setPrompt: (prompt: string) => void;
  response: StructuredResponse | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: () => Promise<void>;
}

export function useChat(): UseChatReturn {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<StructuredResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (): Promise<void> => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      // Get the response content type
      const contentType = response.headers.get("content-type");

      // Log response information for debugging
      console.log("Response status:", response.status);
      console.log("Response content type:", contentType);

      // If not JSON, try to get the text to see what's being returned
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error(
          "Non-JSON response content:",
          responseText.substring(0, 500)
        ); // Log first 500 chars
        throw new Error(
          `Expected JSON response but got ${
            contentType || "unknown content type"
          }`
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      setResponse(data.message);
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
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
