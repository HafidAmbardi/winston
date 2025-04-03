"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/app/firebase/config";
import PasswordInput from "@/app/components/auth/password_input";
import GoogleButton from "@/app/components/auth/google_button";
import Divider from "@/app/components/auth/divider";

// Define a type for Firebase Auth errors
interface FirebaseAuthError extends Error {
  code?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Authenticate with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err: unknown) {
      const firebaseError = err as FirebaseAuthError;

      // Handle specific Firebase error codes
      switch (firebaseError.code) {
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection");
          break;
        default:
          setError(
            "Login failed: " + (firebaseError.message || "Unknown error")
          );
          console.error(firebaseError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: unknown) {
      const firebaseError = err as FirebaseAuthError;

      if (firebaseError.code === "auth/popup-closed-by-user") {
        // User closed the popup, not an error to display
        console.log("Sign-in popup closed by user");
      } else {
        setError(
          "Google sign-in failed: " + (firebaseError.message || "Unknown error")
        );
        console.error(firebaseError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Authentication Image */}
      <div className="hidden md:block md:w-1/2">
        <Image
          src="/authentication.png"
          alt="Authentication"
          width={800}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Selamat Datang Kembali!</h1>
            <p className="text-gray-600">
              Fill your account information to get in
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="fatimah@badr.co.id"
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 font-medium">
                  Password
                </label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                />
              </div>

              <div className="flex justify-end">
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-amber-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <Divider />

          <GoogleButton onClick={handleGoogleSignIn} disabled={isLoading} />

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Dont have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-amber-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
