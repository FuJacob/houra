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
import AllAccounts from "./components/AllAccounts";
import AccountHistory from "./components/AccountHistory";
import {
  AccountContextType,
  CurrentUserContextType,
  User,
  Account,
  showAddAccountModalContextType,
} from "@/types/types";

export const showAddAccountModalContext =
  createContext<showAddAccountModalContextType>({
    showAddAccountModal: false,
    setShowAddAccountModal: () => {},
  });

export const selectedAccountContext = createContext<AccountContextType>({
  selectedAccount: {
    accountNumber: 0,
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
    colour: "gray-900",
    transactions: [],
    type: "",
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
    transactions: [],
    type: "",
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
    transactions: [],
    type: "",
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
    <showAddAccountModalContext.Provider
      value={{ showAddAccountModal, setShowAddAccountModal }}
    >
      <selectedAccountContext.Provider
        value={{ selectedAccount, setSelectedAccount }}
      >
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="min-h-screen flex flex-col justify-center items-center">
            <div
              className="flex justify-center w-screen "
              style={{
                backgroundColor:
                  selectedAccount.accountNumber === 0
                    ? "background"
                    : `${selectedAccount.colour}10`,
              }}
            >
              <div className="w-full max-w-7xl">
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
                    {/* Timer Section */}
                    <div className="mb-24">
                      <Timer />
                    </div>
                    <AccountHistory />
                    <AllAccounts />
                  </div>
                </main>

                {showAddAccountModal && (
                  <AddAccountModal
                    setShowAddAccountModal={setShowAddAccountModal}
                  />
                )}
              </div>
            </div>
          </div>
        </CurrentUserContext.Provider>
      </selectedAccountContext.Provider>
    </showAddAccountModalContext.Provider>
  );
};

export default Page;
