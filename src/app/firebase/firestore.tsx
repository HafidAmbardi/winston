import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  limit,
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
