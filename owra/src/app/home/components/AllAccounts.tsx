import React from "react";
import AccountBox from "./AccountBox";
import { useContext } from "react";
import { CurrentUserContext, showAddAccountModalContext } from "../contexts";

const AllAccounts = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { setShowAddAccountModal } = useContext(showAddAccountModalContext);
  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-2xl rounded-2xl transform -rotate-1"></div>

          <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Your Time Accounts
              </h2>
            </div>
          </div>

          <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        </div>

        <button
          onClick={() => setShowAddAccountModal(true)}
          className="group relative px-6 py-3 transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-xl rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>

          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 transition-all duration-300"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
              Add Account
            </span>
            <div className="relative">
              <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-full transform rotate-3"></div>
              <div className="relative w-6 h-6 rounded-full bg-gray-900/90 backdrop-blur-sm text-white flex items-center justify-center text-sm leading-none border border-gray-800/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                +
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-sm"></div>

        <div className="relative z-10 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentUser.accounts?.map((account) => (
              <AccountBox key={account.id} account={account} />
            ))}
            {currentUser.accounts?.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full transform rotate-3"></div>
                  <div className="relative bg-white/30 backdrop-blur-sm rounded-full p-6 border border-white/40 shadow-lg">
                    <div className="w-16 h-16 text-gray-400 text-6xl">💳</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-700 mb-3">
                    No time accounts yet
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Create your first time account to start managing your
                    activities like a financial portfolio
                  </p>
                </div>

                <button
                  onClick={() => setShowAddAccountModal(true)}
                  className="group relative px-8 py-4 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-xl rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>

                  <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm border border-gray-800/20 rounded-2xl shadow-lg shadow-gray-900/25 group-hover:shadow-xl group-hover:shadow-gray-900/30 transition-all duration-300"></div>

                  <div className="relative z-10 flex items-center gap-3">
                    <span className="text-white font-medium group-hover:text-white/90 transition-colors">
                      Create your first account
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-sm leading-none border border-white/30 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      +
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAccounts;
