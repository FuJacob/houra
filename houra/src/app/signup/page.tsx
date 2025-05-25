"use client";
import React, { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1) {
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

      const response = await fetch("http://localhost:4500/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      console.log("Logged in");
      router.push("/home");
    } else {
      console.log("Error creating user");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center w-full">
        <div className="w-full max-w-lg px-4 py-24">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Create your Houra account
            </h1>
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-gray-900 hover:text-gray-700 transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  First, enter your email address
                </label>
                <input
                  required
                  onChange={handleInputChange}
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
                  Now, enter your password
                </label>
                <input
                  required
                  onChange={handleInputChange}
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
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Finally, enter your name
                </label>
                <input
                  required
                  onChange={handleInputChange}
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
