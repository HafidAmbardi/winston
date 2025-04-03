"use client";

interface PremiumBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function PremiumBanner({
  title = "Unlock more with Plus",
  description = "WinstonAI Plus gives you higher limits, smarter models, and Sora for video.",
  buttonText = "Get Plus",
  onButtonClick = () => console.log("Premium button clicked"),
}: PremiumBannerProps) {
  return (
    <div className="bg-amber-50 rounded-xl p-4 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      <button
        onClick={onButtonClick}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
