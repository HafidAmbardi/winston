import React from "react";

interface SectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const Section = ({ imageUrl, title, subtitle }: SectionProps) => {
  return (
    <div
      className="w-full h-full relative p-8 shadow-lg rounded-lg backdrop-blur-lg overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl}), linear-gradient(178deg, rgba(255, 255, 255, 0.24) 31%, rgba(255, 206.38, 132.60, 0.60) 63%)`,
        backgroundSize: "cover", // Ensures the image is resized properly
        backgroundPosition: "center", // Keeps the image centered
      }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-semibold font-poppins text-black leading-[54px] mb-2">
          {title}
        </div>
        <div className="text-lg font-normal font-poppins text-black leading-[24px]">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

interface BigCardProps {
  imagesrc: string;
  title: string;
  subtitle: string;
}

const BigCard: React.FC<BigCardProps> = ({ imagesrc, title, subtitle }) => {
  return (
    <div className="w-full h-full">
      <Section imageUrl={imagesrc} title={title} subtitle={subtitle} />
    </div>
  );
};

export default BigCard;
