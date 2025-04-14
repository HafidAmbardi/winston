import React from "react";

interface SectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const Section = ({ imageUrl, title, subtitle }: SectionProps) => {
  return (
    <div
      className="w-full h-full relative p-4 shadow-md rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl}), linear-gradient(178deg, rgba(255, 255, 255, 0.24) 13%, rgba(255, 206.38, 132.60, 0.60) 60%)`,
        backgroundSize: "cover", // Ensures the image is resized properly
        backgroundPosition: "center", // Keeps the image centered
      }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold font-poppins text-black leading-[36px] mb-2">
          {title}
        </div>
        <div className="text-base font-medium font-poppins text-black leading-[24px]">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

interface SmallCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="w-full h-full">
      <Section imageUrl={imageUrl} title={title} subtitle={subtitle} />
    </div>
  );
};

export default SmallCard;
