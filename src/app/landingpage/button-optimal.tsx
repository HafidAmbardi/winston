import type React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonOptimalProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonOptimal({
  href = "#",
  children,
  className,
}: ButtonOptimalProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 border border-[#BD7800] rounded-lg text-black font-semibold font-['Plus_Jakarta_Sans'] transition-colors hover:bg-[#FFA405]/10",
        className
      )}
    >
      {children}
      <ArrowRight className="w-5 h-5" />
    </Link>
  );
}
