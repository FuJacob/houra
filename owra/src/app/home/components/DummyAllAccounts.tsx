import React from "react";
import AccountBox from "./AccountBox";
import { useContext } from "react";
import { showAddAccountModalContext } from "../contexts";

// Define the Account interface locally
import { Account } from "../../../types/types";

const dummyAccounts: Account[] = [
  {
    id: 1234567890,
    account_name: "Personal Time",
    account_balance: 120,
    reload_freq: "daily",
    colour: "#3B82F6",
    transactions: [],
    type: "growth",
    last_reload: 0,
    reloadAmount: 0,
  },
  {
    id: 987654321,
    account_name: "Work Time",
    account_balance: 80,
    reload_freq: "weekly",
    colour: "#10B981",
    transactions: [],
    type: "savings",
    last_reload: 0,
    reloadAmount: 0,
  },
  {
    id: 1122334455,
    account_name: "Vacation Time",
    account_balance: 40,
    reload_freq: "monthly",
    colour: "#F59E0B",
    transactions: [],
    type: "checking",
    last_reload: 0,
    reloadAmount: 0,
  },
  {
    id: 5566778899,
    account_name: "Fortnite Gaming",
    account_balance: 90,
    reload_freq: "daily",
    colour: "#8B5CF6",
    transactions: [],
    type: "entertainment",
    last_reload: 0,
    reloadAmount: 0,
  },
  {
    id: 2233445566,
    account_name: "Studying Biology",
    account_balance: 150,
    reload_freq: "weekly",
    colour: "#06B6D4",
    transactions: [],
    type: "education",
    last_reload: 0,
    reloadAmount: 0,
  },
  {
    id: 7788990011,
    account_name: "Netflix Streaming",
    account_balance: 60,
    reload_freq: "daily",
    colour: "#EF4444",
    transactions: [],
    type: "entertainment",
    last_reload: 0,
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
          <AccountBox key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default AllAccounts;
