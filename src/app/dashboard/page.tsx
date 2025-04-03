"use client";
import { useAuth } from "@/app/context/auth_context";
import { useDashboard } from "@/app/context/dashboard_context";
import WinstonSidebar from "@/app/components/sidebar";
import WinstonHeader from "@/app/components/header";
import ProgressBar from "@/app/components/progress_bar";
import Leaderboard from "@/app/components/leaderboard";
import DonutChart from "@/app/components/donut_chart";
import NotificationFeed from "@/app/components/notification_feed";
import GradeCard from "@/app/components/grade_card";
import QuizList from "@/app/components/quiz";
import FeedbackReport from "@/app/components/feedback_report";
import MaterialsList from "@/app/components/materials_list";
import { Home } from "lucide-react";
import { Skeleton } from "@/app/components/ui/skeleton";
// Import the types we need to match
import type { ExerciseResult } from "@/app/components/grade_card";
import type { Material, MaterialStatus } from "@/app/components/materials_list";

export default function Dashboard() {
  const { user } = useAuth();
  const {
    loading,
    userData,
    leaderboardData,
    donutData,
    materialsData,
    gradeData,
    notificationData,
    feedbackData,
    quizData,
  } = useDashboard();

  if (!user) {
    // Redirect to login if user is not authenticated
    // This could be handled with middleware
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
    return null;
  }

  // Create a type-safe version of gradeData.results
  const safeGradeResults: ExerciseResult[] =
    gradeData?.results?.map((result) => ({
      ...result,
      // Ensure icon is one of the allowed values
      icon:
        result.icon === "image" ||
        result.icon === "calculator" ||
        result.icon === "graduation"
          ? result.icon
          : "calculator", // Default fallback
    })) || [];

  // Create a type-safe version of materialsData
  const safeMaterialsData: Material[] =
    materialsData?.map((material) => ({
      ...material,
      // Ensure status is of the correct type
      status: material.status as MaterialStatus,
    })) || [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader userName={userData?.displayName || "User"} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Selamat datang, {userData?.displayName || "User"}!
            </h1>
            <p className="text-gray-600">
              Teruslah Berjuang! Berikut Hasil dan Hal yang Harus Anda Tinjau
              Selanjutnya!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            {loading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <ProgressBar
                percentage={userData?.progress || 0}
                totalSteps={userData?.totalSteps || 4}
                showPercentage={true}
              />
            )}
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <div className="bg-white rounded-xl shadow-sm">
                {loading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <Leaderboard
                    title="Pencapaian Terbaikmu"
                    achievement={
                      leaderboardData?.achievement || {
                        value: 0,
                        percentage: 0,
                      }
                    }
                    users={leaderboardData?.users || []}
                  />
                )}
              </div>

              {/* Notification Feed */}
              <div className="bg-white rounded-xl shadow-sm">
                {loading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <NotificationFeed
                    title="Rekomendasi Materi"
                    notifications={notificationData || []}
                  />
                )}
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              {/* Donut Chart */}
              <div className="bg-white rounded-xl shadow-sm">
                {loading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <DonutChart
                    title="Smart Comparisons"
                    percentage={donutData?.percentage || 0}
                    segments={donutData?.segments || []}
                    description={donutData?.description || ""}
                  />
                )}
              </div>

              {/* Grade Card */}
              <div className="bg-white rounded-xl shadow-sm">
                {loading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <GradeCard
                    title="Nilai Hasil Latihanmu!"
                    totalScore={gradeData?.totalScore || 0}
                    results={safeGradeResults}
                  />
                )}
              </div>

              {/* Feedback Report */}
              <div className="bg-white rounded-xl shadow-sm">
                {loading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <FeedbackReport
                    weaknesses={
                      feedbackData?.weaknesses || {
                        title: "Kekurangan",
                        items: [],
                      }
                    }
                    improvements={
                      feedbackData?.improvements || {
                        title: "Perbaikan",
                        items: [],
                      }
                    }
                  />
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Materials List */}
              <div className="bg-white rounded-xl shadow-sm">
                {loading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <MaterialsList materials={safeMaterialsData} />
                )}
              </div>

              {/* Quiz List */}
              <div className="bg-white rounded-xl shadow-sm">
                {loading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <QuizList
                    title="Uji Pengetahuan dan Kemampuanmu!"
                    quizzes={quizData || []}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
