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
      className={`w-full h-58 relative group transition-all duration-300 transform hover:scale-105 ${
        selectedAccount.accountNumber === 0
          ? ""
          : selectedAccount.accountNumber === account.accountNumber
          ? "opacity-100"
          : "opacity-20"
      }`}
    >
      {/* Card background with creative slashes */}
      <div className="absolute inset-0 rounded-xl shadow-lg bg-background overflow-hidden">
        {/* Account colour slash */}
        <div
          className="absolute -left-1/2 top-0 w-full h-full rotate-12"
          style={{
            background: account.colour,
            opacity: 0.08,
          }}
        />

        {/* Type slash */}
        {account.type === "growth" && (
          <div className="absolute -left-1/2 top-0 w-full h-full rotate-12">
            <div className="w-full h-full bg-[url('/leaf.png')] bg-no-repeat bg-[length:auto_100%] bg-right opacity-50" />
          </div>
        )}
        {account.type === "burn" && (
          <div className="absolute -left-1/2 top-0 w-full h-full rotate-12">
            <div className="w-full h-full bg-red-400/20 bg-[url('/fire.png')] bg-no-repeat bg-center bg-contain opacity-50" />
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="relative h-full p-6 flex flex-col justify-between text-left">
        {/* Top section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-xl font-medium tracking-wide">
              {account.accountName}
            </h2>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <FaClock className="text-foreground/80" />
            </div>
          </div>
        </div>
        <div>
          {" "}
          <img src="chip.png" className="w-14 h-12" />
        </div>
        {/* Bottom section */}
        <div className="flex justify-between items-end">
          <div className="flex items-center text-foreground/60 text-sm">
            <span>•••• {account.accountNumber.toString().slice(-4)}</span>
          </div>
          <h3 className="text-foreground text-2xl font-light">
            {hours}h {minutes}m {seconds}s
          </h3>
        </div>
      </div>
    </button>
  );
};

export default AccountBox;
