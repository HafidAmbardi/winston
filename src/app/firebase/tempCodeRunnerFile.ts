import { doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "./firestore";

// Helper to generate a timestamp for a specific number of days ago
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Function to generate dummy data for a specific user
export async function seedUserData(userId: string) {
  try {
    const batch = writeBatch(db);

    // User profile and progress data
    const userRef = doc(db, "users", userId);
    batch.set(userRef, {
      displayName: "Rafael Pereira",
      email: "rafael.pereira@example.com",
      photoURL: "/avatar.webp",
      createdAt: serverTimestamp(),
      progress: {
        completedMaterials: 2,
        totalMaterials: 5,
        completedQuizzes: 3,
        totalQuizzes: 6,
        overallProgress: 40,
        totalSteps: 4,
      },
    });

    // Achievements data
    batch.set(
      doc(db, "users", userId),
      {
        achievements: {
          bestPercentage: 99.5,
          recentResults: [
            { date: daysAgo(7), score: 90, quizId: "quiz1" },
            { date: daysAgo(14), score: 85, quizId: "quiz2" },
            { date: daysAgo(21), score: 92, quizId: "quiz3" },
            { date: daysAgo(28), score: 88, quizId: "quiz4" },
            { date: daysAgo(35), score: 95, quizId: "quiz5" },
          ],
        },
      },
      { merge: true }
    );

    // Smart comparisons data
    batch.set(
      doc(db, "users", userId),
      {
        smartComparisons: {
          currentPercentage: 20,
          segments: [
            { color: "#b37400", value: 2 },
            { color: "#d3d3d3", value: 1 },
            { color: "#f59e0b", value: 2 },
          ],
          description: "You've improved 20% in problem-solving this month.",
          comparedTo: "lastMonth",
        },
      },
      { merge: true }
    );

    // Practice results data
    batch.set(
      doc(db, "users", userId),
      {
        practiceResults: {
          totalScore: 90.5,
          results: [
            {
              id: "result1",
              title: "Latihan Integral",
              timestamp: daysAgo(0),
              score: 80.5,
              maxScore: 100,
              icon: "calculator",
              materialId: "material1",
            },
            {
              id: "result2",
              title: "Deskripsi Gambar",
              timestamp: daysAgo(7),
              score: 70,
              maxScore: 100,
              icon: "image",
              materialId: "material2",
            },
            {
              id: "result3",
              title: "Pemecahan Masalah",
              timestamp: daysAgo(9),
              score: 16,
              maxScore: 24,
              icon: "graduation",
              materialId: "material3",
            },
          ],
        },
      },
      { merge: true }
    );

    // User materials data
    const materials = [
      {
        id: "material1",
        title: "Bilangan & Operasi Dasar",
        status: "completed",
        image: "/placeholder.svg?height=128&width=128",
        startedAt: daysAgo(30),
        completedAt: daysAgo(25),
        lastAccessedAt: daysAgo(25),
        progress: 100,
      },
      {
        id: "material2",
        title: "Pecahan & Desimal",
        status: "in-progress",
        image: "/placeholder.svg?height=128&width=128",
        startedAt: daysAgo(20),
        completedAt: null,
        lastAccessedAt: daysAgo(2),
        progress: 60,
      },
      {
        id: "material3",
        title: "Aljabar Dasar",
        status: "on-hold",
        image: "/placeholder.svg?height=128&width=128",
        startedAt: daysAgo(15),
        completedAt: null,
        lastAccessedAt: daysAgo(10),
        progress: 30,
      },
      {
        id: "material4",
        title: "Geometri Dimensi Dua",
        status: "on-hold",
        image: "/placeholder.svg?height=128&width=128",
        startedAt: daysAgo(10),
        completedAt: null,
        lastAccessedAt: daysAgo(5),
        progress: 15,
      },
    ];

    // Add materials to user's collection
    materials.forEach((material) => {
      batch.set(
        doc(db, "users", userId, "userMaterials", material.id),
        material
      );
    });

    // Recommended materials
    const recommendations = [
      {
        id: "rec1",
        title: "Belajar Matematika Dasar",
        timestamp: daysAgo(1),
        description: "People care about how you see the world, how you think",
        priority: 1,
      },
      {
        id: "rec2",
        title: "Belajar Matematika Lanjutan",
        timestamp: daysAgo(2),
        description: "People care about how you see the world, how you think",
        priority: 2,
      },
      {
        id: "rec3",
        title: "Pemrograman Algoritma Dasar",
        timestamp: daysAgo(3),
        description: "People care about how you see the world, how you think",
        priority: 3,
      },
      {
        id: "rec4",
        title: "Pengantar Statistika",
        timestamp: daysAgo(4),
        description: "People care about how you see the world, how you think",
        priority: 4,
      },
      {
        id: "rec5",
        title: "Kalkulus Integral",
        timestamp: daysAgo(5),
        description: "People care about how you see the world, how you think",
        priority: 5,
      },
      {
        id: "rec6",
        title: "Geometri Analitik",
        timestamp: daysAgo(6),
        description: "People care about how you see the world, how you think",
        priority: 6,
      },
    ];

    // Add recommendations to user's collection
    recommendations.forEach((recommendation) => {
      batch.set(
        doc(db, "users", userId, "recommendations", recommendation.id),
        recommendation
      );
    });

    // Feedback reports
    const feedbackReport = {
      createdAt: serverTimestamp(),
      quizId: "quiz1",
      weaknesses: [
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
      improvements: [
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
    };

    batch.set(
      doc(db, "users", userId, "feedbackReports", "report1"),
      feedbackReport
    );

    // User quizzes
    const quizzes = [
      {
        id: "quiz1",
        title: "Quiz Bilangan",
        numQuestions: 50,
        bestScore: 90,
        attempts: [
          {
            attemptId: "a1",
            date: daysAgo(20),
            score: 85,
            totalQuestions: 50,
            correctAnswers: 42,
          },
          {
            attemptId: "a2",
            date: daysAgo(10),
            score: 90,
            totalQuestions: 50,
            correctAnswers: 45,
          },
        ],
        lastAttemptAt: daysAgo(10),
      },
      {
        id: "quiz2",
        title: "Quiz Pecahan",
        numQuestions: 40,
        bestScore: 85,
        attempts: [
          {
            attemptId: "a3",
            date: daysAgo(15),
            score: 85,
            totalQuestions: 40,
            correctAnswers: 34,
          },
        ],
        lastAttemptAt: daysAgo(15),
      },
      {
        id: "quiz3",
        title: "Quiz Aljabar",
        numQuestions: 45,
        bestScore: 78,
        attempts: [
          {
            attemptId: "a4",
            date: daysAgo(12),
            score: 78,
            totalQuestions: 45,
            correctAnswers: 35,
          },
        ],
        lastAttemptAt: daysAgo(12),
      },
      {
        id: "quiz4",
        title: "Quiz Geometri",
        numQuestions: 30,
        bestScore: 92,
        attempts: [
          {
            attemptId: "a5",
            date: daysAgo(8),
            score: 92,
            totalQuestions: 30,
            correctAnswers: 28,
          },
        ],
        lastAttemptAt: daysAgo(8),
      },
      {
        id: "quiz5",
        title: "Quiz Trigonometri",
        numQuestions: 35,
        bestScore: 88,
        attempts: [
          {
            attemptId: "a6",
            date: daysAgo(5),
            score: 88,
            totalQuestions: 35,
            correctAnswers: 31,
          },
        ],
        lastAttemptAt: daysAgo(5),
      },
    ];

    // Add quizzes to user's collection
    quizzes.forEach((quiz) => {
      batch.set(doc(db, "users", userId, "userQuizzes", quiz.id), quiz);
    });

    // Commit all the batch operations
    await batch.commit();

    console.log("Dummy data created successfully for user:", userId);
    return true;
  } catch (error) {
    console.error("Error creating dummy data:", error);
    return false;
  }
}

// Function to initialize a seed button that admin can use
export function initSeedDataButton() {
  // This function could be used to add a seed button to an admin page
  const seedButton = document.createElement("button");
  seedButton.textContent = "Seed Test Data";
  seedButton.onclick = async () => {
    const userId = prompt("Enter user ID to seed data for:");
    if (userId) {
      const success = await seedUserData(userId);
      alert(success ? "Data seeded successfully!" : "Failed to seed data");
    }
  };
  document.body.appendChild(seedButton);
}
