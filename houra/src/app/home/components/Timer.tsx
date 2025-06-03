"use client"; // Enables client-side rendering for this component

import { useReducer, useEffect, useState } from "react";
import { reducer, setRunning, setTimeLeft } from "./TimeReducer";
import { useContext } from "react";
import { selectedAccountContext } from "../contexts";
import { useAuth } from "@/hooks/useAuth";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

// Timer component displays and controls a countdown timer
export default function Timer() {
  const [startTime, setStartTime] = useState(0);
  const { getAccessToken } = useAuth();

  // Account interface defines the expected structure of an account object

  // Accessing the selected account from context
  const { selectedAccount, goToAccounts } = useContext(selectedAccountContext);

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
        const accessToken = getAccessToken();

        if (selectedAccount.accountNumber === 0) return;

        if (startTime === 0 && state.running === true) {
          setStartTime(new Date().getTime());
        } else if (state.running === false && startTime !== 0) {
          const endTime = new Date().getTime();
          const response = await fetch(
            "http://localhost:4500/api/accounts/addAccountTransaction",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                accountNumber: selectedAccount.accountNumber,
                startTime: startTime,
                endTime: endTime,
                duration: endTime - startTime,
              }),
            }
          );
          console.log({
            accountNumber: selectedAccount.accountNumber,
            startTime: startTime,
            endTime: endTime,
            duration: endTime - startTime,
          });
          if (response.ok) {
            const data = await response.json();
            console.log("data", data);
          } else {
            console.error(
              "Failed to add account transaction",
              response.statusText
            );
          }
          setStartTime(0);
        }

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
  }, [
    state.running,
    selectedAccount.accountNumber,
    startTime,
    state.timeLeft,
    getAccessToken,
  ]);

  // update time
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 sm:p-12 transition-all duration-300 rounded-2xl`}
      style={{
        backgroundColor:
          selectedAccount.accountNumber === 0
            ? "background"
            : `${selectedAccount.colour}20`,
      }}
    >
      <div className="text-xl text-gray-500 font-medium  flex justify-center w-full h-[60px] text-center">
        {selectedAccount.accountNumber === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <p>Account Mode</p>{" "}
            <Link
              href="/timer"
              className="text-sm flex items-center justify-center underline decoration-1 underline-offset-2"
            >
              Or go enter free mode →
            </Link>
          </div>
        ) : (
          selectedAccount.accountName
        )}
      </div>

      {/* Main timer display */}
      <div className="text-center mb-8 p-4 sm:p-16">
        <h1
          className="font-mono text-[120px] sm:text-[200px] leading-none tracking-tighter text-gray-900 font-light"
          style={{
            color: `${
              selectedAccount.accountNumber === 0
                ? "#111827"
                : selectedAccount.colour
            }`,
          }}
        >
          {hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}:
          {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
          {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
        </h1>
        <p className="text-gray-500 mt-4 text-base sm:text-lg">
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
            {selectedAccount.accountNumber !== 0
              ? `•••• ${selectedAccount.accountNumber.toString().slice(-4)}`
              : "\u00A0"}
          </span>
        </div>
        <button
          onClick={goToAccounts}
          className="flex flex-col justify-center items-center gap-2 px-4 py-2 transition-colors group"
        >
          {/* <span className="font-medium text-gray-900 text-sm">
            Go to my accounts
          </span> */}
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
            <FaArrowDown className="w-5 h-5 text-black group-hover:translate-y-0.5 transition-transform" />
          </div>{" "}
        </button>
        <h3 className="text-foreground font-light">
          {selectedAccount.accountNumber === 0 ? "" : "Being used"}
        </h3>
      </div>
    </div>
  );
}
