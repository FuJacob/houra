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
    <div className="flex flex-col items-center justify-center">
      <div className="bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat w-screen">
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="w-full max-w-md px-6">
            {/* Logo and Title */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img src="/logo.svg" className="w-12 h-12" alt="Houra logo" />
                <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                  houra
                </h1>
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-3">
                Welcome back
              </h2>
              <p className="text-gray-500">
                New to Houra?{" "}
                <Link
                  href="/signup"
                  className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
