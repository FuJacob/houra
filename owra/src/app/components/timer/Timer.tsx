"use client"; // Enables client-side rendering for this component

import { useEffect, useState } from "react";
import { useContext } from "react";
import { selectedAccountContext } from "../../accounts-mode/contexts";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import StartPauseButton from "./StartPauseButton";
import ResetButton from "./ResetButton";
import AccountSelectionPrompt from "./AccountSelectionPrompt";
import { FaGear } from "react-icons/fa6";
import { FaSyncAlt } from "react-icons/fa";
import { usePictureInPicture } from "./popup/usePictureInPicture";
import { formatTime } from "@/utils/timer";

// Timer component displays and controls a countdown timer
export default function Timer() {
  const [start_time, setstart_time] = useState(0);

  // Account interface defines the expected structure of an account object

  // Accessing the selected account from context
  const { selectedAccount, goToAccounts } = useContext(selectedAccountContext);

  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedAccount.account_balance);

  // Separate state values for hours, minutes, and seconds display
  const hoursLeft = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = timeLeft % 60;

  // Use Picture-in-Picture hook
  usePictureInPicture({
    selectedAccount,
    state: { running: isRunning, timeLeft },
    hoursLeft,
    minutesLeft,
    secondsLeft,
    formatTime,
  });

  // changed selected Account?
  useEffect(() => {
    setIsRunning(false);
    setTimeLeft(selectedAccount.account_balance);
  }, [selectedAccount]);

  // update time if timer is running
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRunning(false);
    }

    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const syncTransaction = async () => {
      if (!isRunning && start_time && start_time !== 0) {
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
            .update({ account_balance: timeLeft })
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
  }, [isRunning, selectedAccount.id, start_time, timeLeft]);

  // Helper function to get next reload time
  const getNextReloadTime = () => {
    if (selectedAccount.id === "dummy-account") return "Select an account";

    const nextReloadDate = new Date(
      selectedAccount.last_reload + selectedAccount.reload_freq
    );

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysLeft = Math.floor(
      (nextReloadDate.getTime() - Date.now()) / msPerDay
    );

    const timeStr = nextReloadDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (daysLeft <= 0) return `Today at ${timeStr}`;
    if (daysLeft === 1) return `Tomorrow at ${timeStr}`;
    return `In ${daysLeft} days at ${timeStr}`;
  };

  const handleEditAccount = () => {
    // Handle edit account logic here
    console.log("Edit account clicked");
  };

  // update time
  return (
    <div className="relative flex flex-col items-center justify-center p-6 sm:p-12 transition-all duration-500 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10">
      {/* Header with Settings, Account Name, and Reload Info */}
      {/* Header: Gear | Account Name | Reload */}
      <div className="w-full max-w-2xl mx-auto mb-8 px-4 flex items-center justify-center gap-4">
        {/* Gear (left) */}
        <button
          onClick={handleEditAccount}
          className="absolute left-3/5 p-3 rounded-full shadow bg-white/10 border border-white/20 text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors"
          disabled={selectedAccount.id === "dummy-account"}
        >
          <FaGear className="w-5 h-5" />
        </button>

        {/* Account Name (center, grows) */}
        <div className="relative text-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow px-8 py-3 flex items-center justify-center flex-col">
          <span className="text-lg font-medium text-gray-800">
            {selectedAccount.id === "dummy-account"
              ? "Account Mode"
              : selectedAccount.account_name}
          </span>
          <div className=" flex items-center gap-2 text-xs text-gray-700">
            <FaSyncAlt className="w-3 h-3" />
            <span className="font-medium">{getNextReloadTime()}</span>
          </div>
        </div>

        {/* Reload info (right) */}
      </div>

      {/* Flex Mode Link */}
      <div className="text-center mb-4">
        <Link
          href="/flex-mode"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors underline decoration-1 underline-offset-2 font-medium"
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
              {timeLeft < 60
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
          isRunning={isRunning}
          timeLeft={timeLeft}
          onClick={() => {
            if (!isRunning && start_time === 0) {
              setstart_time(Date.now());
            }
            setIsRunning(!isRunning);
          }}
        />

        <ResetButton
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(selectedAccount.account_balance);
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
