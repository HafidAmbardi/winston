"use client";

import Sidebar from '@/app/components/sidebar';
import AudioButton from '@/app/components/audio_button';
import TextButton from '@/app/components/text_button';
import DownloadButton from '@/app/components/download_button';

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Search prompt */}
          <div className="mb-8">
            <p className="text-xs text-gray-600 mb-2">Masih belum mengerti? Tulis prompt pertanyaan disini</p>
            <div className="bg-[#FEF1D5] rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-gray-400 text-sm flex-1">Tulis pernyataanmu......</span>
              <div className="w-6 h-6 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col md:flex-row gap-4">
            <AudioButton />
            <TextButton />
            <DownloadButton />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
