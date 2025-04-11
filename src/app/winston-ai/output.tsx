import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import AudioButton from './components/audio_button';
import TextButton from './components/text_button';
import DownloadButton from './components/download_button';
import PromptInput from './components/prompt_input';

const DashboardPage = () => {
  const [prompt, setPrompt] = useState('');

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[248px] bg-[#F8FAFC] shadow-md p-6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative bg-white overflow-hidden">
        {/* Dashboard Header */}
        <div className="absolute top-0 left-[248px] w-[1190px] h-[75px] bg-[#FEF5EC] border-b-[1px] border-[#E3E8EF] flex justify-between items-center">
          <div className="ml-6 text-black font-normal text-[18px]">Dashboard</div>
          <div className="flex gap-2 mr-6">
            <div className="w-[20px] h-[20px] bg-[#E59200] rounded-full flex justify-center items-center">
              <div className="w-[16.67px] h-[16.67px] bg-white rounded-full"></div>
            </div>
            <div className="w-[20px] h-[20px] bg-[#E59200] rounded-full flex justify-center items-center">
              <div className="w-[16.67px] h-[16.67px] bg-white rounded-full"></div>
            </div>
            <div className="w-[215px] h-[36px] bg-[#F8FAFC] rounded-[5px] flex items-center pl-2 gap-3 border border-[#E3E8EF]">
              <img src="https://placehold.co/25x25" alt="profile" className="w-[25px] h-[25px] rounded-[4px]" />
              <span className="text-black text-[16px]">Daniel Mandela Tulung</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-[120px] w-[643px] mx-auto">
          <div className="bg-[#FEF1D5] p-6 rounded-[8px]">
            <h2 className="text-[14px] text-black font-medium">Masih belum mengerti? Tulis prompt pertanyaan disini</h2>
            <div className="mt-4 w-[619px] bg-[#FEF1D5] p-[16px] rounded-[8px] flex flex-col gap-3">
              <div className="flex justify-between items-center w-full">
                <input
                  type="text"
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Tulis pernyataanmu......"
                  className="w-[181px] text-[14px] text-[#999999] font-medium"
                />
                <div className="w-[18px] h-[18px] border-[2px] border-[#9AA4B2] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="mt-12 flex gap-6">
          <AudioButton />
          <TextButton />
          <DownloadButton />
        </div>

        {/* Recommended Topics Section */}
        <div className="mt-8 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Rekomendasi Materi</h2>
          <div className="p-4 border border-[#E3E8EF] rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Belajar Matematika Dasar</h3>
            <p className="text-sm text-gray-700">People care about how you see the world, how you think.</p>
            <AudioButton className="mt-4" />
          </div>
          {/* Repeat similar cards for more recommended topics */}
          <div className="p-4 border border-[#E3E8EF] rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Belajar Matematika Terapan</h3>
            <p className="text-sm text-gray-700">Learn how to apply mathematics in real-world scenarios.</p>
            <AudioButton className="mt-4" />
          </div>
        </div>

        {/* Recommended Next Steps Section */}
        <div className="mt-12 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Rekomendasi Langkah Selanjutnya</h2>
          <div className="p-4 border border-[#E3E8EF] rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Belajar Matematika Lanjutan</h3>
            <TextButton className="mt-4" />
          </div>
          {/* Repeat similar cards for more next steps */}
          <div className="p-4 border border-[#E3E8EF] rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Kalkulus Dasar</h3>
            <TextButton className="mt-4" />
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-12">
          <div className="w-[643px] bg-[#BD7800] p-[12px] rounded-[8px] shadow-sm flex justify-between items-center">
            <span className="text-white text-[16px] font-medium">Lanjutkan</span>
            <div className="w-[20px] h-[20px] bg-white rounded-full flex justify-center items-center">
              <div className="w-[11.67px] h-[11.67px] bg-[#9AA4B2] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
