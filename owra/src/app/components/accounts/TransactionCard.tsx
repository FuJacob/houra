import React from "react";
import { FaClock } from "react-icons/fa";
import { Transaction } from "@/types/types";
import { selectedAccountContext } from "../../accounts-mode/contexts";
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
    <button className="relative flex items-center gap-2 w-64 p-3 rounded-lg border border-white/40 bg-white/30 backdrop-blur-md shadow-md hover:scale-[1.02] transition-transform duration-300">
      <FaClock className="text-gray-700 text-xs flex-shrink-0" />

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-center text-xs font-medium text-gray-800 mb-1 drop-shadow-sm">
          <span className="truncate pr-1">{selectedAccount.account_name}</span>
          <span className="px-1.5 py-0.5 bg-white/40 rounded-full border border-white/40 text-gray-700 text-xs shrink-0">
            {formattedDuration}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-600">
          <span className="truncate pr-1">
            {new Date(transaction.start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            –{" "}
            {new Date(transaction.end_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="font-medium shrink-0">
            {new Date(transaction.start_time).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </button>
  );
};

export default TransactionCard;
