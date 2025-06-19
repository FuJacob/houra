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
    <button className="relative flex items-center gap-4 w-96 p-6 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md shadow-md hover:scale-[1.02] transition-transform duration-300">
      <FaClock className="text-gray-700 text-lg" />

      <div className="flex flex-col flex-1">
        <div className="flex justify-between text-sm font-medium text-gray-800 mb-2 drop-shadow-sm">
          <span>{selectedAccount.account_name}</span>
          <span className="px-3 py-1 bg-white/40 rounded-full border border-white/40 text-gray-700">
            {formattedDuration}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>
            {new Date(transaction.start_time).toLocaleTimeString()} –{" "}
            {new Date(transaction.end_time).toLocaleTimeString()}
          </span>
          <span className="font-medium">
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
