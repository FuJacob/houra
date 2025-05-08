import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import { error } from "console";
const page = () => {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/profile");
    } else {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-2xl font-semibold pb-4">Create your Houra Account</h1>
      <p className="text-gray-500 pb-8">
        Already have an account? <a>Log in</a>
      </p>

      <form
        action={handleSubmit}
        className="flex flex-col w-full max-w-lg mx-auto"
      >
        <label htmlFor="email" className="pb-1">
          First, enter your email address
        </label>
        <input
          required
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
          id="password"
          name="password"
          type="password"
          className="border px-3 py-2 mb-6 rounded-xl"
        />
        <button type="submit" className="bg-primary px-6 py-4 rounded-full">
          Next
        </button>
      </form>
    </div>
  );
};

export default page;
