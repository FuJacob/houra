import React from "react";
import { useContext } from "react";
import { selectedAccountContext } from "../contexts";
import TransactionCard from "./TransactionCard";

const AccountTransactions = () => {
  const { selectedAccount } = useContext(selectedAccountContext);
  return (
    <div className="mb-24 w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-2xl rounded-2xl transform -rotate-1"></div>

          <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Recent Activity
              </h2>
            </div>
          </div>

          <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-lg shadow-black/5"></div>

        <div className="relative z-10 p-8">
          <div className="flex items-center gap-6 w-max">
            {selectedAccount.transactions.length !== 0
              ? [...selectedAccount.transactions]
                  .reverse()
                  .map((transaction) => (
                    <TransactionCard
                      transaction={transaction}
                      key={transaction.startTime}
                    />
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTransactions;
