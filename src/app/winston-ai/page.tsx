"use client";

import { useState } from "react";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import PremiumBanner from "@/app/components/premium_banner";
import { useChat } from "@/app/components/useChat";

export default function Dashboard() {
  const { prompt, setPrompt, response, isLoading, error, sendMessage } =
    useChat();
  const [activeOption, setActiveOption] = useState<
    "audio" | "text" | "study" | null
  >(null);

  // Handle prompt submission from the PromptInput component
  const handlePromptSubmit = (inputPrompt: string) => {
    setPrompt(inputPrompt);
    sendMessage();
  };

  // Handle premium button click
  const handlePremiumClick = () => {
    console.log("Premium subscription clicked");
    // Add your premium subscription logic here
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Prompt Input Component */}
            <PromptInput
              title="Apa informasi yang ingin kamu cari?"
              subtitle="Tulis prompt kamu di bawah ini untuk mempersonalisasikan jawabanmu!"
              placeholder="Tulis pernyataanmu......"
              onSubmit={handlePromptSubmit}
            />

            {/* Premium Banner */}
            <PremiumBanner onButtonClick={handlePremiumClick} />

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            )}

            {/* Response display */}
            {response && (
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                <h2 className="text-sm font-semibold mb-2 text-gray-500">
                  Winston AI
                </h2>
                <div className="prose max-w-none">{response}</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
