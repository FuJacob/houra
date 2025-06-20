import React from "react";
import { useContext } from "react";
import { selectedAccountContext } from "../../accounts-mode/contexts";
import TransactionCard from "./TransactionCard";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Transaction } from "@/types/types";

const AccountTransactions = () => {
  const { selectedAccount } = useContext(selectedAccountContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    if (selectedAccount) {
      const getTransactions = async (accountId: string) => {
        const supabase = await createClient();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw new Error(userError.message);
        }

        if (!user) {
          throw new Error("User not found");
        }

        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("account_id", accountId);

        if (error) {
          throw new Error(error.message);
        }

        return data;
      };

      getTransactions(selectedAccount.id).then((transactions) =>
        setTransactions(transactions)
      );
    }
  }, [selectedAccount]);
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-2xl rounded-2xl transform -rotate-1"></div>

          <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

            <div className="relative z-10 flex items-center gap-3">
              <h2 className="text-2xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Recent Activity
              </h2>
            </div>
          </div>

          <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        </div>

        {transactions.length > 0 && (
          <div className="text-sm text-gray-500 font-medium">
            {transactions.length} session{transactions.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {transactions.length > 0 ? (
        <div className="h-24 flex gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max p-2">
            {[...transactions]
              .reverse()
              .slice(0, 10) // Show only last 10 transactions
              .map((transaction) => (
                <TransactionCard
                  transaction={transaction}
                  key={transaction.start_time}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="h-24 flex flex-col items-center justify-center px-6 bg-white/10 backdrop-blur-sm rounded-2xl">
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            No sessions yet
          </h3>
          <p className="text-gray-500 text-center text-sm max-w-md">
            Start your first timer session to see your activity history here.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountTransactions;
