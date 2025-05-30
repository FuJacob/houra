import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaX } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const isNotLoggedIn = !isAuthenticated();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 max-w-7xl mx-auto rounded-full mt-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-light tracking-tight text-gray-900 underline decoration-transparent hover:decoration-gray-900 underline-offset-4 transition-all duration-300 ease-in-out"
          >
            houra
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaX className="h-6 w-6 text-gray-900" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-900" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          {isNotLoggedIn && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="#features"
                className="block px-3 py-2 text-base text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 text-base text-gray-600 hover:text-gray-900 transition-colors"
              >
                How it works
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <div className="pt-4 flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 text-base text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
