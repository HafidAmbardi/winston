import { doc, writeBatch, collection, Timestamp } from "firebase/firestore";
import { db } from "./firestore";
import { auth } from "./config";
import { setDoc } from "firebase/firestore";

// Helper to generate a timestamp for a specific number of days ago
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return Timestamp.fromDate(date);
};

// Function to seed content collections (materials, quizzes, etc.)
export async function seedContentData() {
  try {
    const batch = writeBatch(db);
    // Update your seed data to include materials for all three categories

    // For mathematics
    const mathematicsMaterials = [
      {
        id: "aggr1",
        category: "mathematics",
        difficulty: "beginner",
        title: "Paket Dasar Matematika",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 39.99,
        materials: ["detailed1", "detailed2"],
      },
      {
        id: "aggr2",
        category: "mathematics",
        difficulty: "intermediate",
        title: "Paket Matematika Lanjutan",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 59.99,
        materials: ["detailed2", "detailed3"],
      },
      {
        id: "aggr3",
        category: "mathematics",
        difficulty: "advanced",
        title: "Matematika Tingkat Tinggi",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 79.99,
        materials: ["detailed3", "detailed4"],
      },
    ];

    // For reading
    const readingMaterials = [
      {
        id: "reading1",
        category: "reading",
        difficulty: "beginner",
        title: "Dasar-Dasar Membaca Efektif",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 29.99,
        materials: ["detailed_reading1", "detailed_reading2"],
      },
      {
        id: "reading2",
        category: "reading",
        difficulty: "intermediate",
        title: "Teknik Membaca Cepat",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 49.99,
        materials: ["detailed_reading3"],
      },
    ];

    // For writing
    const writingMaterials = [
      {
        id: "writing1",
        category: "writing",
        difficulty: "beginner",
        title: "Pengantar Menulis Kreatif",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 34.99,
        materials: ["detailed_writing1"],
      },
      {
        id: "writing2",
        category: "writing",
        difficulty: "intermediate",
        title: "Teknik Menulis Artikel Ilmiah",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 54.99,
        materials: ["detailed_writing2"],
      },
    ];

    // Combine all materials
    const allAggregatedMaterials = [
      ...mathematicsMaterials,
      ...readingMaterials,
      ...writingMaterials,
    ];

    // Add them to Firestore
    for (const material of allAggregatedMaterials) {
      await setDoc(doc(db, "aggregated_materials", material.id), material);
    }
    // Seed materials collection
    const materials = [
      {
        id: "material1",
        category: "mathematics", // Category matches the "matematika" route
        difficulty: "beginner",
        title: "Bilangan & Operasi Dasar",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 19.99,
        quizzes: [
          { quizId: "quiz1", marks: 10 },
          { quizId: "quiz2", marks: 15 },
        ],
      },
      {
        id: "material2",
        category: "mathematics",
        difficulty: "intermediate",
        title: "Pecahan & Desimal",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 24.99,
        quizzes: [
          { quizId: "quiz2", marks: 20 },
          { quizId: "quiz3", marks: 15 },
        ],
      },
      {
        id: "material3",
        category: "mathematics",
        difficulty: "intermediate",
        title: "Aljabar Dasar",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 29.99,
        quizzes: [
          { quizId: "quiz3", marks: 25 },
          { quizId: "quiz4", marks: 20 },
        ],
      },
      {
        id: "material4",
        category: "geometry", // Different category for variety
        difficulty: "advanced",
        title: "Geometri Dimensi Dua",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 34.99,
        quizzes: [
          { quizId: "quiz4", marks: 30 },
          { quizId: "quiz5", marks: 25 },
        ],
      },
      // Add some reading materials
      {
        id: "material5",
        category: "reading", // For "membaca" route
        difficulty: "beginner",
        title: "Teknik Membaca Efektif",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 29.99,
        quizzes: [{ quizId: "quiz6", marks: 15 }],
      },
      // Add writing materials
      {
        id: "material6",
        category: "writing", // For "menulis" route
        difficulty: "intermediate",
        title: "Menulis Esai Argumentatif",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 34.99,
        quizzes: [{ quizId: "quiz7", marks: 20 }],
      },
    ];

    materials.forEach((material) => {
      const materialRef = doc(db, "materials", material.id);
      batch.set(materialRef, material);
    });

    // Seed quizzes collection
    const quizzes = [
      {
        id: "quiz1",
        category: "mathematics",
        difficulty: "beginner",
        instruction: "Pilih jawaban yang benar untuk soal aritmetika berikut",
        text: "Jika 2 + 3 = 5, maka 5 + 8 = ?",
        image_path: "/placeholder.svg?height=128&width=128",
        answer: "13",
      },
      {
        id: "quiz2",
        category: "mathematics",
        difficulty: "beginner",
        instruction: "Selesaikan persamaan berikut",
        text: "7 × 6 = ?",
        image_path: "/placeholder.svg?height=128&width=128",
        answer: "42",
      },
      {
        id: "quiz3",
        category: "mathematics",
        difficulty: "intermediate",
        instruction: "Cari hasil dari operasi pecahan berikut",
        text: "1/4 + 2/4 = ?",
        image_path: "/placeholder.svg?height=128&width=128",
        answer: "3/4",
      },
      {
        id: "quiz4",
        category: "mathematics",
        difficulty: "intermediate",
        instruction: "Selesaikan persamaan aljabar berikut",
        text: "Jika 2x + 5 = 13, maka nilai x = ?",
        image_path: "/placeholder.svg?height=128&width=128",
        answer: "4",
      },
      {
        id: "quiz5",
        category: "geometry",
        difficulty: "advanced",
        instruction: "Hitung luas segitiga berikut",
        text: "Segitiga dengan alas 6 cm dan tinggi 8 cm memiliki luas = ?",
        image_path: "/placeholder.svg?height=128&width=128",
        answer: "24 cm²",
      },
    ];

    quizzes.forEach((quiz) => {
      const quizRef = doc(db, "quizzes", quiz.id);
      batch.set(quizRef, quiz);
    });

    // Seed detailed materials collection
    const detailedMaterials = [
      {
        id: "detailed1",
        category: "mathematics",
        difficulty: "beginner",
        title: "Konsep Dasar Bilangan",
        text: "Bilangan adalah konsep matematika yang digunakan untuk menghitung dan mengukur. Bilangan terdiri dari angka-angka yang disusun menurut aturan tertentu.",
        image_path: "/placeholder.svg?height=128&width=128",
        explanation_title: "Jenis-jenis Bilangan",
        explanation:
          "Bilangan dibagi menjadi beberapa jenis, antara lain: bilangan bulat, bilangan pecahan, bilangan desimal, bilangan negatif, dan bilangan irasional.",
      },
      {
        id: "detailed2",
        category: "mathematics",
        difficulty: "intermediate",
        title: "Memahami Pecahan",
        text: "Pecahan adalah bilangan yang menggambarkan bagian dari keseluruhan. Pecahan terdiri dari pembilang dan penyebut.",
        image_path: "/placeholder.svg?height=128&width=128",
        explanation_title: "Operasi pada Pecahan",
        explanation:
          "Operasi pada pecahan meliputi penjumlahan, pengurangan, perkalian, dan pembagian. Dalam melakukan operasi pada pecahan, kita perlu memperhatikan penyebut dan menyamakan penyebut jika diperlukan.",
      },
      {
        id: "detailed3",
        category: "mathematics",
        difficulty: "intermediate",
        title: "Pengantar Aljabar",
        text: "Aljabar adalah cabang matematika yang mempelajari simbol dan aturan untuk memanipulasi simbol-simbol tersebut. Aljabar memungkinkan kita untuk merumuskan persamaan dan memecahkan masalah matematika.",
        image_path: "/placeholder.svg?height=128&width=128",
        explanation_title: "Variabel dan Konstanta",
        explanation:
          "Dalam aljabar, variabel adalah simbol yang mewakili nilai yang tidak diketahui, sedangkan konstanta adalah nilai tetap. Contoh variabel adalah x, y, z, sedangkan contoh konstanta adalah 1, 2, 3.",
      },
    ];

    detailedMaterials.forEach((material) => {
      const materialRef = doc(db, "detailed_materials", material.id);
      batch.set(materialRef, material);
    });

    // Seed aggregated materials collection
    // Update the aggregated materials section in your seedContentData function
    const aggregatedMaterials = [
      {
        id: "aggr1",
        category: "mathematics",
        difficulty: "beginner",
        title: "Paket Dasar Matematika",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 39.99,
        materials: ["detailed1", "detailed2"], // Updated to reference detailed_materials
      },
      {
        id: "aggr2",
        category: "mathematics",
        difficulty: "intermediate",
        title: "Paket Matematika Lanjutan",
        image_path: "/placeholder.svg?height=128&width=128",
        price: 59.99,
        materials: ["detailed2", "detailed3"], // Updated to reference detailed_materials
      },
    ];

    aggregatedMaterials.forEach((material) => {
      const materialRef = doc(db, "aggregated_materials", material.id);
      batch.set(materialRef, material);
    });

    // Seed readings collection
    const readings = [
      {
        id: "reading1",
        category: "mathematics",
        difficulty: "beginner",
        title: "Sejarah Bilangan",
        image_path: "/placeholder.svg?height=128&width=128",
        text: "Konsep bilangan telah berkembang selama ribuan tahun. Sistem penomoran pertama muncul di Mesir Kuno dan Mesopotamia sekitar 3000 SM. Orang Mesir menggunakan sistem hieroglif untuk mewakili angka, sementara orang Babilonia mengembangkan sistem basis-60 yang masih kita gunakan dalam pengukuran waktu dan sudut.",
        price: 9.99,
      },
      {
        id: "reading2",
        category: "mathematics",
        difficulty: "intermediate",
        title: "Tokoh-tokoh Matematika",
        image_path: "/placeholder.svg?height=128&width=128",
        text: "Euclid, seorang matematikawan Yunani yang hidup sekitar 300 SM, dikenal sebagai 'Bapak Geometri'. Karyanya yang berjudul 'Elemen' adalah salah satu buku teks matematika paling berpengaruh sepanjang masa. Isaac Newton dan Gottfried Wilhelm Leibniz secara independen mengembangkan kalkulus pada abad ke-17, yang menjadi dasar bagi banyak kemajuan dalam sains dan teknologi modern.",
        price: 14.99,
      },
      {
        id: "reading3",
        category: "geometry",
        difficulty: "advanced",
        title: "Penerapan Geometri dalam Arsitektur",
        image_path: "/placeholder.svg?height=128&width=128",
        text: "Geometri telah menjadi fondasi dalam arsitektur sejak zaman kuno. Dari piramida Mesir hingga Parthenon Yunani, arsitek telah menggunakan prinsip-prinsip geometri untuk menciptakan struktur yang tidak hanya indah tetapi juga stabil. Konsep seperti proporsi emas (golden ratio) dan simetri telah digunakan dalam desain bangunan selama berabad-abad, menciptakan estetika yang menarik secara universal.",
        price: 19.99,
      },
    ];

    readings.forEach((reading) => {
      const readingRef = doc(db, "readings", reading.id);
      batch.set(readingRef, reading);
    });

    await batch.commit();
    console.log("Content data seeded successfully");
    return true;
  } catch (error) {
    console.error("Error seeding content data:", error);
    return false;
  }
}

