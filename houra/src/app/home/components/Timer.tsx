"use client"; // Enables client-side rendering for this component

import { useReducer, useEffect, useState } from "react";
import { reducer, setRunning, setTimeLeft } from "./TimeReducer";
import { useContext } from "react";
import { selectedAccountContext } from "../page";

interface Account {
  accountNumber: number;
  accountName: string;
  accountBalance: number;
  reloadFreq: string;
}
// Timer component displays and controls a countdown timer
export default function Timer() {
  // Account interface defines the expected structure of an account object

  // Accessing the selected account from context
  const { selectedAccount } = useContext(selectedAccountContext);

  // Reducer state contains whether the timer is running and the time left in seconds
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: selectedAccount.accountBalance, // Initial time in seconds (17 minutes)
  });

  // Separate state values for hours, minutes, and seconds display
  const hoursLeft = Math.floor(state.timeLeft / 3600);
  const minutesLeft = Math.floor((state.timeLeft % 3600) / 60);
  const secondsLeft = state.timeLeft % 60;

  // changed selected Account?
  useEffect(() => {
    dispatch(setRunning(false));
    dispatch(setTimeLeft(selectedAccount.accountBalance));
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
    const updateAccount = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(
          "http://localhost:4500/api/accounts/updateAccount",
          {
            method: "PATCH",
            body: JSON.stringify({
              accountNumber: selectedAccount.accountNumber,
              accountBalance: state.timeLeft,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Failed to update account", response.statusText);
        }
      } catch (error) {
        console.error("Failed to update account", error);
      }
    };
    updateAccount();
  }, [state.running]);

  // update time
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 border-background border-6 transition-all duration-300 rounded-2xl`}
      style={{
        borderColor: selectedAccount.colour,
      }}
    >
      <div className="text-5xl font-light flex justify-between w-full h-[60px]">
        {selectedAccount.accountNumber === 0
          ? ""
          : selectedAccount.accountName}
      </div>

      {/* Main timer display */}
      <div className="text-center mb-8 p-16">
        <h1 className="font-mono text-[200px] leading-none tracking-tighter text-gray-900 font-light">
          {hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}:
          {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
          {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          {state.timeLeft < 60
            ? `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds remaining`
            : `${hoursLeft} hours, ${minutesLeft} minutes remaining`}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => dispatch(setRunning(!state.running))}
          className={`
            px-12 py-4 rounded-full text-lg font-medium transition-all
            ${
              selectedAccount.accountNumber === 0
                ? "bg-gray-50 text-gray-200 cursor-not-allowed"
                : state.running
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            }
          `}
        >
          {state.running ? "Pause" : "Start"}
        </button>
      </div>

      <div className="flex text-2xl justify-between items-end w-full mt-8">
        <div className="flex items-center text-foreground/60">
          <span>
            {selectedAccount.accountNumber === 0
              ? "••••"
              : `•••• ${selectedAccount.accountNumber.toString().slice(-4)}`}
          </span>
        </div>
        <h3 className="text-foreground font-light">
          {selectedAccount.accountNumber === 0 ? "" : "Current in use"}
        </h3>
      </div>
    </div>
  );
}
