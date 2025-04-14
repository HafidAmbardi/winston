"use client";

import { useState, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  onFeedback?: (isHelpful: boolean) => void;
}

export default function VideoPlayer({
  videoUrl,
  thumbnailUrl = "https://s3-alpha-sig.figma.com/img/ac65/0a9f/16ba58fb8355c82f7e76b338eccf5b5c?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ihWkzj9yRFNNX-8Nxz1YtGnF01ZT09G7TVZzl6qZmp8ljjb5Qb4mgekZc4y5OGgyD7kYXC3moxwtVVkd8exyXoTMMrfWNfdZ0okxpD8Opt9rqbTAobekIwO5UKQwwQqBeei6qa8JO5w4WyASgGEVMLjeMj-JofjUk0HAHhCRqjElIUffKNzx98kPF7M90LSrxuzvvAsMhYtl2Gyv2CshEOuICFdleyp211uOexojTG5-vaKGlNWJ7UM7bSmKtnCrZr-oTM89wYC3bba1AtIKkG9cS9ocPsWNlcnwkuFefHLYJioANefwinr-M6XLXTjkBFU6TZnWW2t7gUKix0zeGw__",
  onFeedback,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFeedback = (isHelpful: boolean) => {
    setFeedbackGiven(isHelpful);
    if (onFeedback) {
      onFeedback(isHelpful);
    }
  };

  return (
    <div className="w-full h-full relative rounded-md">
      <div className="w-full h-[378px] relative bg-[#FEF1D5] overflow-hidden rounded-md border border-[#FFCE85]">
        <div className="w-[585px] max-w-full h-[268px] mx-auto mt-[33px] relative overflow-hidden rounded-[10px]">
          {/* Video player */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={thumbnailUrl}
            className="w-full h-full object-cover"
            onClick={handlePlayPause}
          />

          {/* Play button overlay */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={handlePlayPause}
            >
              <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center">
                <div className="w-[82px] h-[78px] relative overflow-hidden">
                  <div className="w-12 h-[58.5px] absolute left-[17px] top-[9.75px] bg-[#D9D9D9] border-2 border-[#121926]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feedback section */}
        <div className="w-[339px] h-[42px] px-[9px] py-[11px] ml-7 mt-[19px] border border-[#FFA405] rounded-md">
          <div className="flex items-center">
            <div className="text-black text-xs font-normal font-['Poppins'] mr-2">
              Apakah video ini membantu?
            </div>
            <div className="flex items-center justify-between w-[121px]">
              {/* Yes option */}
              <div
                className={`flex items-center gap-[5px] cursor-pointer ${
                  feedbackGiven === true ? "opacity-100" : "opacity-70"
                }`}
                onClick={() => handleFeedback(true)}
              >
                <div className="w-5 h-5 relative overflow-hidden">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image href="thumbs-up.svg" width="20" height="20" />
                  </svg>
                </div>
                <div className="text-black text-xs font-normal font-['Poppins']">
                  Ya
                </div>
              </div>

              {/* No option */}
              <div
                className={`flex items-center gap-[5px] cursor-pointer ${
                  feedbackGiven === false ? "opacity-100" : "opacity-70"
                }`}
                onClick={() => handleFeedback(false)}
              >
                <div className="w-5 h-5 relative overflow-hidden">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image href="thumbs-down.svg" width="20" height="20" />
                  </svg>
                </div>
                <div className="text-black text-xs font-normal font-['Poppins']">
                  Tidak
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
