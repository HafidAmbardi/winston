"use client";

import Link from "next/link";

interface PremiumBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  comingSoonLink?: string;
}

export default function PremiumBanner({
  title = "Unlock more with Plus",
  description = "WinstonAI Plus gives you higher limits, smarter models, and Sora for video.",
  buttonText = "Get Plus",
  onButtonClick,
  comingSoonLink = "/comingsoon",
}: PremiumBannerProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className="bg-amber-50 rounded-xl p-4 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      <Link href={comingSoonLink} passHref>
        <button
          onClick={handleClick}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
}
