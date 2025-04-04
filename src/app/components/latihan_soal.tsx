interface PracticeSection {
  title: string;
  description: string;
}

interface PracticeCardProps {
  title: string;
  sections: PracticeSection[];
}

export default function PracticeCard({ title, sections }: PracticeCardProps) {
  return (
    <div className="w-[342px] h-[479px] bg-white rounded-[20px] border border-[#121926] overflow-hidden shadow-lg">
      {/* Title */}
      <div className="px-6 py-4">
        <h2 className="text-black text-[20px] font-medium leading-[21px]">
          {title}
        </h2>
      </div>

      {/* Divider */}
      <div className="w-full h-0 border-t border-[#121926]" />

      {/* Sections */}
      <div className="flex flex-col">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`flex bg-[#FDFDFD] ${
              idx !== sections.length - 1 ? "border-b border-[#121926]" : ""
            } h-[82px] w-full items-center`}
          >
            <div className="flex flex-col justify-start items-start pl-[23px]">
              <div className="text-black text-[20px] font-semibold leading-[36px] break-words">
                {section.title}
              </div>
              <div className="text-black text-[14px] font-medium leading-[28px] break-words">
                {section.description}
              </div>
            </div>

            {/* Right Button */}
            <div className="flex justify-center items-center h-[38px] rounded-[8px] ml-auto mr-4">
              <div className="flex items-center gap-[8px] bg-[#C77F00] rounded-[8px] p-[8px] shadow-sm">
