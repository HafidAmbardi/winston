"use client";

import { useEffect, useRef } from "react";

interface DonutChartProps {
  title?: string;
  percentage?: number;
  segments?: {
    color: string;
    value: number;
  }[];
  description?: string;
}

export default function DonutChart({
  title = "Smart Comparisons",
  percentage = 20,
  segments = [
    { color: "#b37400", value: 33 }, // Brown/gold
    { color: "#d3d3d3", value: 33 }, // Light gray
    { color: "#f59e0b", value: 34 }, // Orange/amber
  ],
  description = `You've improved ${percentage}% in problem-solving this month.`,
}: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Calculate total value of all segments
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);

    // Draw donut chart
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const outerRadius = Math.min(centerX, centerY) * 0.9;
    const innerRadius = outerRadius * 0.65;

    let startAngle = -Math.PI / 2; // Start from top

    // Draw segments
    segments.forEach((segment) => {
      const segmentAngle = (segment.value / total) * (2 * Math.PI);
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = segment.color;
      ctx.fill();

      startAngle = endAngle;
    });

    // Draw percentage text in center
    ctx.fillStyle = "#C77F00";
    ctx.font = "bold 24px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // text color

    ctx.fillText(`${percentage}%`, centerX, centerY);
  }, [percentage, segments]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="p-6 flex flex-col items-center">
        <div className="w-48 h-48 relative">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        <p className="text-center text-gray-700 mt-4">{description}</p>
      </div>
    </div>
  );
}
