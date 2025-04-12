import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const NavLink = ({ href, children, className }: NavLinkProps) => (
  <Link href={href} className={cn("text-black text-xl font-semibold font-['Plus_Jakarta_Sans']", className)}>
    {children}
  </Link>
)

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-white shadow-sm border-b border-black/10 flex justify-between items-center">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-3">
        <Image src="/images/winston_logo.png" alt="Winston Logo" width={63} height={45} className="object-contain" />
        <span className="text-xl font-semibold font-['Plus_Jakarta_Sans'] text-black">Winston</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-between gap-8">
        <NavLink href="/tentang-kami">Tentang Kami</NavLink>
        <NavLink href="/notes">Notes</NavLink>
        <NavLink href="/latihan-soal">Latihan soal</NavLink>
        <NavLink href="/package">Package</NavLink>

        {/* Buttons */}
        <div className="flex items-center gap-2 ml-8">
          <Link
            href="/login"
            className="px-3.5 py-2 bg-[#BD7800] text-white font-bold text-base font-['Plus_Jakarta_Sans'] rounded-lg shadow-sm border border-[#BD7800]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-3.5 py-2 text-[#FFA405] font-bold text-base font-['Plus_Jakarta_Sans'] rounded-lg shadow-sm border border-[#FFA405]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
