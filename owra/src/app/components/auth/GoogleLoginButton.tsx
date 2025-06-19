"use client";

import React from "react";

interface GoogleLoginButtonProps {
  onClick: () => void;
  className?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onClick,
  className = "",
}) => {
  return (
    <div className="relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-3xl rounded-3xl transform rotate-1"></div>

      {/* Main form container */}
      <div className="relative bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl p-10 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-500">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <button
            className={`group w-full px-8 py-5 bg-gray-900/90 backdrop-blur-sm text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 text-lg font-medium shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] border border-gray-800/20 ${className}`}
            onClick={onClick}
          >
            <div className="flex items-center justify-center gap-3 mr-4">
              <img src="/google.png" alt="Google logo" className="w-12 h-12" />
              Continue with Google
            </div>
          </button>
        </div>

        {/* Floating particles */}
        <div className="absolute top-6 right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
