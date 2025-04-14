"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import PromptInput from "@/app/components/prompt_input";
import AggregatedMaterialComponent from "@/app/components/aggregated_material_component";
import MaterialQuizComponent from "@/app/components/material_quiz_component";

export default function DynamicMaterialRoute() {
  const params = useParams();
  const slug = params?.slug as string;
  const [pageType, setPageType] = useState<
    "aggregated" | "material" | "unknown"
  >("unknown");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setPageType("unknown");
      setLoading(false);
      return;
    }

    // Determine page type based on the slug prefix
    if (slug.startsWith("aggr")) {
      setPageType("aggregated");
    } else if (slug.startsWith("material")) {
      setPageType("material");
    } else {
      setPageType("unknown");
    }

    setLoading(false);
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen">
        <WinstonSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <WinstonHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-64 bg-gray-200 rounded mb-8"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Error state - unknown page type
  if (pageType === "unknown") {
    return (
      <div className="flex h-screen">
        <WinstonSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <WinstonHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>
                  {
                    "Invalid material ID format. Expected ID to start with 'aggr'"
                  }
                  {" or 'material'."}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Prompt Input */}
            <div className="mb-8">
              <PromptInput
                showButtons={false}
                title="Masih belum mengerti? Tulis prompt pertanyaan disini"
                subtitle=""
                placeholder="Tulis pernyataanmu......"
              />
            </div>

            {/* Render the appropriate component based on page type */}
            {pageType === "aggregated" && (
              <AggregatedMaterialComponent materialId={slug} />
            )}
            {pageType === "material" && (
              <MaterialQuizComponent materialId={slug} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
