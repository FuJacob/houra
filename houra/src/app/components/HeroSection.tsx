"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-48 pb-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-4xl text-gray-500 max-w-2xl mx-auto mb-4">{time}</p>
        <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8">
          Time is your most valuable currency
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
          Time is money, so why not spend, save, and budget it like it? Houra
          helps you track where your time goes, set intentional limits, and make
          every second count.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/signup"
            className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            It's been <span className="font-bold">{seconds} seconds</span>.
            Start Managing Your Time
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Learn how it works →
          </Link>
        </div>

        {/* Video Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            src="/portfoliovideofinal.mp4"
            autoPlay
            loop
            muted
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
