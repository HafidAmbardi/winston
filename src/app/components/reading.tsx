import React from "react";
import Image from "next/image";

interface ReadingSectionProps {
  level: string;
  title: string;
  imageSrc: string;
  imageDimensions: {
    width: number;
    height: number;
  };
  paragraphs: string[];
  className?: string;
}

const ReadingSection: React.FC<ReadingSectionProps> = ({
  level,
  title,
  imageSrc,
  imageDimensions,
  paragraphs,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 ${className}`}>
      {/* Level */}
      <div className="mb-2">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {level}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* Image */}
      <div className="mb-6 relative rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          width={imageDimensions.width}
          height={imageDimensions.height}
          alt={title}
          className="w-full object-cover"
        />
      </div>

      {/* Paragraphs */}
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReadingSection;
