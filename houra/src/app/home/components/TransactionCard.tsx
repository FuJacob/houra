import React from "react";
import { FaClock } from "react-icons/fa";
import { Transaction } from "@/types/types";
import { selectedAccountContext } from "../contexts";
import { useContext } from "react";

type TransactionCardProps = {
  transaction: Transaction;
};

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const { selectedAccount } = useContext(selectedAccountContext);
  const totalSeconds = Math.floor(transaction.duration / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedDuration = `${hours}h ${minutes}m ${seconds}s`;

  return (
    <button className="group relative flex items-center gap-4 w-96 p-6 transition-all duration-300 hover:scale-[1.02]">
      {/* Enhanced background with glass morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-xl rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>

      {/* Main card container */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 transition-all duration-300"></div>

      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 w-full">
        {/* Enhanced icon container */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full transform rotate-3"></div>
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FaClock className="text-gray-700 text-lg" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between text-sm font-medium text-gray-800 mb-2 drop-shadow-sm">
            <span>{selectedAccount.accountName}</span>
            <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full border border-white/40 text-gray-700">
              {formattedDuration}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>
              {new Date(transaction.startTime).toLocaleTimeString()} –{" "}
              {new Date(transaction.endTime).toLocaleTimeString()}
            </span>
            <span className="font-medium">
              {new Date(transaction.startTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-3 right-3 w-1 h-1 bg-white/60 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-700 opacity-60"></div>
    </button>
  );
};

export default TransactionCard;
