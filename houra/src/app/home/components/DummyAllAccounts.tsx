import React from "react";
import AccountBox from "./AccountBox";
import { useContext } from "react";
import { showAddAccountModalContext } from "../contexts";

// Define the Account interface locally
import { Account } from "../../../types/types";

const dummyAccounts: Account[] = [
  {
    accountNumber: 1234567890,
    accountName: "Personal Time",
    accountBalance: 120,
    reloadFreq: "daily",
    colour: "#3B82F6",
    transactions: [],
    type: "growth",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 987654321,
    accountName: "Work Time",
    accountBalance: 80,
    reloadFreq: "weekly",
    colour: "#10B981",
    transactions: [],
    type: "savings",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 1122334455,
    accountName: "Vacation Time",
    accountBalance: 40,
    reloadFreq: "monthly",
    colour: "#F59E0B",
    transactions: [],
    type: "checking",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 5566778899,
    accountName: "Fortnite Gaming",
    accountBalance: 90,
    reloadFreq: "daily",
    colour: "#8B5CF6",
    transactions: [],
    type: "entertainment",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 2233445566,
    accountName: "Studying Biology",
    accountBalance: 150,
    reloadFreq: "weekly",
    colour: "#06B6D4",
    transactions: [],
    type: "education",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 7788990011,
    accountName: "Netflix Streaming",
    accountBalance: 60,
    reloadFreq: "daily",
    colour: "#EF4444",
    transactions: [],
    type: "entertainment",
    lastReload: 0,
    reloadAmount: 0,
  },
];

const AllAccounts = () => {
  const { setShowAddAccountModal } = useContext(showAddAccountModalContext);
  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl font-light text-gray-900">Your Time Accounts</h2>
        <button
          onClick={() => setShowAddAccountModal(true)}
          className="text-sm text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-2"
        >
          <span>Add Account</span>
          <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg leading-none">
            +
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {dummyAccounts.map((account) => (
          <AccountBox key={account.accountNumber} account={account} />
        ))}
      </div>
    </div>
  );
};

export default AllAccounts;
