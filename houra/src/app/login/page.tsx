"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const router = useRouter();
  const { setAccessToken } = useAuth();
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://localhost:4500/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
      router.push("/home");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-lg px-4 py-24">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Welcome back
            </h1>
            <p className="text-gray-500">
              New to Houra?{" "}
              <Link
                href="/signup"
                className="text-gray-900 hover:text-gray-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-2"
              >
                Your email address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-2"
              >
                Your password
              </label>
              <input
                required
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
