"use client";

import { useRouter } from "next/navigation";
import MaterialItem, {
  type MaterialStatus,
} from "@/app/components/material_item";
import { useEffect } from "react";

// Export these interfaces so they can be imported elsewhere
export type { MaterialStatus } from "@/app/components/material_item"; // Re-export from source

export interface Material {
  id: string;
  title: string;
  status: MaterialStatus;
  imageSrc: string;
}

interface MaterialsListProps {
  title?: string;
  materials?: Material[];
  onVisitMaterial?: (materialId: string) => void;
}

export default function MaterialsList({
  title = "Perkembangan Belajarmu",
  materials = [],
  onVisitMaterial,
}: MaterialsListProps) {
  const router = useRouter();

  // Default handler that navigates to the material page
  const handleVisitMaterial = (materialId: string) => {
    if (onVisitMaterial) {
      // Use custom handler if provided
      onVisitMaterial(materialId);
    } else {
      // Check if material is a reading and route accordingly
      if (materialId.startsWith("reading")) {
        router.push(`/membaca/${materialId}`); // This will route to the dynamic [id] route
      } else {
        router.push(`/materials/${materialId}`);
      }
    }
  };

  // Safety check to ensure materials is an array
  const safeMaterials = Array.isArray(materials) ? materials : [];
  useEffect(() => {
    console.log("MaterialsList props received:", { title, materials });
  }, [title, materials]);
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div className="p-4">
        {safeMaterials.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            Belum ada materi tersedia.
          </div>
        ) : (
          safeMaterials.map((material) => (
            <MaterialItem
              key={material.id}
              title={material.title}
              status={material.status}
              imageSrc={material.imageSrc}
              onVisit={() => handleVisitMaterial(material.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
