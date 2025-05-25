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
  CurrentUserContextType,
  User,
  Account,
} from "@/types/types";

export const HomeContext = createContext<HomeContextType>({
  selectedPage: "Home",
  setSelectedPage: () => {},
});

export const selectedAccountContext = createContext<AccountContextType>({
  selectedAccount: {
    accountNumber: 0,
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
    colour: "gray-900",
  },
  setSelectedAccount: () => {},
});

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: {
    name: "",
    email: "",
    password: "",
    accounts: [],
  },
  setCurrentUser: () => {},
});

const Page = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account>({
    accountNumber: 0,
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
    colour: "gray-900",
  });

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
    colour: "gray-900",
  });

  const [accounts, setAccounts] = useState<Account[]>([]);
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
    <selectedAccountContext.Provider
      value={{ selectedAccount, setSelectedAccount }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-xl font-light tracking-tight text-gray-900">
                  houra
                </h1>
                <div className="flex items-center space-x-8">
                  <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    Earn Points
                  </button>
                  <div className="h-4 w-px bg-gray-200"></div>
                  <AccountMenuButton name={currentUser?.name || "User"} />
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <div className="py-12">
              {/* Welcome Section */}
              <div className="text-center ">
                <h2 className="text-4xl font-light text-gray-900">
                  Glad to see you, {currentUser.name.split(" ")[0]}
                </h2>
              </div>

              {/* Timer Section */}
              <div className="mb-24">
                <Timer />
              </div>

              {/* Accounts Section */}
              <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-light text-gray-900">
                    Your Time Accounts
                  </h2>
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
            </div>
          </main>

          {showAddAccountModal && (
            <AddAccountModal setShowAddAccountModal={setShowAddAccountModal} />
          )}
        </div>
      </CurrentUserContext.Provider>
    </selectedAccountContext.Provider>
  );
};

export default Page;
