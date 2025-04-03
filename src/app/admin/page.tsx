"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/auth_context";
import { seedUserData } from "@/app/firebase/seed_data";

export default function AdminPage() {
  const { user } = useAuth();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSeedData = async () => {
    if (!userId.trim()) {
      setResult({ success: false, message: "Please enter a user ID" });
      return;
    }

    setLoading(true);
    try {
      await seedUserData(userId);
      setResult({ success: true, message: "Data seeded successfully!" });
    } catch (error) {
      console.error("Seeding failed:", error);
      setResult({
        success: false,
        message: `Failed to seed data: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="p-8">Please log in to access admin features</div>;
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Tools</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Seed Test Data</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter user ID to seed data for"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the Firebase UID of the user you want to create test data
              for.
              {user && (
                <span>
                  {" "}
                  You can use your own ID: <code>{user.uid}</code>
                </span>
              )}
            </p>
          </div>

          <button
            onClick={handleSeedData}
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Seeding..." : "Seed Test Data"}
          </button>

          {result && (
            <div
              className={`p-3 rounded ${
                result.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {result.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
