"use client";

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

const userName = "Rafael Pereira"; // Sample user name
export default function Dashboard() {
  // Sample data for components

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <WinstonSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <WinstonHeader userName={userName} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Selamat datang, {userName}!</h1>
            <p className="text-gray-600">
              Teruslah Berjuang! Berikut Hasil dan Hal yang Harus Anda Tinjau
              Selanjutnya!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <ProgressBar percentage={40} totalSteps={4} showPercentage={true} />
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <div className="bg-white rounded-xl shadow-sm">
                <Leaderboard
                  title="Pencapaian Terbaikmu"
                  achievement={{
                    value: 99.5,
                    percentage: 100,
                  }}
                  users={[
                    { rank: 1, name: "23 Maret 2023", score: 90, avatar: "" },
                    { rank: 1, name: "23 Maret 2023", score: 90, avatar: "" },
                    { rank: 1, name: "23 Maret 2023", score: 90, avatar: "" },
                    { rank: 1, name: "23 Maret 2023", score: 90, avatar: "" },
                    { rank: 1, name: "23 Maret 2023", score: 90, avatar: "" },
                  ]}
                />
              </div>

              {/* Notification Feed */}
              <div className="bg-white rounded-xl shadow-sm">
                <NotificationFeed
                  title="Rekomendasi Materi"
                  notifications={[
                    {
                      id: "1",
                      title: "Belajar Matematika Dasar",
                      timestamp: "22 DEC 7:20 PM",
                      description:
                        "People care about how you see the world, how you think,",
                    },
                    {
                      id: "2",
                      title: "Belajar Matematika Dasar",
                      timestamp: "22 DEC 7:20 PM",
                      description:
                        "People care about how you see the world, how you think,",
                    },
                    {
                      id: "3",
                      title: "Belajar Matematika Dasar",
                      timestamp: "22 DEC 7:20 PM",
                      description:
                        "People care about how you see the world, how you think,",
                    },
                    {
                      id: "4",
                      title: "Belajar Matematika Dasar",
                      timestamp: "22 DEC 7:20 PM",
                      description:
                        "People care about how you see the world, how you think,",
                    },
                    {
                      id: "5",
                      title: "Belajar Matematika Dasar",
                      timestamp: "22 DEC 7:20 PM",
                      description:
                        "People care about how you see the world, how you think,",
                    },
                    {
                      id: "6",
                      title: "Belajar Matematika Dasar",
                      timestamp: "22 DEC 7:20 PM",
                      description:
                        "People care about how you see the world, how you think,",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              {/* Donut Chart */}
              <div className="bg-white rounded-xl shadow-sm">
                <DonutChart
                  title="Smart Comparisons"
                  percentage={20}
                  segments={[
                    { color: "#b37400", value: 2 }, // Brown/gold
                    { color: "#d3d3d3", value: 1 }, // Light gray
                    { color: "#f59e0b", value: 2 }, // Orange/amber
                  ]}
                  description="You've improved 20% in problem-solving this month."
                />
              </div>

              {/* Grade Card */}
              <div className="bg-white rounded-xl shadow-sm">
                <GradeCard
                  title="Nilai Hasil Latihanmu!"
                  totalScore={90.5}
                  results={[
                    {
                      id: "1",
                      title: "Latihan Integral",
                      timestamp: "Today, 16:36",
                      score: "80.5",
                      maxScore: "100",
                      icon: "calculator",
                    },
                    {
                      id: "2",
                      title: "Deskripsi Gambar",
                      timestamp: "23 Jun, 13:06",
                      score: "70",
                      maxScore: "100",
                      icon: "image",
                    },
                    {
                      id: "3",
                      title: "Pemecahan Masalah",
                      timestamp: "21 Jun, 19:04",
                      score: "16",
                      maxScore: "24",
                      icon: "graduation",
                    },
                  ]}
                />
              </div>

              {/* Feedback Report */}
              <div className="bg-white rounded-xl shadow-sm">
                <FeedbackReport
                  weaknesses={{
                    title: "Kekurangan",
                    items: [
                      {
                        title: "Gagasan Utama",
                        content: [],
                      },
                      {
                        title: "Detail",
                        content: [
                          "Mispronouncing key sounds may make certain words harder to understand.",
                          "A strong accent or unclear enunciation can sometimes reduce clarity.",
                          "A flat or monotonous tone may make your speech sound less natural.",
                        ],
                      },
                    ],
                  }}
                  improvements={{
                    title: "Perbaikan",
                    items: [
                      {
                        title: "Pilihan kata dan variasi kalimat",
                        content: [],
                      },
                      {
                        title: "Tanda Baca & Spasi",
                        content: [
                          "Mispronouncing key sounds may make certain words harder to understand.",
                          "A strong accent or unclear enunciation can sometimes reduce clarity.",
                          "A flat or monotonous tone may make your speech sound less natural.",
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Materials List */}
              <div className="bg-white rounded-xl shadow-sm">
                <MaterialsList
                  materials={[
                    {
                      id: "1",
                      title: "Bilangan & Operasi Dasar",
                      status: "completed",
                      imageSrc: "/placeholder.svg?height=128&width=128",
                    },
                    {
                      id: "2",
                      title: "Bilangan & Operasi Dasar",
                      status: "in-progress",
                      imageSrc: "/placeholder.svg?height=128&width=128",
                    },
                    {
                      id: "3",
                      title: "Bilangan & Operasi Dasar",
                      status: "on-hold",
                      imageSrc: "/placeholder.svg?height=128&width=128",
                    },
                    {
                      id: "4",
                      title: "Bilangan & Operasi Dasar",
                      status: "on-hold",
                      imageSrc: "/placeholder.svg?height=128&width=128",
                    },
                  ]}
                />
              </div>

              {/* Quiz List */}
              <div className="bg-white rounded-xl shadow-sm">
                <QuizList
                  title="Uji Pengetahuan dan Kemampuanmu!"
                  quizzes={[
                    {
                      id: "1",
                      title: "Quiz A",
                      description: "50 soal tersedia",
                    },
                    {
                      id: "2",
                      title: "Quiz A",
                      description: "50 soal tersedia",
                    },
                    {
                      id: "3",
                      title: "Quiz A",
                      description: "50 soal tersedia",
                    },
                    {
                      id: "4",
                      title: "Quiz A",
                      description: "50 soal tersedia",
                    },
                    {
                      id: "5",
                      title: "Quiz A",
                      description: "50 soal tersedia",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
