import React from "react";
import { useContext } from "react";
import { selectedAccountContext } from "../contexts";
import TransactionCard from "./TransactionCard";

const AccountTransactions = () => {
  const { selectedAccount } = useContext(selectedAccountContext);
  return (
    <div className="mb-16 w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-light text-gray-900">
          Account Transactions History
        </h2>
      </div>
      <div className="">
        <div className="flex items-center gap-4 w-max">
          {selectedAccount.transactions.length !== 0
            ? [...selectedAccount.transactions]
                .reverse()
                .map((transaction) => (
                  <TransactionCard
                    transaction={transaction}
                    key={transaction.startTime}
                  />
                ))
            : "No transactions yet"}
        </div>
      </div>
    </div>
  );
};

export default AccountTransactions;
