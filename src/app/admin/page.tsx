"use client";

import { useEffect, useState } from "react";
import { seedContentData, seedUserData } from "../firebase/seed_data";
import { useAuth } from "../context/auth_context";

export default function AdminSeeder() {
  const { user } = useAuth();
  const [contentSeeded, setContentSeeded] = useState(false);
  const [userSeeded, setUserSeeded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeedContent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await seedContentData();
      setContentSeeded(result);
      if (!result) {
        setError("Failed to seed content data");
      }
    } catch (err) {
      setError(
        `Error seeding content: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedUserData = async () => {
    if (!user) {
      setError("You must be logged in to seed user data");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await seedUserData(user.uid);
      setUserSeeded(result);
      if (!result) {
        setError("Failed to seed user data");
      }
    } catch (err) {
      setError(
        `Error seeding user data: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Data Seeder</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Global Content Data</h2>
          <p className="mb-4">
            Seed global collections like materials, quizzes, readings, etc.
          </p>
          <button
            onClick={handleSeedContent}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md ${
              contentSeeded
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } disabled:opacity-50`}
          >
            {isLoading
              ? "Seeding..."
              : contentSeeded
              ? "✓ Content Seeded"
              : "Seed Content Data"}
          </button>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">User Data</h2>
          <p className="mb-4">Seed demo data for the current user.</p>
          <button
            onClick={handleSeedUserData}
            disabled={isLoading || !user}
            className={`px-4 py-2 rounded-md ${
              userSeeded
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } disabled:opacity-50`}
          >
            {isLoading
              ? "Seeding..."
              : userSeeded
              ? "✓ User Data Seeded"
              : "Seed User Data"}
          </button>
          {!user && (
            <p className="text-sm text-red-500 mt-2">
              You must be logged in to seed user data
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
