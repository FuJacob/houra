import React from "react";
import { loginWithGoogle } from "./actions";
import GoogleLoginButton from "../../components/auth/GoogleLoginButton";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat w-screen min-h-screen">
        <div className="min-h-screen w-full flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            {/* Enhanced Logo and Title */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full transform rotate-3"></div>
                  <div className="relative bg-white/60 backdrop-blur-sm p-3 rounded-full border border-white/30 shadow-lg">
                    <img src="/logo.svg" className="w-8 h-8" alt="Owra logo" />
                  </div>
                </div>
                <h1 className="text-4xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                  owra
                </h1>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4 leading-tight">
                Let&apos;s start saving time.
              </h2>
            </div>

            {/* Enhanced Login Form Card */}
            <GoogleLoginButton onClick={loginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
