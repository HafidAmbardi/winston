"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-6 text-center">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center text-amber-800 hover:text-amber-600 transition-colors"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Image
            src="/winston_logo.png"
            alt="Winston Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-amber-800 mb-6">
          Coming Soon
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">
            Support Winston in the Finals!
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            We're developing innovative tools to assist people with learning and
            memory disabilities, making education accessible for everyone.
          </p>

          <p className="text-gray-700">
            This feature isn't part of the MVP, however it will become a reality
            if you support us in the finals! Help us empower students with LD's
            and MD's!
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors text-lg font-medium"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-amber-700">
        <p>
          © {new Date().getFullYear()} Winston Learning. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
