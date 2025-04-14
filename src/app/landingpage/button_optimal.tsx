import type React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  dimension?: "sm" | "md" | "lg" | "xl" | "2xl";
  symbol?: React.ReactNode;
  symbolPosition?: "leading" | "trailing";
  isFullWidth?: boolean;
  href?: string;
  className?: string;
}

const OptimizeButton: React.FC<ButtonProps> = ({
  children,
  label,
  dimension = "md",
  symbol = <ArrowRight className="w-5 h-5" />,
  symbolPosition = "trailing",
  isFullWidth = false,
  href = "#",
  className,
}) => {
  // Determine text content (use children or label prop)
  const textContent = children || label;

  // Determine size classes based on dimension
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
    "2xl": "px-10 py-5 text-2xl",
  };

  const buttonClasses = cn(
    "inline-flex items-center gap-2 rounded-lg font-semibold font-['Plus_Jakarta_Sans'] transition-colors",
    "border border-[#FFA405] bg-[#FFA405] text-black hover:bg-[#FFA405]/10",
    sizeClasses[dimension],
    isFullWidth ? "w-full justify-center" : "",
    className
  );

  return (
    <Link href={href} className={buttonClasses}>
      {symbol && symbolPosition === "leading" && <span>{symbol}</span>}
      {textContent}
      {symbol && symbolPosition === "trailing" && <span>{symbol}</span>}
    </Link>
  );
};

export default OptimizeButton;
