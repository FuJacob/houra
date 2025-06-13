"use client";
import { FaClock } from "react-icons/fa";
import { selectedAccountContext } from "../contexts";
import { useContext, useState } from "react";
import { Account } from "@/types/types";
import Image from "next/image";
import EditAccountModal from "./EditAccountModal";
import { FaGear } from "react-icons/fa6";
import { reloadMap } from "../utils/reloadMap";
import { dummyAccount } from "../utils/dummyAccount";

const AccountBox = ({ account }: { account: Account }) => {
  const { selectedAccount, setSelectedAccount, bringToTimer } = useContext(
    selectedAccountContext
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(account);

  const seconds = currentAccount.accountBalance % 60;
  const minutes = Math.floor(currentAccount.accountBalance / 60) % 60;
  const hours = Math.floor(currentAccount.accountBalance / 3600);

  const isSelected =
    selectedAccount.accountNumber === currentAccount.accountNumber;
  const isAnySelected = selectedAccount.accountNumber !== 0;

  const handleClick = () => {
    if (isSelected) {
      setSelectedAccount(dummyAccount);
    } else {
      setSelectedAccount(currentAccount);
      bringToTimer();
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleAccountUpdate = (updatedAccount: Account) => {
    setCurrentAccount(updatedAccount);
    if (selectedAccount.accountNumber === updatedAccount.accountNumber) {
      setSelectedAccount(updatedAccount);
    }
  };

  const nextReloadDate = new Date(
    currentAccount.lastReload + (reloadMap.get(currentAccount.reloadFreq) || 0)
  );

  return (
    <div className="relative w-full h-48 sm:h-60">
      <button
        onClick={handleClick}
        className={`w-full h-full relative group transition-all duration-500 transform hover:scale-105 ${
          !isAnySelected ? "" : isSelected ? "opacity-100" : "opacity-20"
        } ${showEditModal ? "pointer-events-none" : ""}`}
      >
        {/* Enhanced edit button with glass morphism */}
        <button
          onClick={handleEditClick}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full shadow-lg shadow-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/40 hover:scale-110"
        >
          <FaGear className="w-4 h-4 text-gray-700" />
        </button>

        {/* Enhanced card background with glass morphism layers */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {/* Base gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${currentAccount.colour}90, ${currentAccount.colour}60)`,
            }}
          />

          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

          {/* Border */}
          <div className="absolute inset-0 rounded-2xl border border-white/30" />
        </div>

        {/* Enhanced card content */}
        <div className="relative h-full p-6 flex flex-col justify-between z-10">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h2 className="text-gray-800 text-lg sm:text-xl font-medium tracking-wide drop-shadow-sm">
              {currentAccount.accountName}
            </h2>
            <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-white/30 backdrop-blur-sm text-gray-700 border border-white/40 shadow-sm hover:bg-white/40 transition-all duration-300">
              <FaClock className="w-4 h-4" />
              <span className="font-semibold">{currentAccount.reloadFreq}</span>
            </div>
          </div>

          {/* Enhanced chip with glass effect */}
          <div className="flex justify-start">
            <div className="relative">
              <Image
                src="/chip.png"
                className="w-10 h-8 sm:w-12 sm:h-10 relative z-10"
                alt="chip"
                width={48}
                height={40}
              />
            </div>
          </div>

          {/* Enhanced footer */}
          <div className="flex justify-between items-end">
            <span className="text-gray-600 text-xs sm:text-sm font-medium drop-shadow-sm">
              •••• {currentAccount.accountNumber.toString().slice(-4)}
            </span>
            <div className="text-right">
              <h3 className="text-gray-800 text-xl sm:text-2xl font-light mb-2 drop-shadow-sm">
                {hours}h {minutes}m {seconds}s
              </h3>
              <div className="inline-block text-xs px-3 py-2 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm">
                <span className="font-medium text-gray-700">
                  {nextReloadDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles for visual interest */}
        <div className="absolute top-3 right-3 w-1 h-1 bg-white/60 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-700 opacity-60"></div>
        <div className="absolute top-1/3 right-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-1000 opacity-60"></div>
      </button>

      {/* Edit Modal */}
      {showEditModal && (
        <EditAccountModal
          account={currentAccount}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleAccountUpdate}
        />
      )}
    </div>
  );
};

export default AccountBox;
