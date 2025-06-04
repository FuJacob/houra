"use client";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const AccountMenuButton = ({ name }: { name: string }) => {
  const [showAccountMenuModal, setShowAccountMenuModal] = useState(false);
  const router = useRouter();
  const { removeAccessToken } = useAuth();

  // Creative greeting variations
  const getGreeting = () => {
    const hour = new Date().getHours();
    const greetings = {
      morning: ["Good morning", "Rise and shine", "Morning", "Hello there"],
      afternoon: ["Good afternoon", "Hey there", "Afternoon", "Hello"],
      evening: ["Good evening", "Evening", "Hey", "Hello"],
      night: ["Good night", "Hey night owl", "Evening", "Hello"]
    };

    let timeOfDay: keyof typeof greetings;
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 22) timeOfDay = 'evening';
    else timeOfDay = 'night';

    const options = greetings[timeOfDay];
    return options[Math.floor(Math.random() * options.length)];
  };

  const logOut = () => {
    try {
      removeAccessToken();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowAccountMenuModal((prev) => !prev)}
        className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-gray-700 font-semibold group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500 leading-tight">{getGreeting()}</span>
          <span className="font-medium leading-tight">{name}</span>
        </div>
        <FaAngleDown
          className={`transition-transform ${
            showAccountMenuModal ? "rotate-180" : ""
          }`}
        />
      </button>

      {showAccountMenuModal && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowAccountMenuModal(false)}
          />
          <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
            <button
              onClick={logOut}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountMenuButton;
