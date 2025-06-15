"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import DummyAccountsStacked from "./DummyAccountsStacked";

const CTASection = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center w-full">
        <div className="w-full px-4 py-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-6xl md:text-6xl font-medium font-serif mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight tracking-tight">
              You&apos;ve already spent{" "}
              <span className="font-curly text-[10rem] mx-4">{seconds}</span>{" "}
              seconds here.
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-3xl rounded-3xl transform -rotate-1"></div>
              <div className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-16 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <p className="text-gray-600 mb-12 text-3xl font-light mx-auto leading-relaxed font-sans">
                    Now imagine if your whole day was this easy to track.
                  </p>

                  <Link
                    href="/sign-in"
                    className=" mb-22 group inline-flex px-12 py-5 bg-gray-900/90 backdrop-blur-sm text-white rounded-full hover:bg-gray-900 transition-all duration-300 text-lg font-medium shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.05] border border-gray-800/20"
                  >
                    <span className="group-hover:text-white/90 transition-colors">
                      Get Started Now
                    </span>
                  </Link>

                  <DummyAccountsStacked />
                </div>

                <div className="absolute top-8 right-8 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 left-12 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/4 left-8 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-1/4 right-12 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
