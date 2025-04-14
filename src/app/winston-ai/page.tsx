"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import PremiumBanner from "@/app/components/premium_banner";
import MaterialSection from "@/app/components/material_section";
import { useChat } from "@/app/components/useChat";

export default function Dashboard() {
  const { prompt, setPrompt, response, isLoading, error, sendMessage } =
    useChat();
  const [activeOption, setActiveOption] = useState<
    "audio" | "text" | "study" | null
  >("text");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Track request state
  const pendingUrlPromptRef = useRef<string | null>(null);
  const requestAttemptRef = useRef(0);
  const maxRetries = 3;

  // Process URL parameters and manage request status
  useEffect(() => {
    const urlPrompt = searchParams.get("prompt");
    const urlMode = searchParams.get("mode") as
      | "audio"
      | "text"
      | "study"
      | null;

    // If we have a URL prompt and either:
    // 1. We haven't processed it yet (pendingUrlPromptRef is null)
    // 2. It's different from the one we're currently processing
    if (
      urlPrompt &&
      (!pendingUrlPromptRef.current ||
        pendingUrlPromptRef.current !== urlPrompt)
    ) {
      console.log("Processing new URL prompt:", urlPrompt);

      // Store the prompt we're about to process
      pendingUrlPromptRef.current = urlPrompt;

      // Reset retry counter for new prompt
      requestAttemptRef.current = 0;

      // Set the prompt from URL
      setPrompt(urlPrompt);

      // Set the active option from URL if provided
      if (urlMode) {
        setActiveOption(urlMode);
      }

      // Determine mode for API request
      const mode = urlMode === "study" ? "study" : "text";

      // Give React time to update state before sending request
      setTimeout(() => {
        console.log("Sending prompt to API:", urlPrompt);
        sendMessage(mode);

        // Clear URL parameters after initiating request
        router.replace("/winston-ai", { scroll: false });
      }, 100);
    }
  }, [searchParams, setPrompt, sendMessage, router]);

  // Effect to monitor the API response or timeout
  useEffect(() => {
    // If we have a pending URL prompt and there's either a response or an error
    if (pendingUrlPromptRef.current && (response || error)) {
      console.log("API request completed:", response ? "success" : "error");

      // Clear pending prompt since we got a response (success or error)
      pendingUrlPromptRef.current = null;
      requestAttemptRef.current = 0;
    }
    // If we have a pending prompt but no response yet and not currently loading
    else if (
      pendingUrlPromptRef.current &&
      !isLoading &&
      !response &&
      requestAttemptRef.current < maxRetries
    ) {
      // Increment retry counter
      requestAttemptRef.current += 1;

      console.log(
        `Retry attempt ${requestAttemptRef.current}/${maxRetries} for prompt:`,
        pendingUrlPromptRef.current
      );

      // Retry the request
      const retryDelay = 1000 * requestAttemptRef.current; // Increasing delay for each retry
      setTimeout(() => {
        const mode = searchParams.get("mode") === "study" ? "study" : "text";
        sendMessage(mode);
      }, retryDelay);
    }
    // If we've reached max retries, give up and reset
    else if (
      requestAttemptRef.current >= maxRetries &&
      pendingUrlPromptRef.current
    ) {
      console.error(
        "Max retries reached for prompt:",
        pendingUrlPromptRef.current
      );
      pendingUrlPromptRef.current = null;
      requestAttemptRef.current = 0;
    }
  }, [response, error, isLoading, searchParams, sendMessage]);

  // Handle prompt submission from the PromptInput component
  const handlePromptSubmit = (inputPrompt: string) => {
    // Clear any pending URL prompt processing
    pendingUrlPromptRef.current = null;

    setPrompt(inputPrompt);
    const mode = activeOption === "study" ? "study" : "text";
    sendMessage(mode);
  };

  // Handle option change from the PromptInput component
  const handleOptionChange = (option: "audio" | "text" | "study" | null) => {
    setActiveOption(option || "text");
  };

  // Handle premium button click
  const handlePremiumClick = () => {
    console.log("Premium subscription clicked");
  };

  return (
    <div className="flex h-screen">
      <WinstonSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <PromptInput
              title="Apa informasi yang ingin kamu cari?"
              subtitle="Tulis prompt kamu di bawah ini untuk mempersonalisasikan jawabanmu!"
              placeholder={
                activeOption === "study"
                  ? "Apa topik yang ingin kamu buat rencana belajarnya?"
                  : "Tulis pernyataanmu......"
              }
              initialValue={prompt}
              onSubmit={handlePromptSubmit}
              onOptionChange={handleOptionChange}
            />

            <PremiumBanner onButtonClick={handlePremiumClick} />

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            )}

            {response && (
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {response.title}
                </h2>

                <div className="space-y-6">
                  {response.sections.map((section, index) => (
                    <MaterialSection
                      key={index}
                      summaryPoints={section.summaryPoints}
                      detailedExplanation={section.detailedExplanation}
                      buttonText={
                        section.buttonText ||
                        (activeOption === "study"
                          ? "Detail Sesi"
                          : "Penjelasan Lengkap")
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
