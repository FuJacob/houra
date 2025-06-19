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
    <div className="flex gap-4 items-center mb-8">
      <h2 className="text-2xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
        Recent Activity
      </h2>

      <div className="flex items-center gap-6 w-max">
        {transactions.length !== 0
          ? [...transactions]
              .reverse()
              .map((transaction) => (
                <TransactionCard
                  transaction={transaction}
                  key={transaction.start_time}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default AccountTransactions;
