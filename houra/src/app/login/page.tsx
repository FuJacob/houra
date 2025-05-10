"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    // const accessToken = localStorage.getItem("accessToken");

    // console.log(accessToken);
    const response = await fetch("http://localhost:4500/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      console.log("YEAS");
      router.push("/");
    } else {
      console.log("asdasdasd wtf");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-2xl font-semibold pb-4">Welcome back.</h1>
      <p className="text-gray-500 pb-8">
        New to Houra?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg mx-auto"
      >
        <label htmlFor="email" className="pb-1">
          Your email address
        </label>
        <input
          required
          id="email"
          name="email"
          type="email"
          className="border px-3 py-2 mb-6 rounded-xl"
        />

        <label htmlFor="email" className="pb-1">
          Your password
        </label>
        <input
          required
          id="password"
          name="password"
          type="password"
          className="border px-3 py-2 mb-6 rounded-xl"
        />
        <button type="submit" className="bg-primary px-6 py-4 rounded-full">
          Log in{" "}
        </button>
      </form>
    </div>
  );
};

export default page;
