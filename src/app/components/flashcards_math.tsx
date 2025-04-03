import { Check, X, Flag } from "lucide-react";

interface FlashCardProps {
  questionNumber: string;
  marks: number;
  question: string;
  latexExpression: string;
}

export default function FlashCard({
  questionNumber,
  marks,
  question,
  latexExpression,
}: FlashCardProps) {
  return (
    <div className="w-full p-4 bg-[#FEF1D5] border border-gray-500 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FFC052] rounded-full flex 
          items-center justify-center text-black font-medium">
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
      <img class="w-[322px] h-[92px] relative" src="https://placehold.co/322x92" alt="Soal" />
      </div>

      <div className="mt-4">
        <p className="text-black font-medium">Bagaimana pengerjaanmu?</p>
        <div className="flex gap-4 mt-2">
          <button className="p-2 bg-yellow-400 rounded-full shadow">
            <Check size={20} color="black" />
          </button>
          <button className="p-2 bg-red-400 rounded-full shadow">
            <X size={20} color="black" />
          </button>
          <button className="p-2 bg-yellow-600 rounded-full shadow">
            <Flag size={20} color="black" />
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
