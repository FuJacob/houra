"use client";
import Link from "next/link";
import Navigation from "../components/layout/Navigation";
import { useUser } from "@/contexts/UserContext";

export default function Page() {
  const { user } = useUser();
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="flex px-8 py-16 gap-12 mx-auto text-3xl sm:text-5xl md:text-7xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight tracking-tight">
          Welcome {user?.user_metadata.full_name.split(" ")[0]}
        </p>
        <p className="font-light text-3xl text-center text-gray-600 mb-12">
          Choose how you want to start
        </p>
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-full flex justify-center mb-8">
            <div className="relative flex w-full max-w-2xl gap-6 px-4">
              {/* Left arrow pointing to Accounts Mode */}
              <div className="absolute left-0 top-1/2 -translate-x-16 ">
                <img
                  src="/up-arrow.png"
                  alt="Arrow pointing to Accounts Mode"
                  className="w-24 h-24 rotate-[-45deg]"
                />
              </div>

              <Link
                href="/accounts-mode"
                className="group flex-1 flex justify-center items-center px-8 py-4 text-3xl font-black text-center text-white bg-gray-900/90 border border-gray-800/20 rounded-full backdrop-blur-sm shadow-lg shadow-gray-900/25 transition-all duration-300 hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02]"
              >
                <span className="group-hover:text-white/90 transition-colors">
                  Accounts Mode
                </span>
              </Link>
              <Link
                href="/flex-mode"
                className="group flex-1 flex justify-center items-center px-8 py-4 font-light text-3xl text-center text-gray-800 bg-white/20 border border-white/30 rounded-full backdrop-blur-sm shadow-lg shadow-black/5 transition-all duration-300 hover:bg-white/30 hover:border-white/40 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center gap-2 text-5xl font-curly group-hover:text-gray-900 transition-colors">
                  Flex Mode
                </div>
              </Link>

              {/* Right arrow pointing to Flex Mode */}
              <div className="absolute right-0 top-1/2 translate-x-16">
                <img
                  src="/up-arrow.png"
                  alt="Arrow pointing to Flex Mode"
                  className="w-24 h-24 rotate-[45deg] scale-x-[-1]"
                />
              </div>
            </div>
          </div>

          {/* Explanation boxes */}
          <div className="w-full flex justify-center mb-16">
            <div className="flex w-full max-w-2xl gap-6 px-4">
              {/* Accounts Mode explanation */}
              <div className="flex-1 p-6 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg">
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Your time, but like money
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Create time cards for anything — focus, fun, rest. Customize
                  and track your time like money.
                </p>
              </div>

              {/* Flex Mode explanation */}
              <div className="flex-1 p-6 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  Focus your way
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Launch a simple, quick timer instantly with any duration. No
                  setup — just pick a time and go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
