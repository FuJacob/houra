"use client";
import React, { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const router = useRouter();
  const { setAccessToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1) {
      // Check if passwords match before proceeding
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      setStep(step + 1);
      return;
    }
    const response = await fetch("http://localhost:4500/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("User created successfully");

      const loginResponse = await fetch(
        "http://localhost:4500/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        setAccessToken(data.accessToken);
        console.log("Logged in");
        router.push("/home");
      } else {
        console.log("Error logging in after signup");
      }
    } else {
      console.log("Error creating user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="min-h-screen w-full bg-background flex items-center justify-center bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat  w-screen ">
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
              Create your account
            </h2>
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Signup Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {step === 1 ? (
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your name
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
