"use client";
import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import AddAccountModal from "./components/AddAccountModal";
import AccountMenuButton from "./components/AccountMenuButton";
import AllAccounts from "./components/AllAccounts";
import AccountHistory from "./components/AccountTransactions";
import { User, Account } from "@/types/types";
import Navigation from "../components/Navigation";
import {
  showAddAccountModalContext,
  selectedAccountContext,
  CurrentUserContext,
  HomeContext,
} from "./contexts";

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
                  <Navigation />

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
    </HomeContext.Provider>
  );
};

export default Page;
