"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Star } from "lucide-react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/auth_context";

interface MaterialSectionProps {
  id?: string; // Material ID for bookmark reference
  summaryPoints: string[];
  detailedExplanation: string | React.ReactNode;
  buttonText?: string;
  parentTitle?: string; // Title of the parent material
  materialType?: string; // Type of material (e.g., "detailed")
}

export default function MaterialSection({
  id,
  summaryPoints,
  detailedExplanation,
  buttonText = "Penjelasan Lengkap",
  parentTitle = "",
  materialType = "material",
}: MaterialSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Generate a consistent ID if none provided
  const bookmarkId =
    id ||
    `material-${summaryPoints
      .join("")
      .slice(0, 20)
      .replace(/\s+/g, "-")
      .toLowerCase()}`;

  // Check if this material is already bookmarked when component mounts
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user) return;

      try {
        // Check if this item is already in user's bookmarks
        const bookmarkRef = doc(db, `users/${user.uid}/bookmarks`, bookmarkId);
        const bookmarkDoc = await getDoc(bookmarkRef);

        setIsBookmarked(bookmarkDoc.exists());
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [user, bookmarkId]);

  // Handle bookmark toggle
  const handleBookmarkToggle = async () => {
    if (!user) {
      alert("Please log in to bookmark materials");
      return;
    }

    setLoading(true);
    try {
      const bookmarkRef = doc(db, `users/${user.uid}/bookmarks`, bookmarkId);

      if (isBookmarked) {
        // Remove bookmark
        await deleteDoc(bookmarkRef);
        setIsBookmarked(false);
      } else {
        // Add bookmark - store all relevant material data
        // Include SRS data for new bookmarks
        const now = new Date();
        await setDoc(bookmarkRef, {
          id: bookmarkId,
          type: "material",
          materialType: materialType,
          parentTitle: parentTitle,
          summaryPoints: summaryPoints,
          detailedExplanation:
            typeof detailedExplanation === "string"
              ? detailedExplanation
              : "Detailed explanation available",
          createdAt: now,
          title: summaryPoints[0]?.substring(0, 50) || "Material Section",
          // SRS-specific fields
          reviewCount: 1, // Initial bookmark counts as first review
          lastReviewedDate: now,
          nextReviewDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Next day
          srsStatus: "new",
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Bookmark Star Button */}
      <button
        className={`absolute top-2 right-2 z-10 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (!loading) handleBookmarkToggle();
        }}
        disabled={loading}
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <Star
          className={`w-5 h-5 ${
            isBookmarked
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-400 hover:text-gray-600"
          }`}
        />
      </button>

      {/* Content section */}
      <div className="border border-[#A36800] rounded-md p-5">
        <ul className="text-black text-sm font-normal leading-[25px]">
          {summaryPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <button
        className="w-full mt-2 flex justify-between items-center bg-[#BD7800] 
        text-white text-sm font-medium font-[Inter] py-3 px-5 rounded-lg 
        shadow-sm border border-[#FAA500] hover:bg-[#A36800] transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-3 p-5 border border-[#A36800] rounded-md bg-[#FFF8EB] text-sm">
          {detailedExplanation}
        </div>
      )}
    </div>
  );
}
