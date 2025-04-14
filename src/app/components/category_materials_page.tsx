"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import TopicCard from "@/app/components/topic_card";
import PromptInput from "@/app/components/prompt_input";
import RegularCourseMaterial from "@/app/components/regular_course_material";

interface CategoryMapping {
  [key: string]: {
    category: string;
    title: string;
    promptTitle: string;
    promptSubtitle: string;
    promptPlaceholder: string;
  };
}

interface MaterialItem {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  image_path: string;
}

const CategoryMaterialsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [recommendedMaterials, setRecommendedMaterials] = useState<
    MaterialItem[]
  >([]);

  // Configuration for different categories
  const categoryConfig: CategoryMapping = {
    "/matematika": {
      category: "mathematics",
      title: "Materi Matematika",
      promptTitle: "Cari materi matematika yang kamu inginkan",
      promptSubtitle: "Tulis kata kunci untuk mencari topik matematika",
      promptPlaceholder: "Contoh: aljabar, statistika, kalkulus...",
    },
    "/membaca": {
      category: "reading",
      title: "Materi Membaca",
      promptTitle: "Cari materi membaca yang kamu inginkan",
      promptSubtitle: "Tulis kata kunci untuk mencari topik bacaan",
      promptPlaceholder: "Contoh: cerita, artikel, nonfiksi...",
    },
    "/menulis": {
      category: "writing",
      title: "Materi Menulis",
      promptTitle: "Cari materi menulis yang kamu inginkan",
      promptSubtitle: "Tulis kata kunci untuk mencari topik penulisan",
      promptPlaceholder: "Contoh: esai, paragraf, tata bahasa...",
    },
  };

  // Get current category based on pathname
  const currentConfig =
    categoryConfig[pathname] || categoryConfig["/matematika"];

  // Fetch materials from Firestore
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);

        // Get current category from pathname
        const currentCategory =
          categoryConfig[pathname]?.category || "mathematics";

        // Query aggregated_materials for the current category
        const materialsRef = collection(db, "aggregated_materials");
        const q = query(materialsRef, where("category", "==", currentCategory));
        const querySnapshot = await getDocs(q);

        const fetchedMaterials: MaterialItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedMaterials.push({
            id: doc.id,
            title: data.title || "Untitled Material",
            category: data.category || currentCategory,
            difficulty: data.difficulty || "beginner",
            image_path: data.image_path || "/material.png",
          });
        });

        setMaterials(fetchedMaterials);

        // Set some materials as recommended (you can customize this logic)
        if (fetchedMaterials.length > 0) {
          // Use the first 3 materials or fewer if there aren't enough
          setRecommendedMaterials(fetchedMaterials.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [pathname]);

  // Handle prompt submission
  const handlePromptSubmit = (prompt: string) => {
    setSearchQuery(prompt);
    console.log("Searching for:", prompt);
    // Here you would typically filter topics or fetch search results
  };

  // Handle read full text
  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for course ${id}`);
    router.push(`${pathname}/material?id=${id}`);
  };

  // Handle audio and text selection
  const handleAudioSelect = () => {
    console.log("Audio option selected");
  };

  const handleTextSelect = () => {
    console.log("Text option selected");
  };

  // Group materials by difficulty
  const beginnerMaterials = materials
    .filter((m) => m.difficulty.toLowerCase() === "beginner")
    .map((m) => ({
      id: parseInt(m.id.replace(/\D/g, "") || "0"),
      title: m.title,
      imageSrc: m.image_path,
      onClick: () => router.push(`${pathname}/${m.id}`),
    }));

  const intermediateMaterials = materials
    .filter((m) => m.difficulty.toLowerCase() === "intermediate")
    .map((m) => ({
      id: parseInt(m.id.replace(/\D/g, "") || "0"),
      title: m.title,
      imageSrc: m.image_path,
      onClick: () => router.push(`${pathname}/${m.id}`),
    }));

  const advancedMaterials = materials
    .filter((m) => m.difficulty.toLowerCase() === "advanced")
    .map((m) => ({
      id: parseInt(m.id.replace(/\D/g, "") || "0"),
      title: m.title,
      imageSrc: m.image_path,
      onClick: () => router.push(`${pathname}/${m.id}`),
    }));

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
            <div className="mb-8 w-1/2 mx-auto">
              <PromptInput
                showButtons={false}
                title={currentConfig.promptTitle}
                subtitle={currentConfig.promptSubtitle}
                placeholder={currentConfig.promptPlaceholder}
                onSubmit={handlePromptSubmit}
              />
            </div>

            {/* Materials Section */}
            <h1 className="text-2xl font-bold mb-6">{currentConfig.title}</h1>

            {loading ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-lg h-64 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : materials.length === 0 ? (
              // Empty state
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-lg mb-12">
                <h2 className="text-xl font-bold mb-2">
                  Tidak ada materi tersedia
                </h2>
                <p>
                  Belum ada materi untuk kategori ini. Silakan coba kategori
                  lain atau kembali lagi nanti.
                </p>
              </div>
            ) : (
              // Content state
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {beginnerMaterials.length > 0 && (
                  <TopicCard
                    title={`${currentConfig.title} Dasar`}
                    cards={beginnerMaterials}
                    className="h-full"
                  />
                )}

                {intermediateMaterials.length > 0 && (
                  <TopicCard
                    title={`${currentConfig.title} Menengah`}
                    cards={intermediateMaterials}
                    className="h-full"
                  />
                )}

                {advancedMaterials.length > 0 && (
                  <TopicCard
                    title={`${currentConfig.title} Lanjut`}
                    cards={advancedMaterials}
                    className="h-full"
                  />
                )}
              </div>
            )}

            {/* Recommended Materials Section */}
            {recommendedMaterials.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-4">
                  Rekomendasi lainnya untukmu
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedMaterials.map((material) => (
                    <div key={material.id}>
                      <RegularCourseMaterial
                        id={material.id}
                        title={material.title}
                        imageSrc={material.image_path}
                        onReadFullText={handleReadFullText}
                        onAudioSelect={handleAudioSelect}
                        onTextSelect={handleTextSelect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryMaterialsPage;