// Function to generate dummy data for a specific user
export async function seedUserData(userId: string) {
  try {
    const batch = writeBatch(db);
    const now = Timestamp.now();

    // Create or update the user profile
    const userRef = doc(db, "users", userId);
    batch.set(
      userRef,
      {
        displayName: "Student User",
        email: auth.currentUser?.email || "student@example.com",
        photoURL: "/avatar-placeholder.png",
        createdAt: now,
        progress: {
          completedMaterials: 2,
          totalMaterials: 4,
          completedQuizzes: 3,
          totalQuizzes: 5,
          overallProgress: 50,
          totalSteps: 4,
        },
        practiceResults: {
          totalScore: 85.5,
          results: [
            {
              id: "result1",
              title: "Latihan Integral",
              timestamp: daysAgo(2),
              score: 85,
              maxScore: 100,
              icon: "calculator",
            },
            {
              id: "result2",
              title: "Deskripsi Gambar",
              timestamp: daysAgo(7),
              score: 75,
              maxScore: 100,
              icon: "image",
            },
            {
              id: "result3",
              title: "Pemecahan Masalah",
              timestamp: daysAgo(14),
              score: 16,
              maxScore: 24,
              icon: "graduation",
            },
          ],
        },
        achievements: {
          totalPoints: 250,
          percentile: 75,
          badges: ["beginner", "quick_learner"],
          streak: 5,
          history: [
            {
              date: daysAgo(20),
              score: 65,
            },
            {
              date: daysAgo(15),
              score: 72,
            },
            {
              date: daysAgo(10),
              score: 78,
            },
            {
              date: daysAgo(5),
              score: 85,
            },
          ],
        },
        // In your seed function for user data
        smartComparisons: {
          percentile: 75,
          classAverage: 68,
          personalBest: 85,
          currentPercentage: 78,
          segments: [
            { color: "#b37400", value: 35 }, // You (current user)
            { color: "#d3d3d3", value: 25 }, // Class average
            { color: "#f59e0b", value: 40 }, // Top performers
          ],
          description:
            "You're performing 15% better than the class average this month.",
        },
      },

      { merge: true }
    );
    // Seed bookmarks subcollection with various SRS states
    const userBookmarks = [
      // Bookmark due for review (today)
      {
        id: "bookmark1",
        type: "material",
        title: "Konsep Dasar Bilangan",
        materialType: "detailed",
        parentTitle: "Paket Dasar Matematika",
        summaryPoints: [
          "Bilangan adalah konsep matematika yang digunakan untuk menghitung dan mengukur",
          "Bilangan terdiri dari angka-angka yang disusun menurut aturan tertentu",
          "Sistem bilangan memiliki sejarah panjang dalam peradaban manusia",
        ],
        detailedExplanation:
          "Bilangan dibagi menjadi beberapa jenis, antara lain: bilangan bulat, bilangan pecahan, bilangan desimal, bilangan negatif, dan bilangan irasional.",
        createdAt: daysAgo(30),
        // SRS fields - due for review
        reviewCount: 3,
        lastReviewedDate: daysAgo(7),
        nextReviewDate: Timestamp.now(), // Due today
        srsStatus: "due",
      },

      // Bookmark recently reviewed (not due)
      {
        id: "bookmark2",
        type: "material",
        title: "Memahami Pecahan",
        materialType: "detailed",
        parentTitle: "Paket Matematika Lanjutan",
        summaryPoints: [
          "Pecahan adalah bilangan yang menggambarkan bagian dari keseluruhan",
          "Pecahan terdiri dari pembilang dan penyebut",
          "Pecahan dapat diubah menjadi bentuk desimal",
        ],
        detailedExplanation:
          "Operasi pada pecahan meliputi penjumlahan, pengurangan, perkalian, dan pembagian. Dalam melakukan operasi pada pecahan, kita perlu memperhatikan penyebut dan menyamakan penyebut jika diperlukan.",
        createdAt: daysAgo(25),
        // SRS fields - recently reviewed
        reviewCount: 2,
        lastReviewedDate: daysAgo(1),
        nextReviewDate: daysAgo(-3), // Due in 3 days
        srsStatus: "learning",
      },

      // Bookmark newly added (first review schedule)
      {
        id: "bookmark3",
        type: "material",
        title: "Pengantar Aljabar",
        materialType: "detailed",
        parentTitle: "Paket Matematika Lanjutan",
        summaryPoints: [
          "Aljabar adalah cabang matematika yang mempelajari simbol dan aturan",
          "Aljabar memungkinkan kita untuk merumuskan persamaan",
          "Aljabar digunakan untuk memecahkan masalah matematika",
        ],
        detailedExplanation:
          "Dalam aljabar, variabel adalah simbol yang mewakili nilai yang tidak diketahui, sedangkan konstanta adalah nilai tetap. Contoh variabel adalah x, y, z, sedangkan contoh konstanta adalah 1, 2, 3.",
        createdAt: daysAgo(1),
        // SRS fields - new bookmark
        reviewCount: 1,
        lastReviewedDate: daysAgo(1),
        nextReviewDate: daysAgo(-1), // Due tomorrow
        srsStatus: "new",
      },

      // Bookmark almost mastered (long interval)
      {
        id: "bookmark4",
        type: "material",
        title: "Teknik Membaca Cepat",
        materialType: "reading",
        parentTitle: "Teknik Membaca Cepat",
        summaryPoints: [
          "Membaca cepat melibatkan teknik pemindaian dan skimming",
          "Kecepatan membaca ideal adalah 300-700 kata per menit",
          "Latihan reguler dapat meningkatkan kecepatan membaca hingga 50%",
        ],
        detailedExplanation:
          "Membaca cepat adalah metode membaca yang menggunakan teknik khusus untuk meningkatkan kecepatan tanpa mengorbankan pemahaman. Teknik ini sering melibatkan pemindaian dokumen, mengurangi subvokalisasi, dan mengidentifikasi kata-kata kunci.",
        createdAt: daysAgo(180),
        // SRS fields - almost mastered
        reviewCount: 8,
        lastReviewedDate: daysAgo(60),
        nextReviewDate: daysAgo(-120), // Due in 120 days
        srsStatus: "learning",
      },

      // Bookmark due for review (overdue)
      {
        id: "bookmark5",
        type: "flashcard",
        title: "Rumus-rumus Integral Dasar",
        materialType: "flashcard",
        parentTitle: "Kalkulus",
        summaryPoints: ["∫ x^n dx = (x^(n+1))/(n+1) + C (untuk n ≠ -1)"],
        detailedExplanation: "∫ x^n dx = (x^(n+1))/(n+1) + C (untuk n ≠ -1)",
        createdAt: daysAgo(45),
        // SRS fields - overdue
        reviewCount: 4,
        lastReviewedDate: daysAgo(21),
        nextReviewDate: daysAgo(7), // Overdue by 7 days
        srsStatus: "due",
      },

      // Winston conversation bookmark
      {
        id: "bookmark6",
        type: "winston",
        title: "Percakapan tentang Teorema Pythagoras",
        detailedExplanation:
          "Teorema Pythagoras menyatakan bahwa dalam segitiga siku-siku, kuadrat dari panjang sisi miring sama dengan jumlah kuadrat dari panjang kedua sisi lainnya. Dalam notasi matematika: a² + b² = c², di mana c adalah sisi miring, dan a dan b adalah kedua sisi lainnya.",
        createdAt: daysAgo(15),
        // SRS fields
        reviewCount: 2,
        lastReviewedDate: daysAgo(7),
        nextReviewDate: daysAgo(1), // Due yesterday
        srsStatus: "due",
      },

      // Mastered bookmark
      {
        id: "bookmark7",
        type: "material",
        title: "Operasi Dasar Matematika",
        materialType: "detailed",
        parentTitle: "Dasar Matematika",
        summaryPoints: [
          "Operasi dasar matematika terdiri dari penjumlahan, pengurangan, perkalian, dan pembagian",
          "Urutan operasi: kurung, pangkat, perkalian/pembagian, penjumlahan/pengurangan",
          "Operasi dasar merupakan fondasi untuk matematika lanjutan",
        ],
        detailedExplanation:
          "Operasi matematika dasar menjadi fondasi untuk semua cabang matematika. Penting untuk memahami urutan operasi (PEMDAS): Parentheses (kurung), Exponents (pangkat), Multiplication/Division (perkalian/pembagian), Addition/Subtraction (penjumlahan/pengurangan).",
        createdAt: daysAgo(365),
        // SRS fields - mastered
        reviewCount: 10,
        lastReviewedDate: daysAgo(300),
        nextReviewDate: daysAgo(-65), // Due in 65 days
        srsStatus: "mastered",
      },
    ];

    // Add the bookmarks to the user's bookmarks subcollection
    userBookmarks.forEach((bookmark) => {
      const bookmarkRef = doc(db, `users/${userId}/bookmarks`, bookmark.id);
      batch.set(bookmarkRef, bookmark);
    });
    // Seed user materials subcollection
    const userMaterials = [
      {
        id: "material1",
        title: "Bilangan & Operasi Dasar",
        status: "completed",
        progress: 100,
        startedAt: daysAgo(10),
        completedAt: daysAgo(7),
        lastAccessedAt: daysAgo(5),
      },
      {
        id: "material2",
        title: "Pecahan & Desimal",
        status: "completed",
        progress: 100,
        startedAt: daysAgo(8),
        completedAt: daysAgo(4),
        lastAccessedAt: daysAgo(2),
      },
      {
        id: "material3",
        title: "Aljabar Dasar",
        status: "in_progress",
        progress: 60,
        startedAt: daysAgo(3),
        lastAccessedAt: daysAgo(1),
      },
      {
        id: "material4",
        title: "Geometri Dimensi Dua",
        status: "not_started",
        progress: 0,
      },
    ];

    userMaterials.forEach((material) => {
      const materialRef = doc(
        collection(userRef, "userMaterials"),
        material.id
      );
      batch.set(materialRef, material);
    });

    // Create junction records for user-material relationships
    userMaterials.forEach((material) => {
      const junctionRef = doc(db, "user_materials", `${userId}_${material.id}`);
      batch.set(junctionRef, {
        userId: userId,
        materialId: material.id,
        purchasedAt: daysAgo(15),
        price:
          material.id === "material1"
            ? 19.99
            : material.id === "material2"
            ? 24.99
            : material.id === "material3"
            ? 29.99
            : 34.99,
        status: material.status,
        progress: material.progress,
        lastAccessedAt: material.lastAccessedAt || null,
      });
    });

    // Seed user quiz attempts
    const quizAttempts = [
      {
        id: "attempt1",
        quizId: "quiz1",
        attemptedAt: daysAgo(9),
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeSpentSeconds: 540,
      },
      {
        id: "attempt2",
        quizId: "quiz2",
        attemptedAt: daysAgo(6),
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeSpentSeconds: 480,
      },
      {
        id: "attempt3",
        quizId: "quiz3",
        attemptedAt: daysAgo(3),
        score: 70,
        totalQuestions: 10,
        correctAnswers: 7,
        timeSpentSeconds: 600,
      },
    ];

    quizAttempts.forEach((attempt, index) => {
      const junctionRef = doc(
        db,
        "user_quiz_attempts",
        `${userId}_${attempt.id}`
      );
      batch.set(junctionRef, {
        userId: userId,
        ...attempt,
      });
    });

    // Seed user quizzes subcollection
    const userQuizzes = [
      {
        id: "quiz1",
        title: "Quiz Bilangan",
        numQuestions: 10,
        bestScore: 80,
        attempts: 1,
        lastAttemptAt: daysAgo(9),
      },
      {
        id: "quiz2",
        title: "Quiz Operasi Dasar",
        numQuestions: 10,
        bestScore: 90,
        attempts: 1,
        lastAttemptAt: daysAgo(6),
      },
      {
        id: "quiz3",
        title: "Quiz Pecahan",
        numQuestions: 10,
        bestScore: 70,
        attempts: 1,
        lastAttemptAt: daysAgo(3),
      },
      {
        id: "quiz4",
        title: "Quiz Aljabar",
        numQuestions: 15,
        bestScore: 0,
        attempts: 0,
      },
      {
        id: "quiz5",
        title: "Quiz Geometri",
        numQuestions: 15,
        bestScore: 0,
        attempts: 0,
      },
    ];

    userQuizzes.forEach((quiz) => {
      const quizRef = doc(collection(userRef, "userQuizzes"), quiz.id);
      batch.set(quizRef, quiz);
    });

    // Seed recommendations subcollection
    // Seed recommendations subcollection - Updated version
    const recommendations = [
      {
        id: "rec1",
        title: "Latihan Tambahan Aljabar",
        description:
          "Berdasarkan hasil quiz Anda, kami merekomendasikan latihan tambahan untuk aljabar.",
        materialId: "material3",
        timestamp: daysAgo(2),
        type: "practice",
        // Add these fields for better UI integration
        priority: "high",
        materialType: "regular",
        imageOverride: null, // Optional: override the image from the source material
        status: "active", // active, completed, dismissed
      },
      {
        id: "rec2",
        title: "Mulai Belajar Geometri",
        description:
          "Setelah menyelesaikan materi aljabar, Anda siap untuk melanjutkan ke geometri.",
        materialId: "material4",
        timestamp: daysAgo(1),
        type: "next_material",
        priority: "medium",
        materialType: "regular",
        status: "active",
      },
      {
        id: "rec3",
        title: "Paket Matematika Lanjutan",
        description:
          "Paket ini akan membantu Anda memperdalam pemahaman matematika lanjutan.",
        materialId: "aggr2",
        timestamp: now,
        type: "bundle",
        priority: "low",
        materialType: "bundle",
        status: "active",
      },
      // Add a detailed material recommendation
      {
        id: "rec4",
        title: "Mendalami Konsep Bilangan",
        description: "Pelajari konsep dasar bilangan dengan lebih mendalam.",
        materialId: "detailed1",
        timestamp: daysAgo(3),
        type: "expansion",
        priority: "medium",
        materialType: "detailed",
        status: "active",
      },
      // Add a reading recommendation
      {
        id: "rec5",
        title: "Bacaan Tentang Sejarah Bilangan",
        description:
          "Perluas pengetahuan Anda dengan membaca tentang sejarah bilangan.",
        materialId: "reading1",
        timestamp: daysAgo(4),
        type: "reading",
        priority: "low",
        materialType: "reading",
        status: "active",
      },
    ];

    recommendations.forEach((rec) => {
      const recRef = doc(collection(userRef, "recommendations"), rec.id);
      batch.set(recRef, rec);
    });

    // Seed feedback reports subcollection
    const feedbackReport = {
      id: "report1",
      createdAt: daysAgo(2),
      quizId: "quiz3",
      weaknesses: {
        title: "Area yang Perlu Ditingkatkan",
        items: [
          {
            title: "Pemahaman Konsep Pecahan",
            content: [
              "Kesulitan dalam operasi penambahan pecahan",
              "Kesalahan dalam menyamakan penyebut",
            ],
          },
          {
            title: "Kecepatan Perhitungan",
            content: [
              "Membutuhkan waktu lebih lama dari rata-rata untuk menyelesaikan soal",
            ],
          },
        ],
      },
      improvements: {
        title: "Rekomendasi Peningkatan",
        items: [
          {
            title: "Latihan Tambahan",
            content: [
              "Ulangi materi tentang penyederhanaan pecahan",
              "Latih kecepatan dengan soal-soal hitungan sederhana",
            ],
          },
          {
            title: "Materi Pendukung",
            content: [
              "Lihat video tutorial tentang operasi pecahan",
              "Gunakan kartu soal untuk latihan mandiri",
            ],
          },
        ],
      },
    };

    const reportRef = doc(
      collection(userRef, "feedbackReports"),
      feedbackReport.id
    );
    batch.set(reportRef, feedbackReport);

    await batch.commit();
    console.log("User data seeded successfully for user:", userId);
    return true;
  } catch (error) {
    console.error("Error seeding user data:", error);
    return false;
  }
}

