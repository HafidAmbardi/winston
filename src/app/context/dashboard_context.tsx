"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onSnapshot, doc, getDoc, getDocs } from "firebase/firestore";
import { useAuth } from "@/app/context/auth_context";
// Import db from your firebase config file
import { db } from "@/app/firebase/config";

import {
  getUserDoc,
  getUserMaterials,
  getRecommendedMaterials,
  getUserQuizzes,
  getLatestFeedback,
} from "../firebase/firestore";
import type { ExerciseResult } from "@/app/components/grade_card";
import type { MaterialStatus } from "@/app/components/material_item";
import { Timestamp } from "firebase/firestore"; // Add this import

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
  content?: string[];
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

// Define types for Firebase document data structures
interface UserDocData {
  displayName?: string;
  progress?: {
    overallProgress?: number;
    totalSteps?: number;
  };
  achievements?: {
    totalPoints?: number;
    percentile?: number;
    history?: Array<{
      date: Timestamp | Date; // Use proper Timestamp type
      score: number;
    }>;
    recentResults?: Array<{
      date: Timestamp | Date; // Use proper Timestamp type
      score: number;
    }>;
  };
  smartComparisons?: {
    percentile?: number;
    currentPercentage?: number;
    description?: string;
    segments?: DonutSegment[];
  };
  practiceResults?: {
    totalScore?: number;
    results?: Array<{
      id?: string;
      title?: string;
      timestamp?: Timestamp; // Firestore timestamp
      score?: number | string;
      maxScore?: number | string;
      icon?: "image" | "calculator" | "graduation";
    }>;
  };
}

interface Material {
  id: string;
  title: string;
  status: MaterialStatus;
  imageSrc: string;
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
        const data = doc.data() as UserDocData;
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
        const data = doc.data() as UserDocData;
        console.log("Raw leaderboard data:", data?.achievements); // Debug log

