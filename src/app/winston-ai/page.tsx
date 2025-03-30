"use client";

import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import { useChat } from "@/app/components/useChat";

export default function Dashboard() {
  const { prompt, setPrompt, response, isLoading, error, sendMessage } =
    useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
              Apa informasi yang ingin kamu cari?
            </h1>

            {/* Chat form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask Winston anything..."
                  className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Thinking..." : "Ask"}
                </button>
              </div>
            </form>

            {/* Error message */}
            {error && (
              <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Response display */}
            {response && (
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                <h2 className="text-sm font-semibold mb-2 text-gray-500">
                  Winston AI
                </h2>
                <div className="prose">{response}</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
