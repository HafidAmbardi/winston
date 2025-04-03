import type React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-amber-100 relative overflow-hidden">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center text-gray-800 hover:text-amber-700 z-10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Kembali</span>
        </Link>

        {/* Logo */}
        <div className="absolute top-32 left-8 z-10">
          <div className="flex items-center">
            <div className="text-amber-500 mr-2">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 4C10.268 4 4 10.268 4 18C4 25.732 10.268 32 18 32C25.732 32 32 25.732 32 18C32 10.268 25.732 4 18 4Z"
                  stroke="#f0a030"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M10 18C10 14 13 10 18 10C23 10 26 14 26 18"
                  stroke="#f0a030"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-amber-600">Winston</span>
          </div>
        </div>

        {/* Background Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-200 opacity-50 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-200 opacity-50 -ml-48 -mb-48"></div>

        {/* Content Box */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 bg-white bg-opacity-90 rounded-2xl p-8 overflow-hidden">
          <div className="flex">
            <div className="w-1/2">
              <h1 className="text-4xl font-bold leading-tight">
                Belajar Tanpa
                <br />
                Batas Bersama
                <br />
                Winston
              </h1>
            </div>
            <div className="w-1/2">
              <Image
                src="/placeholder.svg?height=300&width=200"
                alt="Student with headphones"
                width={200}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
