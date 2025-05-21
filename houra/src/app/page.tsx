"use client";
import Image from "next/image";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/home");
    }
  }, []);
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
      </main>
    </>
  );
}
