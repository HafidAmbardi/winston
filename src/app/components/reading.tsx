"use client";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have this utility from shadcn

interface ReadingProps {
  level?: string;
  title?: string;
  imageSrc?: string;
  imageDimensions?: { width: number; height: number };
  paragraphs?: string[];
  className?: string;
}

export default function ReadingSection({
  level = "Level Pemula",
  title = "Peluang Karir atau Pekerjaan Sebagai Perempuan di Bidang Sains dan Teknologi",
  imageSrc = "/reading_image.png",
  imageDimensions = { width: 435, height: 199 },
  paragraphs = [
    "Keterampilan STEM (Sains, Teknologi, Teknik, dan Matematika) telah dipandang sebagai sebuah keharusan bagi negara yang ingin tetap bersaing di bidang ekonomi. Para ahli telah mengemukakan bahwa kualitas masyarakat secara keseluruhan akan meningkat saat berbagai tim dapat mengatasi masalah teknologi dan sains. Sayangnya, tingkat keterwakilan kaum perempuan di bidang STEM terus mengalami penurunan, dan kesenjangan ini bermula di kelas perguruan tinggi. Namun, kesenjangan ini juga memiliki dasar sejarah.",
    "Keterampilan STEM (Sains, Teknologi, Teknik, dan Matematika) telah dipandang sebagai sebuah keharusan bagi negara yang ingin tetap bersaing di bidang ekonomi. Para ahli telah mengemukakan bahwa kualitas masyarakat secara keseluruhan akan meningkat saat berbagai tim dapat mengatasi masalah teknologi dan sains. Sayangnya, tingkat keterwakilan kaum perempuan di bidang STEM terus mengalami penurunan, dan kesenjangan ini bermula di kelas perguruan tinggi. Namun, kesenjangan ini juga memiliki dasar sejarah.",
  ],
  className,
}: ReadingProps) {
  return (
    <div
      className={cn(
        "w-full bg-white rounded-2xl border border-gray-600 p-6 relative min-h-fit",
        className
      )}
    >
      {/* Level indicator */}
      <div className="text-black text-sm font-normal leading-[21px]">
        {level}
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-300 my-4"></div>

      {/* Title */}
      <div className="text-center text-black text-2xl font-semibold leading-[35px] px-4">
        {title}
      </div>

      {/* Image with Next.js Image component */}
      <div className="flex justify-center my-6">
        <Image
          src={imageSrc}
          width={imageDimensions.width}
          height={imageDimensions.height}
          alt="Reading material illustration"
          className="rounded-md object-cover"
          priority
        />
      </div>

      {/* Paragraphs */}
      <div className="space-y-6 mt-8">
        {paragraphs.map((paragraph, index) => (
          <div
            key={index}
            className="text-justify text-black text-sm font-normal leading-[21px] px-6"
          >
            {paragraph}
          </div>
        ))}
      </div>

      {/* Optional bottom padding for better spacing */}
      <div className="h-4"></div>
    </div>
  );
}
