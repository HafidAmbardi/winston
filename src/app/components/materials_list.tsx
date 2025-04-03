"use client";
import MaterialItem, {
  type MaterialStatus,
} from "@/app/components/material_item";

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
  materials = [
    {
      id: "1",
      title: "Bilangan & Operasi Dasar",
      status: "completed",
      imageSrc: "/placeholder.svg?height=128&width=128",
    },
    {
      id: "2",
      title: "Bilangan & Operasi Dasar",
      status: "in-progress",
      imageSrc: "/placeholder.svg?height=128&width=128",
    },
    {
      id: "3",
      title: "Bilangan & Operasi Dasar",
      status: "on-hold",
      imageSrc: "/placeholder.svg?height=128&width=128",
    },
    {
      id: "4",
      title: "Bilangan & Operasi Dasar",
      status: "on-hold",
      imageSrc: "/placeholder.svg?height=128&width=128",
    },
  ],
  onVisitMaterial = (materialId) =>
    console.log(`Visiting material ${materialId}`),
}: MaterialsListProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div className="p-4">
        {materials.map((material) => (
          <MaterialItem
            key={material.id}
            title={material.title}
            status={material.status}
            imageSrc={material.imageSrc}
            onVisit={() => onVisitMaterial(material.id)}
          />
        ))}
      </div>
    </div>
  );
}
