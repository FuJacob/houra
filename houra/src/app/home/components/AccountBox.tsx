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
        className={`w-full h-full relative group transition-all duration-300 transform hover:scale-105 ${
          !isAnySelected ? "" : isSelected ? "opacity-100" : "opacity-20"
        } ${showEditModal ? "pointer-events-none" : ""}`}
      >
        {/* Edit button */}
        <button
          onClick={handleEditClick}
          className="absolute top-4 left-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <FaGear className="w-3 h-3 text-gray-600" />
        </button>

        {/* Card background */}
        <div
          className="absolute inset-0 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(to bottom right, ${currentAccount.colour}, ${currentAccount.colour}80)`,
          }}
        />

        {/* Card content */}
        <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h2 className="text-foreground text-lg sm:text-xl font-medium tracking-wide">
              {currentAccount.accountName}
            </h2>
            <div className="flex items-center gap-2 text-sm px-2 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-foreground/80">
              <FaClock className="w-4 h-4" />
              <span className="font-semibold">{currentAccount.reloadFreq}</span>
            </div>
          </div>

          {/* Chip */}
          <div className="flex justify-start">
            <Image
              src="/chip.png"
              className="w-10 h-8 sm:w-14 sm:h-12"
              alt="chip"
              width={56}
              height={48}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end">
            <span className="text-foreground/60 text-xs sm:text-sm">
              •••• {currentAccount.accountNumber.toString().slice(-4)}
            </span>
            <div className="text-right">
              <h3 className="text-foreground text-xl sm:text-2xl font-light mb-1">
                {hours}h {minutes}m {seconds}s
              </h3>
              <div className="text-xs px-2 py-1 rounded-lg bg-white/15 backdrop-blur-sm">
                <span className="font-medium">
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
