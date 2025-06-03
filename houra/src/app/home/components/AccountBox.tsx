"use client";
import { FaClock, FaEdit } from "react-icons/fa";
import { selectedAccountContext } from "../contexts";
import { useContext, useState } from "react";
import { Account } from "@/types/types";
import Image from "next/image";
import EditAccountModal from "./EditAccountModal";
import { FaGear } from "react-icons/fa6";

const AccountBox = ({ account }: { account: Account }) => {
  const { selectedAccount, setSelectedAccount, bringToTimer } = useContext(
    selectedAccountContext
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(account);

  const seconds = currentAccount.accountBalance % 60;
  const minutes = Math.floor(currentAccount.accountBalance / 60) % 60;
  const hours = Math.floor(currentAccount.accountBalance / 3600);

  const handleClick = () => {
    if (selectedAccount.accountNumber == currentAccount.accountNumber) {
      setSelectedAccount({
        accountNumber: 0,
        accountName: "",
        accountBalance: 0,
        reloadFreq: "",
        colour: "background",
        transactions: [],
        type: "",
      });
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
    // Update the selected account if this account is currently selected
    if (selectedAccount.accountNumber === updatedAccount.accountNumber) {
      setSelectedAccount(updatedAccount);
    }
  };

  return (
    <div className="relative w-full h-48 sm:h-58">
      <button
        onClick={handleClick}
        className={`w-full h-full relative group transition-all duration-300 transform hover:scale-105 ${
          selectedAccount.accountNumber === 0
            ? ""
            : selectedAccount.accountNumber === currentAccount.accountNumber
            ? "opacity-100"
            : "opacity-20"
        } ${showEditModal ? "pointer-events-none" : ""}`}
      >
        {/* Edit button - top left corner */}
        <button
          onClick={handleEditClick}
          className="absolute top-4 left-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <FaGear className="w-3 h-3 text-gray-600" />
        </button>

        {/* Card background with gradient */}
        <div
          className="absolute inset-0 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(to bottom right, ${currentAccount.colour}, ${currentAccount.colour}80)`,
          }}
        />

        {/* Card content */}
        <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between text-left">
          {/* Top section */}
          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground text-lg sm:text-xl font-medium tracking-wide">
                {currentAccount.accountName}
              </h2>
              <div className=" px-4 py-2 gap-4  rounded-full bg-white/10 flex items-center justify-center">
                <FaClock className="text-foreground/80 w-4 h-4 sm:w-5 sm:h-5" />
                <p>
                  Reloads
                  <span className="font-bold">
                    {" "}
                    {currentAccount.reloadFreq}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/chip.png"
              className="w-10 h-8 sm:w-14 sm:h-12"
              alt="chip"
              width={56}
              height={48}
            />
          </div>
          {/* Bottom section */}
          <div className="flex justify-between items-end">
            <div className="flex items-center text-foreground/60 text-xs sm:text-sm">
              <span>
                •••• {currentAccount.accountNumber.toString().slice(-4)}
              </span>
            </div>
            <h3 className="text-foreground text-xl sm:text-2xl font-light">
              {hours}h {minutes}m {seconds}s
            </h3>
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