// Function to initialize seed buttons for admin use
export function initSeedButtons() {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  container.style.zIndex = "1000";

  // Button to seed content
  const contentButton = document.createElement("button");
  contentButton.textContent = "Seed Content Data";
  contentButton.style.padding = "10px";
  contentButton.style.backgroundColor = "#4CAF50";
  contentButton.style.color = "white";
  contentButton.style.border = "none";
  contentButton.style.borderRadius = "4px";
  contentButton.style.cursor = "pointer";

  contentButton.onclick = async () => {
    contentButton.textContent = "Seeding...";
    contentButton.disabled = true;
    const success = await seedContentData();
    if (success) {
      contentButton.textContent = "✓ Content Data Seeded";
      contentButton.style.backgroundColor = "#45a049";
    } else {
      contentButton.textContent = "✗ Seeding Failed";
      contentButton.style.backgroundColor = "#f44336";
      setTimeout(() => {
        contentButton.textContent = "Retry Seed Content";
        contentButton.style.backgroundColor = "#4CAF50";
        contentButton.disabled = false;
      }, 3000);
    }
  };

  // Button to seed user data
  const userButton = document.createElement("button");
  userButton.textContent = "Seed User Data";
  userButton.style.padding = "10px";
  userButton.style.backgroundColor = "#2196F3";
  userButton.style.color = "white";
  userButton.style.border = "none";
  userButton.style.borderRadius = "4px";
  userButton.style.cursor = "pointer";

  userButton.onclick = async () => {
    if (!auth.currentUser) {
      alert("Please sign in first");
      return;
    }

    userButton.textContent = "Seeding...";
    userButton.disabled = true;
    const success = await seedUserData(auth.currentUser.uid);
    if (success) {
      userButton.textContent = "✓ User Data Seeded";
      userButton.style.backgroundColor = "#0b7dda";
    } else {
      userButton.textContent = "✗ Seeding Failed";
      userButton.style.backgroundColor = "#f44336";
      setTimeout(() => {
        userButton.textContent = "Retry Seed User Data";
        userButton.style.backgroundColor = "#2196F3";
        userButton.disabled = false;
      }, 3000);
    }
  };

  container.appendChild(contentButton);
  container.appendChild(userButton);
  document.body.appendChild(container);
}
