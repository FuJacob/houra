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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat w-screen min-h-screen">
        <div className="min-h-screen w-full flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            {/* Enhanced Logo and Title */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full transform rotate-3"></div>
                  <div className="relative bg-white/60 backdrop-blur-sm p-3 rounded-full border border-white/30 shadow-lg">
                    <img src="/logo.svg" className="w-8 h-8" alt="Owra logo" />
                  </div>
                </div>
                <h1 className="text-4xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  owra
                </h1>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4 leading-tight">
                Welcome back
              </h2>
              <p className="text-gray-600 text-lg">
                New to Owra?{" "}
                <Link
                  href="/signup"
                  className="text-gray-900 hover:text-gray-700 transition-colors font-medium underline decoration-2 underline-offset-4"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Enhanced Login Form Card */}
            <div className="relative">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-3xl rounded-3xl transform rotate-1"></div>

              {/* Main form container */}
              <div className="relative bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl p-10 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-500">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-800 mb-3"
                      >
                        Email address
                      </label>
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        className="w-full px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800/30 transition-all duration-300 placeholder-gray-500"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-800 mb-3"
                      >
                        Password
                      </label>
                      <input
                        required
                        id="password"
                        name="password"
                        type="password"
                        className="w-full px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800/30 transition-all duration-300 placeholder-gray-500"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full px-8 py-5 bg-gray-900/90 backdrop-blur-sm text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 text-lg font-medium shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] border border-gray-800/20"
                    >
                      <span className="group-hover:text-white/90 transition-colors">
                        Log in
                      </span>
                    </button>
                  </form>
                </div>

                {/* Floating particles */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
