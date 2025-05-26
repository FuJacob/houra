"use client";
import { FaUniversity } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { selectedAccountContext } from "../page";
import { useContext } from "react";
import { Account } from "@/types/types";

const AccountBox = ({ account }: { account: Account }) => {
  const { selectedAccount, setSelectedAccount } = useContext(
    selectedAccountContext
  );
  const seconds = account.accountBalance % 60;
  const minutes = Math.floor(account.accountBalance / 60) % 60;
  const hours = Math.floor(account.accountBalance / 3600);
  console.log(account.colour);
  return (
    <button
      onClick={() => {
        if (selectedAccount.accountNumber == account.accountNumber) {
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
          setSelectedAccount(account);
        }
      }}
      className={`w-full h-48 sm:h-58 relative group transition-all duration-300 transform hover:scale-105 ${
        selectedAccount.accountNumber === 0
          ? ""
          : selectedAccount.accountNumber === account.accountNumber
          ? "opacity-100"
          : "opacity-20"
      }`}
    >
      {/* Card background with gradient */}
      <div
        className="absolute inset-0 rounded-xl shadow-lg"
        style={{
          background: `linear-gradient(to bottom right, ${account.colour}, ${account.colour}80)`,
        }}
      />

      {/* Card content */}
      <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between text-left">
        {/* Top section */}
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-lg sm:text-xl font-medium tracking-wide">
              {account.accountName}
            </h2>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
              <FaClock className="text-foreground/80 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
        <div>
          <img src="chip.png" className="w-10 h-8 sm:w-14 sm:h-12" alt="chip" />
        </div>
        {/* Bottom section */}
        <div className="flex justify-between items-end">
          <div className="flex items-center text-foreground/60 text-xs sm:text-sm">
            <span>•••• {account.accountNumber.toString().slice(-4)}</span>
          </div>
          <h3 className="text-foreground text-xl sm:text-2xl font-light">
            {hours}h {minutes}m {seconds}s
          </h3>
        </div>
      </div>
    </button>
  );
};

export default AccountBox;