        // Check if achievements data exists
        if (data?.achievements) {
          // Process achievement data
          const achievement = {
            value: data.achievements.totalPoints || 0,
            percentage: data.achievements.percentile || 0,
          };

          // Process leaderboard users data
          const users: LeaderboardUser[] = [];

          // If we have history data with scores
          if (Array.isArray(data.achievements.history)) {
            // Map history data to leaderboard format
            data.achievements.history.forEach((entry, index: number) => {
              if (entry && typeof entry === "object") {
                users.push({
                  rank: index + 1,
                  name:
                    entry.date instanceof Date
                      ? entry.date.toLocaleDateString()
                      : new Date(entry.date?.toDate()).toLocaleDateString(),
                  score: typeof entry.score === "number" ? entry.score : 0,
                  avatar: "",
                });
              }
            });
          }
          // Fallback to recent results if no history but we have results
          else if (Array.isArray(data.achievements.recentResults)) {
            data.achievements.recentResults.forEach((result, index: number) => {
              if (result && typeof result === "object") {
                users.push({
                  rank: index + 1,
                  name:
                    result.date instanceof Date
                      ? result.date.toLocaleDateString()
                      : new Date(result.date?.toDate()).toLocaleDateString(),
                  score: typeof result.score === "number" ? result.score : 0,
                  avatar: "",
                });
              }
            });
          }

          console.log("Processed leaderboard data:", { achievement, users }); // Debug log

          setLeaderboardData({
            achievement: achievement,
            users: users,
          });
        } else {
          // Set default values if no achievements data
          setLeaderboardData({
            achievement: { value: 0, percentage: 0 },
            users: [],
          });
        }
      } else {
        // Set default values if document doesn't exist
        setLeaderboardData({
          achievement: { value: 0, percentage: 0 },
          users: [],
        });
      }
    });
    unsubscribers.push(leaderboardUnsubscribe);

    // Smart Comparisons (Donut Chart)
    const donutUnsubscribe = onSnapshot(getUserDoc(userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as UserDocData;
        console.log("Raw smart comparisons data:", data?.smartComparisons); // Debug log

        // Default segments if none are provided or invalid
        const defaultSegments = [
          { color: "#b37400", value: 2 }, // Brown/gold
          { color: "#d3d3d3", value: 1 }, // Light gray
          { color: "#f59e0b", value: 2 }, // Orange/amber
        ];

        if (data?.smartComparisons) {
          // Process segments data
          let segments = defaultSegments;

          // Check if smartComparisons has a valid segments array
          if (
            Array.isArray(data.smartComparisons.segments) &&
            data.smartComparisons.segments.length > 0
          ) {
            // Filter out any invalid segments
            const validSegments = data.smartComparisons.segments.filter(
              (segment: DonutSegment) =>
                typeof segment === "object" &&
                segment !== null &&
                typeof segment.color === "string" &&
                typeof segment.value === "number" &&
                segment.value >= 0
            );

            if (validSegments.length > 0) {
              segments = validSegments;
            }
          }

          // Get the percentage value, ensure it's a valid number
          let percentage = 0;
          if (typeof data.smartComparisons.percentile === "number") {
            percentage = data.smartComparisons.percentile;
          } else if (
            typeof data.smartComparisons.currentPercentage === "number"
          ) {
            percentage = data.smartComparisons.currentPercentage;
          }

          // Get description with fallback
          const description =
            typeof data.smartComparisons.description === "string"
              ? data.smartComparisons.description
              : `You've achieved ${percentage}% of your learning goals.`;

          console.log("Processed donut chart data:", {
            percentage,
            segments,
            description,
          });

          setDonutData({
            percentage,
            segments,
            description,
          });
        } else {
          // Set default values if no smartComparisons data
          setDonutData({
            percentage: 0,
            segments: defaultSegments,
            description: "You haven't started tracking your progress yet.",
          });
        }
      } else {
        // Set default values if document doesn't exist
        setDonutData({
          percentage: 0,
          segments: [
            { color: "#b37400", value: 2 },
            { color: "#d3d3d3", value: 1 },
            { color: "#f59e0b", value: 2 },
          ],
          description: "No data available yet.",
        });
      }
    });
    unsubscribers.push(donutUnsubscribe);

    // User Materials
    const materialsUnsubscribe = onSnapshot(
      getRecommendedMaterials(userId),
      async (snapshot) => {
        try {
          const recommendationDocs = snapshot.docs;

          // Exit early if no recommendations
          if (recommendationDocs.length === 0) {
            setMaterialsData([]);
            return;
          }

          // 1. Extract material IDs from recommendations
          const materialIds = recommendationDocs
            .map((doc) => {
              const data = doc.data();
              return data.materialId; // Each recommendation has a materialId field
            })
            .filter(Boolean); // Filter out any undefined IDs

          // Exit if no valid material IDs
          if (materialIds.length === 0) {
            setMaterialsData([]);
            return;
          }

          // 2. Get user materials collection for progress info
          const userMaterialsSnapshot = await getDocs(getUserMaterials(userId));
          const userMaterialsMap = new Map();

          // Create a map of user's material progress
          userMaterialsSnapshot.forEach((doc) => {
            const data = doc.data();
            userMaterialsMap.set(doc.id, {
              status: data.status || "not_started",
              progress: data.progress || 0,
            });
          });

          // 3. Fetch global materials by IDs
          const materialPromises = materialIds.map(async (id) => {
            // Try to fetch from different collections
            const collections = [
              "materials",
              "detailed_materials",
              "aggregated_materials",
              "readings",
            ];

            for (const collectionName of collections) {
              const docRef = doc(db, collectionName, id);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                const globalData = docSnap.data();

                // Get user's progress status for this material
                const userProgress = userMaterialsMap.get(id) || {
                  status: "not_started",
                  progress: 0,
                };

                return {
                  id: docSnap.id,
                  title: globalData.title || "Untitled Material",
                  // Use image_path from global data
                  imageSrc:
                    globalData.image_path ||
                    "/placeholder.svg?height=128&width=128",
                  // Use status from user data (or default to not_started)
                  status: userProgress.status as MaterialStatus,
                };
              }
            }

            // Material not found in any collection
            return null;
          });

          // Wait for all material fetches to complete
          const resolvedMaterials = await Promise.all(materialPromises);

          // Filter out any null results and set the data
          setMaterialsData(resolvedMaterials.filter(Boolean) as Material[]);
        } catch (error) {
          console.error("Error fetching materials:", error);
          setMaterialsData([]);
        }
      }
    );
    unsubscribers.push(materialsUnsubscribe);

    // Grade Card
    const gradeUnsubscribe = onSnapshot(getUserDoc(userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as UserDocData;
        console.log("Raw practice results data:", data?.practiceResults); // Debug log

        if (data?.practiceResults) {
          // Extract total score with validation
          const totalScore =
            typeof data.practiceResults.totalScore === "number"
              ? data.practiceResults.totalScore
              : 0;

          // Process results array
          const results: ExerciseResult[] = [];

          // Process the results array if it exists
          if (Array.isArray(data.practiceResults.results)) {
            data.practiceResults.results.forEach((result) => {
              if (result && typeof result === "object") {
                // Validate and normalize result data
                const processedResult: ExerciseResult = {
                  id:
                    result.id ||
                    `result-${Math.random().toString(36).substr(2, 9)}`,
                  title: result.title || "Untitled Exercise",
                  timestamp:
                    result.timestamp instanceof Date
                      ? result.timestamp.toLocaleString()
                      : result.timestamp && result.timestamp.toDate
                      ? new Date(result.timestamp.toDate()).toLocaleString()
                      : new Date().toLocaleString(),
                  score:
                    typeof result.score === "number"
                      ? result.score.toString()
                      : String(result.score || 0),
                  maxScore:
                    typeof result.maxScore === "number" ||
                    typeof result.maxScore === "string"
                      ? result.maxScore.toString()
                      : "100",
                  icon:
                    result.icon === "image" ||
                    result.icon === "calculator" ||
                    result.icon === "graduation"
                      ? result.icon
                      : "calculator",
                };

                results.push(processedResult);
              }
            });
          }

          console.log("Processed grade data:", { totalScore, results }); // Debug log

          setGradeData({
            totalScore,
            results,
          });
        } else {
          // Set default values if no practice results data
          setGradeData({
            totalScore: 0,
            results: [],
          });
        }
      } else {
        // Set default values if document doesn't exist
        setGradeData({
          totalScore: 0,
          results: [],
        });
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
            title: notificationData.title || "New Notification",
            timestamp:
              notificationData.timestamp instanceof Date
                ? notificationData.timestamp.toLocaleString()
                : new Date(
                    notificationData.timestamp?.toDate?.() || Date.now()
                  ).toLocaleString(),
            description: notificationData.description || "",
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

          console.log("Raw feedback data:", data); // Debug log

          // Create a properly structured feedback object
          const feedbackObj: FeedbackData = {
            weaknesses: {
              title: data.weaknesses?.title || "Kekurangan",
              items: Array.isArray(data.weaknesses?.items)
                ? data.weaknesses.items
                : [],
            },
            improvements: {
              title: data.improvements?.title || "Perbaikan",
              items: Array.isArray(data.improvements?.items)
                ? data.improvements.items
                : [],
            },
          };

          console.log("Processed feedback data:", feedbackObj); // Debug log
          setFeedbackData(feedbackObj);
        } else {
          // Set default empty feedback structure when no feedback exists
          setFeedbackData({
            weaknesses: {
              title: "Kekurangan",
              items: [],
            },
            improvements: {
              title: "Perbaikan",
              items: [],
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
