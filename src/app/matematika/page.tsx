"use client";

import { useState } from "react";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import MathTopicCard from "@/app/components/math_topic_card";

// Sample math topics data
const mathTopics = [
  {
    id: 1,
    title: "Bilangan &",
    titleSecondLine: "Operasi Dasar",
    imageSrc: "/material.png", // Replace with your image paths
    onClick: () => router.push("/matematika/bilangan"),
  },
  {
    id: 2,
    title: "Pengukuran &",
    titleSecondLine: "Geometri",
    imageSrc: "/material.png",
    onClick: () => router.push("/matematika/geometri"),
  },
  {
    id: 3,
    title: "Statistika &",
    titleSecondLine: "Probabilitas",
    imageSrc: "/material.png",
    onClick: () => router.push("/matematika/statistika"),
  },
];

export default function MathTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleViewMaterial = (id: string) => {
    setSelectedTopic(id);
    console.log(`Viewing material for topic ${id}`);
    // Here you would typically navigate to the topic detail page
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Math */}
            <MathTopicCard title="Matematika Dasar" cards={mathTopics} />
          </div>
        </main>
      </div>
    </div>
  );
}
