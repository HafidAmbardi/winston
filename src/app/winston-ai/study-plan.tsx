import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import AudioButton from './components/audio_button';
import TextButton from './components/text_button';
import StudyPlanButton from './components/study_plan_button';
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
      <div className="flex-1 p-6">
        <div className="bg-[#FEF5EC] p-6 rounded-lg">
          {/* Title and description */}
          <h1 className="text-2xl font-semibold">Apa informasi yang ingin kamu cari?</h1>
          <p className="text-lg mt-2">Tulis prompt kamu di bawah ini untuk mempersonalisasikan jawabanmu!</p>

          {/* Prompt Input */}
          <PromptInput value={prompt} onChange={handlePromptChange} className="mt-4" />

          {/* Buttons like the ones in the image */}
          <div className="mt-8 flex gap-6">
            <AudioButton />
            <TextButton />
            <StudyPlanButton />
          </div>

          {/* Recommended Topics Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Rekomendasi Materi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Example Topic Card */}
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
          </div>

          {/* Recommended Next Steps Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold">Rekomendasi Langkah Selanjutnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Example Step Card */}
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
          </div>

          {/* Action Buttons Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold">Tindakan Berikutnya</h2>
            <div className="flex gap-6 mt-4">
              <StudyPlanButton className="w-full md:w-auto" />
              {/* More buttons can be added */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
