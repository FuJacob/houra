"use client"; // Enables client-side rendering for this component

import { useReducer, useEffect, useState } from "react";
import { reducer, setRunning, setTimeLeft } from "./TimeReducer";
import { useContext } from "react";
import { selectedAccountContext } from "../contexts";
import { FaArrowDown, FaExpand, FaCompress } from "react-icons/fa6";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// Timer component displays and controls a countdown timer
export default function Timer() {
  const [start_time, setstart_time] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Account interface defines the expected structure of an account object

  // Accessing the selected account from context
  const { selectedAccount, goToAccounts } = useContext(selectedAccountContext);

  // Reducer state contains whether the timer is running and the time left in seconds
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: selectedAccount.account_balance, // Initial time in seconds (17 minutes)
  });

  // Separate state values for hours, minutes, and seconds display
  const hoursLeft = Math.floor(state.timeLeft / 3600);
  const minutesLeft = Math.floor((state.timeLeft % 3600) / 60);
  const secondsLeft = state.timeLeft % 60;

  // changed selected Account?
  useEffect(() => {
    dispatch(setRunning(false));
    dispatch(setTimeLeft(selectedAccount.account_balance));
    console.log("CHANGED ACCOUNT");
    console.log(selectedAccount);
    console.log(`border-${selectedAccount.colour}`);
  }, [selectedAccount]);

  // update time if timer is running
  useEffect(() => {
    if (state.timeLeft <= 0) {
      dispatch(setRunning(false));
    }

    if (state.running) {
      const interval = setInterval(() => {
        dispatch(setTimeLeft(state.timeLeft - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.running, state.timeLeft]);

  useEffect(() => {
    const syncTransaction = async () => {
      if (!state.running && start_time && start_time !== 0) {
        try {
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

          const end_time = Date.now();

          const newTransaction = {
            id: selectedAccount.id,
            start_time: new Date(start_time).toISOString(),
            end_time: new Date(end_time).toISOString(),
            duration: end_time - start_time,
          };

          // Check if account belongs to user
          const { data: account, error: accountError } = await supabase
            .from("accounts")
            .select("*")
            .eq("id", selectedAccount.id)
            .eq("user_id", user.id)
            .single();

          if (accountError || !account) {
            throw new Error("Account does not belong to user");
          }

          // Add transaction
          const { error: transactionError } = await supabase
            .from("transactions")
            .insert({
              ...newTransaction,
              account_id: account.id,
            });

          if (transactionError) {
            throw new Error(transactionError.message);
          }

          setstart_time(0);

          // Update account
          const { error: updateError } = await supabase
            .from("accounts")
            .update({
              ...selectedAccount,
              account_balance: state.timeLeft,
            })
            .eq("id", selectedAccount.id!);

          if (updateError) {
            throw new Error(updateError.message);
          }

          console.log("Account updated successfully");
        } catch (error) {
          console.error("Failed to update account", error);
        }
      }
    };

    syncTransaction();
  }, [
    state.running,
    selectedAccount.id,
    start_time,
    state.timeLeft,
    selectedAccount,
  ]);

  // Fullscreen functionality
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error attempting to enable fullscreen:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error("Error attempting to exit fullscreen:", err);
        });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Calculate progress percentage
  const progressPercentage =
    selectedAccount.id !== "dummy-account"
      ? ((selectedAccount.account_balance - state.timeLeft) /
          selectedAccount.account_balance) *
        100
      : 0;

  // update time
  return (
    <div className="relative flex flex-col items-center justify-center p-6 sm:p-12 transition-all duration-500 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10">
      {/* Progress Border */}
      {selectedAccount.id !== "dummy-account" && (
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          {/* Top border */}
          <div
            className="absolute top-0 left-0 h-1 transition-all duration-1000 ease-linear rounded-tl-3xl"
            style={{
              width: `${Math.min(progressPercentage * 4, 100)}%`,
              backgroundColor: selectedAccount.colour,
              boxShadow: `0 0 10px ${selectedAccount.colour}80`,
            }}
          />
          {/* Right border */}
          <div
            className="absolute top-0 right-0 w-1 transition-all duration-1000 ease-linear rounded-tr-3xl"
            style={{
              height: `${Math.min(Math.max(progressPercentage * 4 - 100, 0), 100)}%`,
              backgroundColor: selectedAccount.colour,
              boxShadow: `0 0 10px ${selectedAccount.colour}80`,
            }}
          />
          {/* Bottom border */}
          <div
            className="absolute bottom-0 right-0 h-1 transition-all duration-1000 ease-linear rounded-br-3xl"
            style={{
              width: `${Math.min(Math.max(progressPercentage * 4 - 200, 0), 100)}%`,
              backgroundColor: selectedAccount.colour,
              boxShadow: `0 0 10px ${selectedAccount.colour}80`,
              transform: "scaleX(-1)",
            }}
          />
          {/* Left border */}
          <div
            className="absolute bottom-0 left-0 w-1 transition-all duration-1000 ease-linear rounded-bl-3xl"
            style={{
              height: `${Math.min(Math.max(progressPercentage * 4 - 300, 0), 100)}%`,
              backgroundColor: selectedAccount.colour,
              boxShadow: `0 0 10px ${selectedAccount.colour}80`,
              transform: "scaleY(-1)",
            }}
          />
        </div>
      )}
      {/* Enhanced account header */}
      <div className="text-xl font-medium flex flex-col gap-4 justify-center w-full h-[80px] text-center mb-2">
        {selectedAccount.id === "dummy-account" ? (
          <div className="flex flex-col items-center justify-center h-full space-y-3">
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg">
              <p className="text-gray-700 font-medium">Account Mode</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <div className="px-8 py-4 rounded-2xl shadow-lg border border-white/30 backdrop-blur-sm">
              <h2 className="text-gray-800 font-medium text-xl">
                {selectedAccount.account_name}
              </h2>
            </div>
          </div>
        )}
        <Link
          href="/flex-mode"
          className="text-sm flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors underline decoration-1 underline-offset-2 font-medium"
        >
          Or switch to flex-mode →
        </Link>
      </div>

      {/* Enhanced main timer display */}
      <div className="text-center mb-12 p-8 sm:p-16 relative">
        {/* Timer background with glass morphism */}

        <div className="relative z-10">
          <h1
            className="font-mono text-[120px] sm:text-[200px] leading-none tracking-tighter font-light drop-shadow-lg"
            style={{
              color: `${
                selectedAccount.id === "dummy-account"
                  ? "#374151"
                  : selectedAccount.colour
              }`,
            }}
          >
            {hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}:
            {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
            {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
          </h1>
          <div className="mt-6 px-6 py-3">
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              {state.timeLeft < 60
                ? `Less than a minute remaining`
                : `${hoursLeft} hours, ${minutesLeft} minutes remaining`}
            </p>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-6 right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Controls */}
      <div className="flex gap-6 mb-8">
        <button
          onClick={() => dispatch(setRunning(!state.running))}
          disabled={state.timeLeft <= 0}
          className="group px-10 py-5 bg-gray-900/90 backdrop-blur-sm text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 text-xl font-medium shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.05] border border-gray-800/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="group-hover:text-white/90 transition-colors">
            {state.running ? "Pause" : "Start"}
          </span>
        </button>

        <button
          onClick={() => {
            dispatch(setRunning(false));
            dispatch(setTimeLeft(selectedAccount.account_balance));
          }}
          disabled={selectedAccount.id === "dummy-account"}
          className="group px-10 py-5 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 rounded-2xl hover:bg-white/30 hover:border-white/40 transition-all duration-300 text-xl font-medium shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.05] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="group-hover:text-gray-900 transition-colors">
            Reset
          </span>
        </button>
      </div>

      {/* Enhanced account selection prompt */}
      {selectedAccount.id === "dummy-account" && (
        <div className="text-center">
          <div className="inline-flex items-center rounded-full px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
            <button
              onClick={goToAccounts}
              className=" p-2 text-gray-800 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <FaArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 p-3 bg-white/80 hover:bg-white/90 rounded-full shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <FaCompress className="w-4 h-4 text-gray-700" />
        ) : (
          <FaExpand className="w-4 h-4 text-gray-700" />
        )}
      </button>
    </div>
  );
}
