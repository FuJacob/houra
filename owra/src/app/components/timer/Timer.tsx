"use client"; // Enables client-side rendering for this component

import { useReducer, useEffect, useState } from "react";
import { reducer, setRunning, setTimeLeft } from "./TimeReducer";
import { useContext } from "react";
import { selectedAccountContext } from "../../accounts-mode/contexts";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import StartPauseButton from "./StartPauseButton";
import ResetButton from "./ResetButton";
import AccountSelectionPrompt from "./AccountSelectionPrompt";

// Timer component displays and controls a countdown timer
export default function Timer() {
  const [start_time, setstart_time] = useState(0);

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

          if (userError || !user) {
            console.error(
              "Authentication error:",
              userError?.message || "No user found"
            );
            return;
          }

          const end_time = Date.now();
          const newTransaction = {
            account_id: selectedAccount.id,
            start_time: new Date(start_time).toISOString(),
            end_time: new Date(end_time).toISOString(),
            duration: end_time - start_time,
          };

          // Verify account ownership
          const { data: account, error: accountError } = await supabase
            .from("accounts")
            .select("*")
            .eq("id", selectedAccount.id)
            .eq("user_id", user.id)
            .single();

          if (accountError || !account) {
            console.error(
              "Account verification failed:",
              accountError?.message
            );
            return;
          }

          // Insert transaction
          const { error: transactionError } = await supabase
            .from("transactions")
            .insert(newTransaction);

          if (transactionError) {
            console.error(
              "Transaction insertion failed:",
              transactionError.message
            );
            return;
          }

          // Update account balance
          const { error: updateError } = await supabase
            .from("accounts")
            .update({ account_balance: state.timeLeft })
            .eq("id", selectedAccount.id);

          if (updateError) {
            console.error("Account update failed:", updateError.message);
            return;
          }

          setstart_time(0);
        } catch (error) {
          console.error("Transaction sync failed:", error);
        }
      }
    };

    syncTransaction();
  }, [state.running, selectedAccount.id, start_time, state.timeLeft]);

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
              color: `${selectedAccount.colour}`,
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
        <StartPauseButton
          isRunning={state.running}
          timeLeft={state.timeLeft}
          onClick={() => {
            if (!state.running && start_time === 0) {
              setstart_time(Date.now());
            }
            dispatch(setRunning(!state.running));
          }}
        />

        <ResetButton
          onClick={() => {
            dispatch(setRunning(false));
            dispatch(setTimeLeft(selectedAccount.account_balance));
            setstart_time(0);
          }}
          disabled={selectedAccount.id === "dummy-account"}
        />
      </div>

      {/* Enhanced account selection prompt */}
      {selectedAccount.id === "dummy-account" && (
        <AccountSelectionPrompt onGoToAccounts={goToAccounts} />
      )}
    </div>
  );
}
