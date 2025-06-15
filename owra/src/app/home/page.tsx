"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Timer from "./components/Timer";
import AddAccountModal from "./components/AddAccountModal";
import AllAccounts from "./components/AllAccounts";
import AccountHistory from "./components/AccountTransactions";
import { User, Account } from "@/types/types";
import Navigation from "../components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { dummyAccount } from "./utils/dummyAccount";
import {
  showAddAccountModalContext,
  selectedAccountContext,
  CurrentUserContext,
  HomeContext,
} from "./contexts";

import { accountsApi } from "@/lib/api";

const scrollToElement = (element: HTMLDivElement | null) => {
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Page = () => {
  const router = useRouter();
  const timerRef = useRef<HTMLDivElement | null>(null);
  const accountsRef = useRef<HTMLDivElement | null>(null);

  const bringToTimer = () => scrollToElement(timerRef.current);
  const goToAccounts = () => scrollToElement(accountsRef.current);
  const [selectedAccount, setSelectedAccount] = useState<Account>(dummyAccount);

  const [selectedPage, setSelectedPage] = useState("Home");
  const [currentUser, setCurrentUser] = useState<User>({
    created_at: "",
    name: "",
    accounts: [],
  });
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const accounts = await accountsApi.getAccounts();
        setCurrentUser((prev) => ({
          ...prev,
          accounts: accounts || [],
        }));
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchUserAccounts();
  }, []);

  return (
    <HomeContext.Provider value={{ selectedPage, setSelectedPage }}>
      <showAddAccountModalContext.Provider
        value={{ showAddAccountModal, setShowAddAccountModal }}
      >
        <selectedAccountContext.Provider
          value={{
            selectedAccount,
            setSelectedAccount,
            timerRef,
            accountsRef,
            bringToTimer,
            goToAccounts,
          }}
        >
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="min-h-screen flex flex-col justify-center items-center">
              <div
                className="flex justify-center w-screen "
                style={{
                  backgroundColor:
                    selectedAccount.id === "dummy-account"
                      ? "background"
                      : `${selectedAccount.colour}10`,
                }}
                ref={timerRef}
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
                      <div ref={accountsRef}>
                        <AllAccounts />
                      </div>
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
