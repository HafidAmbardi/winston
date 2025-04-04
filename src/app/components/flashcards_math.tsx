 import { Check, X, Flag } from "lucide-react";

interface FlashCardProps {
  questionNumber: string;
  marks: number;
  question: string;
  latexExpression: string;
}

export default function FlashCardMath({
  questionNumber,
  marks,
  question,
  latexExpression,
}: FlashCardProps) {
  return (
    <div className="w-full p-4 bg-[#FEF1D5] border border-gray-500 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 bg-[#FFC052] rounded-full flex 
          items-center justify-center text-black font-medium"
>
            {questionNumber}
          </div>
        </div>
        <div class="flex items-end justify-start gap-2">
  <img src="/path-to-icons/calculator.png" alt="calcultir Icon" class="w-4 h-4" />></img>
  <div class="flex items-end justify-start gap-2">
  <div class="w-8 h-0 transform rotate-90 origin-top-left border border-black border-opacity-100 outline-offset-[-0.5px]"></div>
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

     <! in my opinion I think just use image aja deh but custom as of now, 
      soalnya if manually from backend kyk kurang bagus and tktnya ada some equations
      yg complex and gabisa diconvert with the system wdyt, sbnrny UX speaking gpp text cmn
      kykk formatnya kyk krng bagus aja-->

      <div className="mt-4">
        <p className="text-black font-medium">Bagaimana pengerjaanmu?</p>
        <div className="flex gap-4 mt-2">

          <!-- Button with check -->
          <button class="p-2 bg-yellow-400 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center" >
<img src="/path-to-icons/check.png" alt="Check Icon" class="w-4 h-4" />
</button>

<!-- Button with No (Wrong) Icon -->
<button
class="p-2 bg-red-400 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
>
<img src="/path-to-icons/no(wrong).png" alt="Wrong Icon" class="w-4 h-4" />
</button>

<div class="flex items-end justify-start gap-2">
  <div class="w-8 h-0 transform rotate-90 origin-top-left border border-black border-opacity-100 outline-offset-[-0.5px]"></div>
</div>


<!-- Button with Flag Icon -->
<button
class="p-2 bg-yellow-600 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
>
<img src="/path-to-icons/flag.png" alt="Flag Icon" class="w-4 h-4" />
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
