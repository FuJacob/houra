import React from "react";
import AccountBox from "./AccountBox";
import { useContext } from "react";
import { CurrentUserContext, showAddAccountModalContext } from "../page";

const AllAccounts = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { setShowAddAccountModal } = useContext(showAddAccountModalContext);
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUser.accounts?.map((account) => (
          <AccountBox key={account.accountNumber} account={account} />
        ))}
        {currentUser.accounts?.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No time accounts yet</p>
            <button
              onClick={() => setShowAddAccountModal(true)}
              className="text-sm text-gray-900 hover:text-gray-700 transition-colors inline-flex items-center gap-2"
            >
              Create your first account
              <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg leading-none">
                +
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAccounts;
