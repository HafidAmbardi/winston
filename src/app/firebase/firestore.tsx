import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  limit,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { app } from "./config";

// Initialize Firestore
export const db = getFirestore(app);

// Helper functions for common Firestore operations
export const getUserDoc = (userId: string) => doc(db, "users", userId);
export const getUserCollection = (userId: string, collectionName: string) =>
  collection(doc(db, "users", userId), collectionName);

// Specialized queries
export const getRecentUserResults = (userId: string, limitCount = 5) =>
  query(
    collection(getUserDoc(userId), "practiceResults"),
    orderBy("timestamp", "desc"),
    limit(limitCount)
  );
// Get a material by ID from any of the material collections
export const getMaterialFromAnyCollection = async (materialId: string) => {
  // Collections to check in order of priority
  const collections = [
    "materials",
    "detailed_materials",
    "aggregated_materials",
    "readings",
  ];

  for (const collectionName of collections) {
    const docRef = doc(db, collectionName, materialId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        collection: collectionName,
        ...docSnap.data(),
      };
    }
  }

  return null; // Material not found
};

// Get all user materials with their progress status
export const getUserMaterialsStatus = async (userId: string) => {
  const userMaterialsSnapshot = await getDocs(getUserMaterials(userId));
  const materials = new Map();

  userMaterialsSnapshot.forEach((doc) => {
    materials.set(doc.id, doc.data());
  });

  return materials;
};
export const getUserMaterials = (userId: string, limitCount = 4) =>
  query(collection(getUserDoc(userId), "userMaterials"), limit(limitCount));

export const getRecommendedMaterials = (userId: string, limitCount = 6) =>
  query(collection(getUserDoc(userId), "recommendations"), limit(limitCount));

export const getUserQuizzes = (userId: string, limitCount = 5) =>
  query(collection(getUserDoc(userId), "userQuizzes"), limit(limitCount));

export const getLatestFeedback = (userId: string) =>
  query(
    collection(getUserDoc(userId), "feedbackReports"),
    orderBy("createdAt", "desc"),
    limit(1)
  );
// Add these to your existing firestore.tsx file
export const getMaterials = (limitCount = 10) =>
  query(collection(db, "materials"), limit(limitCount));

export const getQuizzes = (limitCount = 10) =>
  query(collection(db, "quizzes"), limit(limitCount));

export const getDetailedMaterials = (limitCount = 10) =>
  query(collection(db, "detailed_materials"), limit(limitCount));

export const getAggregatedMaterials = (limitCount = 10) =>
  query(collection(db, "aggregated_materials"), limit(limitCount));

export const getReadings = (limitCount = 10) =>
  query(collection(db, "readings"), limit(limitCount));

// Get a specific document by ID
export const getMaterialById = (materialId: string) =>
  doc(db, "materials", materialId);

export const getQuizById = (quizId: string) => doc(db, "quizzes", quizId);

export const getDetailedMaterialById = (materialId: string) =>
  doc(db, "detailed_materials", materialId);

export const getAggregatedMaterialById = (materialId: string) =>
  doc(db, "aggregated_materials", materialId);

export const getReadingById = (readingId: string) =>
  doc(db, "readings", readingId);
