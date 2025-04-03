import { useState } from "react";
// Update these import paths to match your shadcn setup
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Add props to make the component more reusable
interface FlashcardProps {
  questionNumber?: string;
  marks?: number;
  question?: string;
  explanation?: string;
}

export default function Flashcard({
  questionNumber = "1a",
  marks = 2,
  question = "Jika kamu menghadapi deadline ketat dan timmu belum selesai, apa yang akan kamu lakukan?",
  explanation = "Pembahasan: Cobalah mengatur ulang prioritas dan berkomunikasi dengan tim secara efektif.",
}: FlashcardProps) {
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Card className="w-[644px] bg-[#FEF1D5] shadow-md rounded-xl border border-gray-500 p-5">
      <div className="flex justify-between items-center mb-2">
        <div className="w-10 h-10 bg-[#FFC052] rounded-full flex items-center justify-center">
          <span className="text-black font-medium">{questionNumber[0]}</span>
        </div>
        <span className="text-black text-lg font-medium">{questionNumber}</span>
        <div className="flex items-center gap-2">
          <div className="w-[33px] h-0 rotate-90 border border-black" />
          <span className="text-black text-sm font-medium">{marks} marks</span>
        </div>
      </div>
      <div className="border-t border-gray-500 my-3" />
      <p className="text-black text-base font-medium mb-4">{question}</p>
      <Input
        type="text"
        placeholder="Tulis jawabanmu di sini..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-black text-sm font-medium">
          Bagaimana pengerjaanmu?
        </span>
        <Button
          onClick={() => setShowAnswer(!showAnswer)}
          className="bg-[#FFCE85] px-4 py-2 rounded-md border border-black"
        >
          Lihat Pembahasan
        </Button>
      </div>
      {showAnswer && (
        <div className="mt-3 p-3 bg-gray-100 rounded-md border border-gray-400">
          <p className="text-black text-sm font-medium">{explanation}</p>
        </div>
      )}
    </Card>
  );
}
