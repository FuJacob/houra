"use client";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AccountMenuButton = ({ name }: { name: string }) => {
  const [showAccountMenuModal, setShowAccountMenuModal] = useState(false);
  const router = useRouter();

  const logOut = () => {
    try {
      localStorage.removeItem("accessToken");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowAccountMenuModal((prev) => !prev)}
        className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          {name.charAt(0).toUpperCase()}
        </div>
        <span>{name}</span>
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
