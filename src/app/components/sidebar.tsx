"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Book,
  BookOpen,
  Calculator,
  PenTool,
  Brain,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";

export default function WinstonSidebar() {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <div className="flex flex-col h-screen w-64 bg-[#fdf6ed] border-r border-[#e8e0d5]">
      {/* Logo and Brand */}
      <div className="p-4 border-b border-[#e8e0d5]">
        <div className="flex items-center gap-2">
          <div className="text-[#f0a030] font-bold">
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
          <span className="text-xl font-bold">Winston</span>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <p className="text-sm font-medium mb-2">Menu</p>
          <nav className="space-y-1">
            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "home"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("home")}
            >
              <Layers className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "winston-ai"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("winston-ai")}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 4C10.268 4 4 10.268 4 18C4 25.732 10.268 32 18 32C25.732 32 32 25.732 32 18C32 10.268 25.732 4 18 4Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M10 18C10 14 13 10 18 10C23 10 26 14 26 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span>Winston AI</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "informasi"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("informasi")}
            >
              <Book className="w-5 h-5" />
              <span>Informasi</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "membaca"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("membaca")}
            >
              <BookOpen className="w-5 h-5" />
              <span>Membaca</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "belajar-matematika"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("belajar-matematika")}
            >
              <Calculator className="w-5 h-5" />
              <span>Belajar Matematika</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "menulis"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("menulis")}
            >
              <PenTool className="w-5 h-5" />
              <span>Menulis</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "berpikir-kritis"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("berpikir-kritis")}
            >
              <Brain className="w-5 h-5" />
              <span>Berpikir Kritis</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "referensi-materi"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("referensi-materi")}
            >
              <Layers className="w-5 h-5" />
              <span>Referensi Materi</span>
            </Link>
          </nav>
        </div>

        {/* General Section */}
        <div className="p-4">
          <p className="text-sm font-medium mb-2">General</p>
          <nav className="space-y-1">
            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "help"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("help")}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help and Support</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeItem === "setting"
                  ? "bg-[#e09422] text-white"
                  : "text-gray-600 hover:bg-[#f0e6d9]"
              }`}
              onClick={() => setActiveItem("setting")}
            >
              <Settings className="w-5 h-5" />
              <span>Setting</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
