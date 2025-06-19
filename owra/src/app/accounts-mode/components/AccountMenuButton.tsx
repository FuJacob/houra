"use client";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const AccountMenuButton = ({ name }: { name: string }) => {
  const [showAccountMenuModal, setShowAccountMenuModal] = useState(false);
  const router = useRouter();

  const logOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowAccountMenuModal((prev) => !prev)}
        className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors group"
      >
        <span className="leading-tight">Hello {name}</span>
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
