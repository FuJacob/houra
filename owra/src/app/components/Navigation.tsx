"use client";
import React, { use, useState } from "react";
import Link from "next/link";
import { FaBars, FaX, FaClock, FaRocket, FaUser } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import AccountMenuButton from "../home/components/AccountMenuButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const { isAuthenticated } = useAuth();
  const { getAccessToken } = useAuth();
  const isNotLoggedIn = !isAuthenticated();
  const [name, setName] = useState("");
  const router = useRouter();

  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await authApi.getCurrentUser();
        setName(data.user.name || "Account");
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };

    if (isAuthenticated()) {
      fetchAccount();
    }
  }, [isAuthenticated]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-6">
      <div className="max-w-2xl mx-auto">
        <nav className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-lg shadow-black/5">
          <div className="flex h-14 items-center px-6 relative justify-between w-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-medium tracking-tight text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              <img src="/logo.svg" className="w-4 h-4" alt="Owra" />
              <span className="">owra</span>
            </Link>

            {/* Current Time - Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full">
                <span className="text-2xl font-mono  text-gray-800 tabular-nums">
                  {currentTime}
                </span>
              </div>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              {isNotLoggedIn && (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-white/30"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="text-sm px-4 py-2 bg-gray-900/90 backdrop-blur-sm text-white rounded-full hover:bg-gray-900 transition-all duration-200 shadow-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
              {!isNotLoggedIn && <AccountMenuButton name={name} />}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaX className="h-4 w-4 text-gray-700" />
              ) : (
                <FaBars className="h-4 w-4 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-white/5 backdrop-blur-sm rounded-b-3xl">
              <div className="px-6 py-4">
                {isNotLoggedIn && (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 px-3 rounded-full hover:bg-white/20 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm px-4 py-2.5 bg-gray-900/90 backdrop-blur-sm text-white rounded-full hover:bg-gray-900 transition-all duration-200 text-center shadow-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
                {!isNotLoggedIn && (
                  <div className="py-2">
                    <AccountMenuButton name={name} />
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
