"use client";

import { useEffect, useRef } from "react";

interface DonutSegment {
  color: string;
  value: number;
}

interface DonutChartProps {
  title?: string;
  percentage?: number;
  segments?: DonutSegment[];
  description?: string;
}

export default function DonutChart({
  title = "Smart Comparisons",
  percentage = 0,
  segments = [
    { color: "#b37400", value: 33 }, // Brown/gold
    { color: "#d3d3d3", value: 33 }, // Light gray
    { color: "#f59e0b", value: 34 }, // Orange/amber
  ],
  description = "Analyzed data will appear here.",
}: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ensure percentage is a valid number
  const safePercentage =
    typeof percentage === "number" && !isNaN(percentage)
      ? Math.max(0, Math.min(100, percentage)) // Clamp between 0-100
      : 0;

  // Ensure segments is an array with valid values
  const safeSegments =
    Array.isArray(segments) && segments.length > 0
      ? segments.filter(
          (segment) =>
            typeof segment === "object" &&
            segment !== null &&
            typeof segment.color === "string" &&
            typeof segment.value === "number" &&
            !isNaN(segment.value) &&
            segment.value >= 0
        )
      : [
          { color: "#b37400", value: 33 },
          { color: "#d3d3d3", value: 33 },
          { color: "#f59e0b", value: 34 },
        ];

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
    const total = safeSegments.reduce((sum, segment) => sum + segment.value, 0);

    // Only draw if we have a positive total
    if (total <= 0) {
      // Draw empty circle if no valid data
      ctx.beginPath();
      ctx.arc(
        rect.width / 2,
        rect.height / 2,
        Math.min(rect.width, rect.height) * 0.4,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "#d3d3d3";
      ctx.lineWidth = Math.min(rect.width, rect.height) * 0.1;
      ctx.stroke();
      return;
    }

    // Draw donut chart
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const outerRadius = Math.min(centerX, centerY) * 0.9;
    const innerRadius = outerRadius * 0.65;

    let startAngle = -Math.PI / 2; // Start from top

    // Draw segments
    safeSegments.forEach((segment) => {
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
    ctx.fillText(`${safePercentage}%`, centerX, centerY);
  }, [safePercentage, safeSegments]);

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
