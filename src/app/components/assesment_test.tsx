"use client";

interface SectionProps {
  title: string;
  options: { value: string; label: string }[];
  name: string;
}

export default function Section({ title, options, name }: SectionProps) {
  return (
    <div className="w-[70%] mx-auto p-6 bg-white shadow-sm rounded-lg border border-gray-300 flex flex-col justify-center items-center gap-6 mb-6">
      <div className="text-center">
        <p className="font-semibold text-xl mb-4">{title}</p>
        <div className="grid grid-cols-3 gap-8 mt-4">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-4 cursor-pointer" >
              <input
                type="radio"
                name={name}
                value={option.value}
                className="hidden peer"
              />
              <div className="w-6 h-6 border-2 border-yellow-600 rounded-full flex items-center justify-center peer-checked:border-8 peer-checked:border-yellow-600"></div>
              <span className="text-gray-900 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
