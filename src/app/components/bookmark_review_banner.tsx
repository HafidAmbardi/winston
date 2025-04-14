import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/auth_context";
import {
  calculateNextReviewDate,
  formatNextReviewDate,
} from "@/app/utils/srs_utils";

interface BookmarkReviewBannerProps {
  bookmarkId: string;
  reviewCount: number;
  lastReviewedDate: Date;
  nextReviewDate: Date;
  srsStatus: string;
  onReviewComplete: () => void;
}

export default function BookmarkReviewBanner({
  bookmarkId,
  reviewCount,
  lastReviewedDate,
  nextReviewDate,
  srsStatus,
  onReviewComplete,
}: BookmarkReviewBannerProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Determine if the item is due for review
  const isDue = srsStatus === "due";

  // If not due, display when it will be due
  if (!isDue) {
    const nextReviewText = formatNextReviewDate(nextReviewDate);
    return (
      <div className="mb-2 text-xs text-gray-500">
        Next review: {nextReviewText} •{" "}
        {reviewCount === 1
          ? "New"
          : `Reviewed ${reviewCount - 1} ${
              reviewCount === 2 ? "time" : "times"
            }`}
      </div>
    );
  }

  // Handle marking the review as complete
  const handleReviewComplete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update with new review data
      const newReviewCount = reviewCount + 1;
      const now = new Date();
      const newNextReviewDate = calculateNextReviewDate(newReviewCount, now);

      // Update the bookmark in Firestore
      const bookmarkRef = doc(db, `users/${user.uid}/bookmarks`, bookmarkId);
      await updateDoc(bookmarkRef, {
        reviewCount: newReviewCount,
        lastReviewedDate: now,
        nextReviewDate: newNextReviewDate,
        srsStatus: "learning",
      });

      // Call the callback to refresh the UI
      onReviewComplete();
    } catch (error) {
      console.error("Error updating review status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-3 bg-amber-50 border border-amber-200 rounded-md p-3 flex items-center justify-between">
      <div className="text-amber-800">
        <p className="font-medium text-sm">Time to review this material!</p>
        <p className="text-xs">
          Reviewing regularly helps with long-term retention
        </p>
      </div>
      <button
        onClick={handleReviewComplete}
        disabled={loading}
        className={`bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? "Updating..." : "I've reviewed this"}
      </button>
    </div>
  );
}
