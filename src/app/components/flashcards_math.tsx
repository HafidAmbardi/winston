import { Check, X, Flag } from "lucide-react";

interface FlashCardProps {
  questionNumber: string;
  marks: number;
  question: string;
  imageUrl: string;
}

export default function FlashCardMath({
  questionNumber,
  marks,
  question,
  imageUrl,
}: FlashCardProps) {
  return (
    <div className="w-full p-4 bg-[#FEF1D5] border border-gray-500 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FFC052] rounded-full flex items-center justify-center text-black font-medium border border-[#EEF2F6]">
            {questionNumber}
          </div>
        </div>
        <div className="flex items-center gap-2 text-black font-medium">
          <Flag size={20} />
          <span>{marks} marks</span>
        </div>
      </div>

      <hr className="my-2 border-gray-500" />

      <div className="text-black font-medium mb-4">{question}</div>

      <div className="flex justify-center bg-white p-4 rounded-md shadow">
        <img
          className="w-[322px] h-[92px] object-contain"
          src={imageUrl}
          alt="Soal"
        />
      </div>

      <div className="mt-4">
        <p className="text-black font-medium">Bagaimana pengerjaanmu?</p>
        <div className="flex gap-4 mt-2">
          <button
            className="p-2 bg-[#FFC052] rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
          >
            <img src="/check.png" alt="Check Icon" className="w-4 h-4" />
          </button>

          <button
            className="p-2 bg-[#FFC052] rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
          >
            <img src="/no(wrong).png" alt="Wrong Icon" className="w-4 h-4" />
          </button>

          <button
            className="p-2 bg-[#FFC052] rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
          >
            <img src="/flag.png" alt="Flag Icon" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-[#FFC052] text-black font-medium rounded-md shadow">
          Lihat Jawaban
        </button>
      </div>
    </div>
  );
}
