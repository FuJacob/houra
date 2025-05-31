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
    <button className=" flex items-center gap-4 w-96 p-4 bg-white shadow-sm hover:shadow-md rounded-xl border border-gray-200 transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 text-xl">
        <FaClock />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
          <span>{selectedAccount.accountName}</span>
          <span>{formattedDuration}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            {new Date(transaction.startTime).toLocaleTimeString()} –{" "}
            {new Date(transaction.endTime).toLocaleTimeString()}
          </span>
          <span>
            {new Date(transaction.startTime).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </button>
  );
};

export default TransactionCard;
