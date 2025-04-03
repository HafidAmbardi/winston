"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "@/app/context/auth_context";
import {
  getUserDoc,
  getUserMaterials,
  getRecommendedMaterials,
  getUserQuizzes,
  getLatestFeedback,
} from "../firebase/firestore";
import type { ExerciseResult } from "@/app/components/grade_card";
import type { Material, MaterialStatus } from "@/app/components/materials_list";

// Define types for all our dashboard data
interface UserData {
  displayName: string;
  progress: number;
  totalSteps: number;
}

interface LeaderboardAchievement {
  value: number;
  percentage: number;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  score: number;
  avatar: string;
}

interface LeaderboardData {
  achievement: LeaderboardAchievement;
  users: LeaderboardUser[];
}

interface DonutSegment {
  color: string;
  value: number;
}

interface DonutData {
  percentage: number;
  segments: DonutSegment[];
  description: string;
}

interface GradeData {
  totalScore: number;
  results: ExerciseResult[];
}

interface Notification {
  id: string;
  title: string;
  timestamp: string;
  description: string;
}

interface FeedbackItem {
  title: string;
  content: string[];
}

interface FeedbackSection {
  title: string;
  items: FeedbackItem[];
}

interface FeedbackData {
  weaknesses: FeedbackSection;
  improvements: FeedbackSection;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
}

interface DashboardContextType {
  loading: boolean;
  userData: UserData | null;
  leaderboardData: LeaderboardData | null;
  donutData: DonutData | null;
  materialsData: Material[] | null;
  gradeData: GradeData | null;
  notificationData: Notification[] | null;
  feedbackData: FeedbackData | null;
  quizData: Quiz[] | null;
}

// Create the context
const DashboardContext = createContext<DashboardContextType>({
  loading: true,
  userData: null,
  leaderboardData: null,
  donutData: null,
  materialsData: null,
  gradeData: null,
  notificationData: null,
  feedbackData: null,
  quizData: null,
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);
  const [donutData, setDonutData] = useState<DonutData | null>(null);
  const [materialsData, setMaterialsData] = useState<Material[] | null>(null);
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [notificationData, setNotificationData] = useState<
    Notification[] | null
  >(null);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [quizData, setQuizData] = useState<Quiz[] | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const userId = user.uid;
    const unsubscribers: (() => void)[] = [];

    // User profile and progress
    const userUnsubscribe = onSnapshot(getUserDoc(userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserData({
          displayName: data.displayName || "User",
          progress: data.progress?.overallProgress || 0,
          totalSteps: data.progress?.totalSteps || 4,
        });
      }
    });
    unsubscribers.push(userUnsubscribe);

    // Leaderboard
    const leaderboardUnsubscribe = onSnapshot(getUserDoc(userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.achievements) {
          setLeaderboardData({
            achievement: {
              value: data.achievements.bestPercentage || 0,
              percentage: 100, // Max percentage
            },
            users:
              data.achievements.recentResults?.map(
                (
                  result: { date: { toDate: () => Date }; score: number },
                  index: number
                ) => ({
                  rank: index + 1,
                  name: new Date(result.date.toDate()).toLocaleDateString(),
                  score: result.score || 0,
                  avatar: "",
                })
              ) || [],
          });
        }
      }
    });
    unsubscribers.push(leaderboardUnsubscribe);

    // Smart Comparisons (Donut Chart)
    const donutUnsubscribe = onSnapshot(getUserDoc(userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.smartComparisons) {
          setDonutData({
            percentage: data.smartComparisons.currentPercentage || 0,
            segments: data.smartComparisons.segments || [
              { color: "#b37400", value: 2 },
              { color: "#d3d3d3", value: 1 },
              { color: "#f59e0b", value: 2 },
            ],
            description:
              data.smartComparisons.description ||
              "You've improved in problem-solving.",
          });
        }
      }
    });
    unsubscribers.push(donutUnsubscribe);

    // User Materials
    const materialsUnsubscribe = onSnapshot(
      getUserMaterials(userId),
      (snapshot) => {
        const materials: Material[] = [];
        snapshot.forEach((doc) => {
          const materialData = doc.data();
          materials.push({
            id: doc.id,
            title: materialData.title || "Material",
            status: (materialData.status || "on-hold") as MaterialStatus,
            imageSrc:
              materialData.image || "/placeholder.svg?height=128&width=128",
          });
        });
        setMaterialsData(materials);
      }
    );
    unsubscribers.push(materialsUnsubscribe);

    // Grade Card
    const gradeUnsubscribe = onSnapshot(getUserDoc(userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.practiceResults) {
          setGradeData({
            totalScore: data.practiceResults.totalScore || 0,
            results:
              data.practiceResults.results?.map(
                (result: {
                  id: string;
                  title: string;
                  timestamp: { toDate: () => Date };
                  score: number;
                  maxScore: number;
                  icon?: string;
                }) => ({
                  id: result.id,
                  title: result.title,
                  timestamp:
                    result.timestamp instanceof Date
                      ? result.timestamp.toLocaleString()
                      : new Date(result.timestamp.toDate()).toLocaleString(),
                  score: result.score.toString(),
                  maxScore: result.maxScore.toString(),
                  icon:
                    result.icon === "image" ||
                    result.icon === "calculator" ||
                    result.icon === "graduation"
                      ? result.icon
                      : "calculator",
                })
              ) || [],
          });
        }
      }
    });
    unsubscribers.push(gradeUnsubscribe);

    // Notifications (Recommendations)
    const notificationsUnsubscribe = onSnapshot(
      getRecommendedMaterials(userId),
      (snapshot) => {
        const notifications: Notification[] = [];
        snapshot.forEach((doc) => {
          const notificationData = doc.data();
          notifications.push({
            id: doc.id,
            title: notificationData.title,
            timestamp:
              notificationData.timestamp instanceof Date
                ? notificationData.timestamp.toLocaleString()
                : new Date(
                    notificationData.timestamp.toDate()
                  ).toLocaleString(),
            description: notificationData.description,
          });
        });
        setNotificationData(notifications);
      }
    );
    unsubscribers.push(notificationsUnsubscribe);

    // Feedback Report
    const feedbackUnsubscribe = onSnapshot(
      getLatestFeedback(userId),
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          setFeedbackData({
            weaknesses: {
              title: "Kekurangan",
              items: data.weaknesses || [],
            },
            improvements: {
              title: "Perbaikan",
              items: data.improvements || [],
            },
          });
        }
      }
    );
    unsubscribers.push(feedbackUnsubscribe);

    // Quizzes
    const quizzesUnsubscribe = onSnapshot(
      getUserQuizzes(userId),
      (snapshot) => {
        const quizzes: Quiz[] = [];
        snapshot.forEach((doc) => {
          const quizData = doc.data();
          quizzes.push({
            id: doc.id,
            title: quizData.title || "Quiz",
            description: `${quizData.numQuestions || 0} soal tersedia`,
          });
        });
        setQuizData(quizzes);
      }
    );
    unsubscribers.push(quizzesUnsubscribe);

    // Set loading to false after initial data fetch
    setTimeout(() => setLoading(false), 1000);

    // Cleanup function
    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [user]);

  return (
    <DashboardContext.Provider
      value={{
        loading,
        userData,
        leaderboardData,
        donutData,
        materialsData,
        gradeData,
        notificationData,
        feedbackData,
        quizData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
