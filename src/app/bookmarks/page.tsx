"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useAuth } from "@/app/context/auth_context";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import RegularCourseMaterial from "@/app/components/regular_course_material";
import AudioButton from "@/app/components/audio_button";
import TextButton from "@/app/components/text_button";
import StudyPlanButton from "@/app/components/study_plan_button";
import FlashCardMath from "@/app/components/flashcards_math";
import MaterialSection from "@/app/components/material_section";
import BookmarkReviewBanner from "@/app/components/bookmark_review_banner";
import { isDueForReview, getSRSStatus } from "@/app/utils/srs_utils";

interface BookmarkedItem {
  id: string;
  type: string;
  title: string;
  materialType?: string;
  parentTitle?: string;
  summaryPoints?: string[];
  detailedExplanation?: string;
  createdAt: Date;
  // SRS specific fields
  reviewCount: number;
  lastReviewedDate: Date;
  nextReviewDate: Date;
  srsStatus: string;
}

export default function BookmarksPage() {
  const { user } = useAuth();
  const [activeOption, setActiveOption] = useState<
    "audio" | "text" | "study" | null
  >(null);
  const [activeContent, setActiveContent] = useState<
    "materi" | "flashcard" | "winston"
  >("materi");
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const bookmarksRef = collection(db, `users/${user.uid}/bookmarks`);
        const q = query(bookmarksRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedBookmarks: BookmarkedItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Process dates
          const createdAt = data.createdAt?.toDate() || new Date();
          const lastReviewedDate = data.lastReviewedDate?.toDate() || createdAt;
          const nextReviewDate =
            data.nextReviewDate?.toDate() ||
            new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

          // Check if this item is due for review and update its status
          const currentSRSStatus = getSRSStatus(
            data.reviewCount || 1,
            nextReviewDate
          );

          // If status has changed, update it in Firestore
          if (currentSRSStatus !== data.srsStatus) {
            updateDoc(doc.ref, { srsStatus: currentSRSStatus });
          }

          fetchedBookmarks.push({
            id: doc.id,
            type: data.type || "unknown",
            title: data.title || "Untitled Bookmark",
            materialType: data.materialType,
            parentTitle: data.parentTitle,
            summaryPoints: data.summaryPoints || [],
            detailedExplanation: data.detailedExplanation || "",
            createdAt,
            // SRS fields
            reviewCount: data.reviewCount || 1,
            lastReviewedDate,
            nextReviewDate,
            srsStatus: currentSRSStatus,
          });
        });

        setBookmarks(fetchedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, refreshTrigger]);

  // Handle review complete
  const handleReviewComplete = () => {
    // Trigger a refresh of the bookmarks
    setRefreshTrigger((prev) => prev + 1);
  };

  // Sort bookmarks: due first, then by next review date
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    // Due items come first
    if (a.srsStatus === "due" && b.srsStatus !== "due") return -1;
    if (a.srsStatus !== "due" && b.srsStatus === "due") return 1;

    // Then sort by next review date (ascending)
    return a.nextReviewDate.getTime() - b.nextReviewDate.getTime();
  });

  // Filter bookmarks based on active content type
  const filteredBookmarks = sortedBookmarks.filter((bookmark) => {
    if (activeContent === "materi") return bookmark.type === "material";
    if (activeContent === "flashcard") return bookmark.type === "flashcard";
    if (activeContent === "winston") return bookmark.type === "winston";
    return true;
  });

  // Handle audio selection
  const handleAudioSelect = () => {
    setActiveOption(activeOption === "audio" ? null : "audio");
  };

  // Handle text selection
  const handleTextSelect = () => {
    setActiveOption(activeOption === "text" ? null : "text");
  };

  // Handle study plan selection
  const handleStudyPlanSelect = () => {
    setActiveOption(activeOption === "study" ? null : "study");
  };

  // Handle read full text
  const handleReadFullText = (id: string) => {
    console.log(`Reading full text for course ${id}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Main Content with Sidebar Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="lg:w-2/3">
                {/* Title */}
                <h1 className="text-2xl font-bold mb-1">Bookmarks</h1>
                <p className="text-gray-600 mb-4">
                  Kumpulan materi yang telah kamu simpan
                </p>

                {/* Content Type Selector */}
                <div className="mb-6 bg-gray-100 p-1 rounded-lg inline-flex">
                  <button
                    onClick={() => setActiveContent("materi")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeContent === "materi"
                        ? "bg-[#A36800] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Materi
                  </button>
                  <button
                    onClick={() => setActiveContent("flashcard")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeContent === "flashcard"
                        ? "bg-[#A36800] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Flashcard
                  </button>
                  <button
                    onClick={() => setActiveContent("winston")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeContent === "winston"
                        ? "bg-[#A36800] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Winston
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <AudioButton
                    isActive={activeOption === "audio"}
                    onClick={handleAudioSelect}
                  />

                  <TextButton
                    isActive={activeOption === "text"}
                    onClick={handleTextSelect}
                  />

                  <StudyPlanButton
                    isActive={activeOption === "study"}
                    onClick={handleStudyPlanSelect}
                  />
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="p-6 text-center">
                    <div className="animate-pulse bg-gray-200 h-16 w-full mb-4 rounded"></div>
                    <div className="animate-pulse bg-gray-200 h-16 w-full mb-4 rounded"></div>
                    <div className="animate-pulse bg-gray-200 h-16 w-full mb-4 rounded"></div>
                  </div>
                )}

                {/* Empty State */}
                {!loading && filteredBookmarks.length === 0 && (
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700">
                      Tidak ada bookmark
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Kamu belum menyimpan{" "}
                      {activeContent === "materi"
                        ? "materi"
                        : activeContent === "flashcard"
                        ? "flashcard"
                        : "percakapan"}{" "}
                      apapun
                    </p>
                  </div>
                )}

                {/* Due for Review Count */}
                {!loading && filteredBookmarks.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium">Your Review Queue</h2>
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {
                          filteredBookmarks.filter((b) => b.srsStatus === "due")
                            .length
                        }{" "}
                        due today
                      </span>
                    </div>
                  </div>
                )}

                {/* Display content based on selected type */}
                {activeContent === "materi" && !loading && (
                  <div className="space-y-8">
                    {filteredBookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="bg-white rounded-lg shadow p-6"
                      >
                        {/* SRS Review Banner - show if due for review */}
                        <BookmarkReviewBanner
                          bookmarkId={bookmark.id}
                          reviewCount={bookmark.reviewCount}
                          lastReviewedDate={bookmark.lastReviewedDate}
                          nextReviewDate={bookmark.nextReviewDate}
                          srsStatus={bookmark.srsStatus}
                          onReviewComplete={handleReviewComplete}
                        />

                        {bookmark.parentTitle && (
                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {bookmark.parentTitle}
                            </span>
                          </div>
                        )}
                        <h3 className="text-lg font-medium mb-2">
                          {bookmark.title}
                        </h3>

                        <MaterialSection
                          id={bookmark.id}
                          summaryPoints={bookmark.summaryPoints || []}
                          detailedExplanation={
                            bookmark.detailedExplanation || ""
                          }
                          parentTitle={bookmark.parentTitle}
                          materialType={bookmark.materialType}
                        />

                        <div className="mt-2 text-xs text-gray-500">
                          Disimpan pada:{" "}
                          {bookmark.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeContent === "flashcard" && (
                  <div className="mb-8">
                    {filteredBookmarks.length === 0 ? (
                      <p>Tidak ada flashcard yang disimpan</p>
                    ) : (
                      filteredBookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="mb-4">
                          {/* SRS Review Banner - show if due for review */}
                          <BookmarkReviewBanner
                            bookmarkId={bookmark.id}
                            reviewCount={bookmark.reviewCount}
                            lastReviewedDate={bookmark.lastReviewedDate}
                            nextReviewDate={bookmark.nextReviewDate}
                            srsStatus={bookmark.srsStatus}
                            onReviewComplete={handleReviewComplete}
                          />

                          <FlashCardMath
                            questionNumber={bookmark.id}
                            marks={5}
                            question={bookmark.title}
                            latexExpression={bookmark.detailedExplanation || ""}
                          />
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeContent === "winston" && (
                  <div className="space-y-4">
                    {filteredBookmarks.length === 0 ? (
                      <p>Tidak ada percakapan Winston yang disimpan</p>
                    ) : (
                      filteredBookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="bg-gray-50 rounded-lg p-4 mb-4"
                        >
                          {/* SRS Review Banner - show if due for review */}
                          <BookmarkReviewBanner
                            bookmarkId={bookmark.id}
                            reviewCount={bookmark.reviewCount}
                            lastReviewedDate={bookmark.lastReviewedDate}
                            nextReviewDate={bookmark.nextReviewDate}
                            srsStatus={bookmark.srsStatus}
                            onReviewComplete={handleReviewComplete}
                          />

                          <h3 className="font-medium">{bookmark.title}</h3>
                          <p className="mt-2 text-gray-700">
                            {bookmark.detailedExplanation}
                          </p>
                          <div className="mt-2 text-xs text-gray-500">
                            Disimpan pada:{" "}
                            {bookmark.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* SRS Statistics Card */}
                {!loading && bookmarks.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-medium mb-2">
                      Review Statistics
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due today:</span>
                        <span className="font-medium">
                          {
                            bookmarks.filter((b) => b.srsStatus === "due")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">New:</span>
                        <span className="font-medium">
                          {
                            bookmarks.filter((b) => b.srsStatus === "new")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Learning:</span>
                        <span className="font-medium">
                          {
                            bookmarks.filter((b) => b.srsStatus === "learning")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mastered:</span>
                        <span className="font-medium">
                          {
                            bookmarks.filter((b) => b.srsStatus === "mastered")
                              .length
                          }
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Total bookmarks:
                          </span>
                          <span className="font-medium">
                            {bookmarks.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Rekomendasi materi</h2>

                  <RegularCourseMaterial
                    id="integral-dasar"
                    title="Latihan Integral Dasar"
                    imageSrc="/learn.jpeg"
                    onReadFullText={handleReadFullText}
                    onAudioSelect={handleAudioSelect}
                    onTextSelect={handleTextSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
