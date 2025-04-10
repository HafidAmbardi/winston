import { Check, X, Flag } from "lucide-react";

interface FlashCardProps {
  questionNumber: string;
  marks: number;
  question: string;
  imageSrc: string;
}

export default function FlashCardMath({
  questionNumber,
  marks,
  question,
  imageSrc,
}: FlashCardProps) {
  return (
    <div className="w-full p-4 bg-[#FEF1D5] border border-gray-500 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
     
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--primary-400, #FFC052)",
              borderRadius: "9999px",
              border: "0.5px #EEF2F6 solid",
            }}
            className="flex items-center justify-center text-black font-medium"
          >
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


      <div className="flex justify-center">
        <img
          style={{ width: "322px", height: "92px" }}
          src={imageSrc}
          alt="Soal"
        />
      </div>

  
      <div className="mt-4">
        <div className="w-full h-full relative bg-[#FEF1D5] shadow-sm rounded-b-[10px] border border-[#4B5565] border-t-0"></div>
        <div className="mt-4"></div>
        <p className="text-black font-medium">Bagaimana pengerjaanmu?</p>
        <div className="flex gap-2 mt-2">
   
          <button
            className="p-2 bg-primary-400 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center border-opacity-100"
            style={{ backgroundColor: "#FFC052" }}
          >
            <img src="check.png" alt="Check Icon" className="w-4 h-4" />
          </button>
          <button
            className="p-2 bg-primary-400 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center border-opacity-100"
            style={{ backgroundColor: "#FFC052" }}
          >
            <img src="no (wrong) .png" alt="Wrong Icon" className="w-4 h-4" />
          </button>
          <button
            className="p-2 bg-primary-400 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center border-opacity-100"
            style={{ backgroundColor: "#FFC052" }}
          >
            <img src="flag.png" alt="Flag Icon" className="w-4 h-4" />
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
