"use client";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/home");
    }
  }, [router, isAuthenticated]);
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
      </main>
    </>
  );
}
