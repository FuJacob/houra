import React from "react";
import AccountBox from "./AccountBox";
import { useContext } from "react";
import { selectedAccountContext } from "../page";
import { FaClock } from "react-icons/fa";
import TransactionCard from "./TransactionCard";

const AllAccounts = () => {
  const { selectedAccount } = useContext(selectedAccountContext);
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-light text-gray-900">
          Account Transactions History
        </h2>
      </div>
      <div className="flex items-center">
        {selectedAccount.transactions.length !== 0
          ? selectedAccount.transactions.map((transaction, key) => (
              <TransactionCard transaction={transaction} />
            ))
          : "No transactions yet"}
      </div>
    </div>
  );
};

export default AllAccounts;
