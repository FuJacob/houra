"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import TimeCard from "./TimeCard";

const HeroSection = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-screen">
        <section className="pt-24 md:pt-82 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="max-w-6xl p-12 text-4xl sm:text-6xl md:text-9xl font-light mx-auto text-gray-900 mb-32 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-lg shadow-black/5">
              Time is money
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-16">
              Why not spend, save, and budget it like it?
            </p>

            <div className="relative w-full max-w-7xl mx-auto mt-32">
              <TimeCard seconds={seconds} />
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10 rounded-2xl shadow-2xl">
                <video
                  src="/portfoliovideofinal.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full min-w-7xl rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
