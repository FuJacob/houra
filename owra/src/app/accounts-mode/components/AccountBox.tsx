"use client";
import { FaClock, FaSyncAlt } from "react-icons/fa";
import { selectedAccountContext } from "../contexts";
import { useContext, useState } from "react";
import { Account } from "@/types/types";
import EditAccountModal from "./EditAccountModal";
import { FaArrowUp, FaGear } from "react-icons/fa6";
import { dummyAccount } from "../utils/dummyAccount";

const AccountBox = ({
  account,
  isDummy = false,
}: {
  account: Account;
  isDummy?: boolean;
}) => {
  const context = useContext(selectedAccountContext);
  const { selectedAccount, setSelectedAccount, bringToTimer } = context || {
    selectedAccount: { id: 0 },
    setSelectedAccount: () => {},
    bringToTimer: () => {},
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(account);

  const seconds = currentAccount.account_balance % 60;
  const minutes = Math.floor(currentAccount.account_balance / 60) % 60;
  const hours = Math.floor(currentAccount.account_balance / 3600);

  const isSelected = !isDummy && selectedAccount.id === currentAccount.id;
  const isAnySelected = !isDummy && selectedAccount.id !== "dummy-account";

  const handleClick = () => {
    if (isDummy) return;
    if (isSelected) {
      setSelectedAccount(dummyAccount);
    } else {
      setSelectedAccount(currentAccount);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    if (isDummy) return;
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleTimerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    bringToTimer();
  };

  const handleAccountUpdate = (updatedAccount: Account) => {
    setCurrentAccount(updatedAccount);
    if (selectedAccount.id === updatedAccount.id) {
      setSelectedAccount(updatedAccount);
    }
  };

  const nextReloadDate = new Date(
    new Date(currentAccount.last_reload).getTime() +
      (currentAccount.reload_freq || 0)
  );

  return (
    <div className="relative w-full h-48 sm:h-60">
      {/* Main clickable div instead of button */}
      <div
        onClick={handleClick}
        role="button"
        className={`w-full h-full relative group transition-all duration-500 transform hover:scale-105 cursor-pointer ${
          !isAnySelected ? "" : isSelected ? "opacity-100" : "opacity-20"
        } ${showEditModal ? "pointer-events-none" : ""}`}
      >
        {/* Enhanced edit button with glass morphism - only show if not dummy */}
        {!isDummy && (
          <button
            onClick={handleEditClick}
            className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full shadow-lg shadow-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/40 hover:scale-110"
          >
            <FaGear className="w-4 h-4 text-gray-700" />
          </button>
        )}

        {isSelected && !isDummy && (
          <div className="absolute inset-0 flex justify-center z-50 items-center">
            <button
              onClick={handleTimerClick}
              className="bg-white/30 animate-bounce animate-duration-200 animate-ease-in-out animate-infinite backdrop-blur-sm hover:bg-white/50 rounded-full shadow-lg shadow-black/10 flex items-center justify-center transition-all duration-300 border border-white/40 hover:scale-110 w-10 h-10"
            >
              <FaArrowUp className="text-2xl text-gray-700 " />
            </button>
          </div>
        )}

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
            <h2 className="text-gray-800 text-start sm:text-3xl font-bold tracking-wide drop-shadow-sm">
              {currentAccount.account_name}
            </h2>
            <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-white/30 backdrop-blur-sm text-gray-700 border border-white/40 shadow-sm hover:bg-white/40 transition-all duration-300"></div>
          </div>

          {/* Enhanced footer */}
          <div className="flex justify-between items-end">
            <div className="text-right">
              <div className="inline-block flex flex-col space-y-2 justify-center text-xs px-3 py-2 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm">
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span className="font-semibold">
                    {currentAccount.reload_freq}
                  </span>
                </div>
                <div className="font-medium text-gray-700 flex items-center gap-2">
                  <FaSyncAlt />
                  {(() => {
                    const msPerDay = 1000 * 60 * 60 * 24;
                    const daysLeft = Math.floor(
                      (nextReloadDate.getTime() - Date.now()) / msPerDay
                    );

                    const timeStr = nextReloadDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });

                    if (daysLeft <= 0) return `Today at ${timeStr}`;
                    if (daysLeft === 1) return `Tomorrow at ${timeStr}`;
                    return `In ${daysLeft} days at ${timeStr}`;
                  })()}
                </div>
              </div>
            </div>

            <h3 className="text-gray-800 text-xl sm:text-3xl font-light mb-2 drop-shadow-sm">
              {hours}h {minutes}m {seconds}s
            </h3>
          </div>
        </div>

        {/* Floating particles for visual interest */}
        <div className="absolute top-3 right-3 w-1 h-1 bg-white/60 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-700 opacity-60"></div>
        <div className="absolute top-1/3 right-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-1000 opacity-60"></div>
      </div>

      {/* Edit Modal - only show if not dummy */}
      {showEditModal && !isDummy && (
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
