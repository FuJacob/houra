"use client";
import React, { useState, useEffect, createContext } from "react";
import Link from "next/link";
import { FaAngleRight, FaHome, FaUniversity } from "react-icons/fa";
import { FaCalendarDay, FaCreditCard, FaList } from "react-icons/fa6";
import Timer from "./components/Timer";
import Sidebar from "./components/Sidebar";
import AccountBox from "./components/AccountBox";
import AddAccountModal from "./components/AddAccountModal";
import AccountMenuButton from "./components/AccountMenuButton";
import {
  HomeContextType,
  AccountContextType,
  User,
  Account,
} from "@/types/types";

export const HomeContext = createContext<HomeContextType>({
  selectedPage: "Home",
  setSelectedPage: () => {},
});

export const selectedAccountContext = createContext<AccountContextType>({
  selectedAccount: 0,
  setSelectedAccount: () => {},
});

const Page = () => {
  const [selectedAccount, setSelectedAccount] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState("Home");
  const [currentUser, setCurrentUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    accounts: [],
  });
  const [newAccount, setNewAccount] = useState<Account>({
    accountNumber: 0,
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
    timeLeft: 0,
  });
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const response = await fetch("http://localhost:4500/api/auth/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();

      if (data.error) {
        console.error(data.error);
        return;
      }
      setCurrentUser(data.user);
    };

    const getAccounts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        const response = await fetch(
          "http://localhost:4500/api/accounts/getAccounts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        const accounts = data.accounts;

        setCurrentUser((prev) => ({
          ...prev,
          accounts: accounts || [],
        }));
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchUser();
    getAccounts();
  }, []);

  return (
    <HomeContext.Provider value={{ selectedPage, setSelectedPage }}>
      <selectedAccountContext.Provider
        value={{ selectedAccount, setSelectedAccount }}
      >
        <div className="flex">
          <Sidebar />
          <div className="w-4/5 flex-col">
            <nav className="flex justify-end items-center py-12">
              <ul className="flex items-center justify-center gap-8">
                <li className="bg-primary px-4 py-2 rounded-full">
                  Earn CA$115
                </li>
                <AccountMenuButton name={currentUser?.name || "User"} />
              </ul>
            </nav>

            <div className="flex-col w-full">
              <Timer />

              <ul className="flex items-center gap-4 overflow-x-auto">
                {currentUser.accounts?.map((account, index) => (
                  <AccountBox
                    key={`${account.accountNumber}-${index}`}
                    accountNumber={account.accountNumber}
                    accountBalance={account.accountBalance}
                    accountName={account.accountName}
                  />
                ))}
                <button
                  onClick={() => setShowAddAccountModal((prev) => !prev)}
                  className="flex justify-center items-center bg-primary w-12 h-12 rounded-full"
                >
                  +
                </button>
              </ul>

              {showAddAccountModal && (
                <AddAccountModal
                  setShowAddAccountModal={setShowAddAccountModal}
                />
              )}

              <div className="py-12">
                <h2 className="text-2xl pb-4">Tasks</h2>
                <div className="bg-gray-200 w-full flex items-center justify-between p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center text-white">
                      +
                    </div>
                    <div className="flex-col">
                      <h3>Adding money paused</h3>
                      <p>We couldn't add money to your balances</p>
                    </div>
                  </div>
                  <div className="rounded-full px-4 py-2 bg-primary">
                    Review
                  </div>
                </div>
              </div>

              <div className="py-12">
                <h2 className="text-2xl pb-4">Transactions</h2>
                <div className="bg-gray-200 w-full flex items-center justify-between p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center text-white">
                      +
                    </div>
                    <div className="flex-col">
                      <h3>Adding money paused</h3>
                      <p>We couldn't add money to your balances</p>
                    </div>
                  </div>
                  <div className="rounded-full px-4 py-2 bg-primary">
                    Review
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </selectedAccountContext.Provider>
    </HomeContext.Provider>
  );
};

export default Page;
