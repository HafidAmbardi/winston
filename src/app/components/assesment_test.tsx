"use client";
import React from "react"; 
import * as RadioGroup from "@radix-ui/react-radio-group";

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
        <RadioGroup.Root className="grid grid-cols-3 gap-8 mt-4" name={name}>
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-4 cursor-pointer">
              <RadioGroup.Item
                value={option.value}
                className="w-6 h-6 border-2 border-yellow-600 rounded-full flex items-center justify-center peer data-[state=checked]:border-8 data-[state=checked]:border-yellow-600"
              >
                <RadioGroup.Indicator className="w-3 h-3 bg-yellow-600 rounded-full" />
              </RadioGroup.Item>
              <span className="text-gray-900 font-medium">{option.label}</span>
            </label>
          ))}
        </RadioGroup.Root>
      </div>
    </div>
  );
}

