"use client";
import React from "react";
import AccountBox from "./AccountBox";
import AddAccountButton from "./AddAccountButton";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Account } from "@/types/types";

const AllAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
    const getAccounts = async () => {
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
        .from("accounts")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    };

    getAccounts().then((accounts) => setAccounts(accounts));
  }, []);
  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-2xl rounded-2xl transform -rotate-1"></div>

          <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

            <div className="relative z-10 flex items-center gap-3">
              <h2 className="text-2xl font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Your Time Accounts
              </h2>
            </div>
          </div>

          <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        </div>
        <AddAccountButton />
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-sm"></div>

        <div className="relative z-10 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {accounts.map((account: Account) => (
              <AccountBox key={account.id} account={account} />
            ))}
            {accounts.length === 0 && (
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAccounts;
