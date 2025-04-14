// SRS intervals in days
export const SRS_INTERVALS = [
  0, // 1st review (initial bookmark)
  1, // 2nd review (+1 day)
  3, // 3rd review (+3 days)
  7, // 4th review (+7 days)
  14, // 5th review (+14 days)
  30, // 6th review (+30 days)
  60, // 7th review (+60 days)
  120, // 8th review (+120 days)
  180, // 9th review (+180 days)
  365, // 10th review (+365 days)
];

// Calculate next review date based on review count
export function calculateNextReviewDate(
  reviewCount: number,
  lastReviewedDate: Date
): Date {
  // Cap review count at the max interval length
  const clampedReviewCount = Math.min(reviewCount, SRS_INTERVALS.length);

  // Get days to add (defaulting to the last interval if we're beyond the array)
  const daysToAdd =
    clampedReviewCount < SRS_INTERVALS.length
      ? SRS_INTERVALS[clampedReviewCount]
      : SRS_INTERVALS[SRS_INTERVALS.length - 1];

  // Clone the date to avoid mutations
  const nextDate = new Date(lastReviewedDate.getTime());
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return nextDate;
}

// Check if a bookmark is due for review
export function isDueForReview(nextReviewDate: Date): boolean {
  const now = new Date();
  return nextReviewDate <= now;
}

// Get the appropriate status for a bookmark based on its review schedule
export function getSRSStatus(
  reviewCount: number,
  nextReviewDate: Date
): string {
  if (isDueForReview(nextReviewDate)) {
    return "due";
  }

  if (reviewCount === 1) {
    return "new";
  }

  if (reviewCount >= SRS_INTERVALS.length) {
    return "mastered";
  }

  return "learning";
}

// Format the next review date for display
export function formatNextReviewDate(nextReviewDate: Date): string {
  const now = new Date();
  const diffTime = Math.abs(nextReviewDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isDueForReview(nextReviewDate)) {
    return "due now";
  }

  if (diffDays === 1) {
    return "tomorrow";
  }

  if (diffDays < 7) {
    return `in ${diffDays} days`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `in ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  }

  const months = Math.floor(diffDays / 30);
  return `in ${months} ${months === 1 ? "month" : "months"}`;
}
