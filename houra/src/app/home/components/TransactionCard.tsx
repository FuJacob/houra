import React from "react";
import { FaClock } from "react-icons/fa";
import { Transaction } from "@/types/types";
type TransactionCardProps = {
  transaction: Transaction;
};
const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <button className="flex items-center gap-4 w-full max-w-xl p-4 bg-white shadow-sm hover:shadow-md rounded-xl border border-gray-200 transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-700 text-xl">
        <FaClock />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
          <span>Valorant Game</span>
          <span>1h 26m</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>12:00 PM – 1:26 PM EST</span>
          <span>May 25, 2025</span>
        </div>
      </div>
    </button>
  );
};

export default TransactionCard;
