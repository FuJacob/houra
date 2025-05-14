"use client";
import React, { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const page = () => {
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

    console.log(formData);
    if (response.ok) {
      console.log("User created successfully");

      // sign in the user now

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
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-2xl font-semibold pb-4">
        Create your Houra account.
      </h1>
      <p className="text-gray-500 pb-8">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>

      {step === 1 ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-lg mx-auto"
        >
          <label htmlFor="email" className="pb-1">
            First, enter your email address
          </label>
          <input
            required
            onChange={handleInputChange}
            id="email"
            name="email"
            type="email"
            className="border px-3 py-2 mb-6 rounded-xl"
          />

          <label htmlFor="email" className="pb-1">
            Now, enter your password
          </label>
          <input
            required
            onChange={handleInputChange}
            id="password"
            name="password"
            type="password"
            className="border px-3 py-2 mb-6 rounded-xl"
          />
          <button type="submit" className="bg-primary px-6 py-4 rounded-full">
            Next
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-lg mx-auto"
        >
          <label htmlFor="email" className="pb-1">
            Finally, enter your name.
          </label>
          <input
            required
            onChange={handleInputChange}
            id="name"
            name="name"
            type="text"
            className="border px-3 py-2 mb-6 rounded-xl"
          />
          <button type="submit" className="bg-primary px-6 py-4 rounded-full">
            Next
          </button>
        </form>
      )}
    </div>
  );
};

export default page;
