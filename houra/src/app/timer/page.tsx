"use client"; // Enables client-side rendering for this component

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import Navigation from "../../app/components/Navigation.tsx";
import AccountHistory from "../home/components/AccountTransactions";
import DummyAllAccounts from "../home/components/DummyAllAccounts";
import {
  reducer,
  setRunning,
  setTimeLeft,
} from "../home/components/TimeReducer";
import {
  formatTimeToHHMMSS,
  getTimeFromSeconds,
  numberTimeToString,
  parseTimeString,
  formatRawInput,
} from "./getTimeFromSeconds";

import { Account } from "@/types/types";

// Timer component displays and controls a countdown timer
export default function Timer() {
  // Temporary account object with default balance and color
  const tempAccount = {
    accountBalance: 1500, // 25 minutes default
    colour: "#3B82F6", // Default color for the timer
  };

  // Setup reducer for timer state management
  // state.running indicates if timer is active
  // state.timeLeft holds remaining time in seconds
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: tempAccount.accountBalance, // Initial time in seconds (25 minutes)
  });

  // Calculate hours, minutes, and seconds from timeLeft for display
  const [hoursLeft, minutesLeft, secondsLeft] = getTimeFromSeconds(
    state.timeLeft
  );

  // State to toggle between display and edit mode for the timer

  // Holds the input value when editing the timer
  const [inputValue, setInputValue] = useState("");

  // Effect hook to handle countdown timer when running
  useEffect(() => {
    // Stop timer if timeLeft reaches zero or below
    if (state.timeLeft <= 0) {
      dispatch(setRunning(false));
    }

    if (state.running) {
      const interval = setInterval(() => {
        // Decrease timeLeft by 1 every second
        dispatch(setTimeLeft(state.timeLeft - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.running, state.timeLeft]);

  useEffect(() => {
    setInputValue(numberTimeToString(state.timeLeft));
  }, [state.timeLeft]);

  // Format current time as HH:MM:SS string with leading zeros
  const currentTime = formatTimeToHHMMSS(hoursLeft, minutesLeft, secondsLeft);
  const [currentAccount, setCurrentAccount] =
    useState<Partial<Account>>(tempAccount);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div
        className="flex justify-center w-screen "
        style={{
          backgroundColor: `${currentAccount.colour}40`,
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
                <div
                  className="flex flex-col items-center justify-center p-4 sm:p-12 transition-all duration-300 rounded-2xl bg-gray-50"
                  style={{
                    backgroundColor: `${currentAccount.colour}20`,
                  }}
                >
                  <div className="text-3xl sm:text-3xl font-light flex justify-center w-full h-[60px] text-center">
                    Timer
                  </div>

                  {/* Main timer display */}
                  <div className="text-center mb-8 p-4 sm:p-16 ">
                    <input
                      type="text"
                      value={formatRawInput(inputValue)}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={() =>
                        dispatch(setTimeLeft(parseTimeString(inputValue)))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(setTimeLeft(parseTimeString(inputValue)));
                        }
                      }}
                      placeholder={currentTime}
                      autoFocus
                      className="text-center border-0 outline-none font-mono font-light text-[120px] sm:text-[200px] leading-none tracking-tighter w-full min-w-0 transition-transform duration-500 ease-in-out transform scale-95 focus:scale-100"
                      style={{
                        color: `${currentAccount.colour}`,
                      }}
                    />
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
                      className={`px-12 py-4 rounded-full text-lg font-medium transition-all ${
                        state.running
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {state.running ? "Pause" : "Start"}
                    </button>
                  </div>

                  <div className="flex text-2xl justify-between items-end w-full mt-8">
                    <div className="flex text-2xl justify-between items-end w-full mt-8">
                      <div className="flex flex-col items-center text-foreground/60">
                        <p>Select a colour</p>
                        <div className="w-full h-full grid grid-cols-5 gap-2">
                          {[
                            "#F87171", // red
                            "#FBBF24", // yellow
                            "#34D399", // green
                            "#60A5FA", // blue
                            "#A78BFA", // purple
                            "#F472B6", // pink
                            "#FDBA74", // orange
                            "#4ADE80", // emerald
                            "#C084FC", // violet
                            "#FACC15", // amber
                          ].map((hex) => (
                            <button
                              key={hex}
                              type="button"
                              className="w-full h-10 rounded-md border border-gray-200 hover:scale-105 transition-transform"
                              style={{ backgroundColor: hex }}
                              onClick={() =>
                                setCurrentAccount({
                                  ...tempAccount,
                                  colour: hex,
                                })
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <h3 className="text-foreground font-light">asdasda</h3>
                    </div>
                    <div className="flex items-center text-foreground/60"></div>
                  </div>
                </div>{" "}
              </div>
              <AccountHistory />
              <div className="relative flex justify-center items-center w-full h-full">
                <Link
                  href="/signup"
                  className="absolute z-20 px-6 py-3 text-lg font-semibold text-gray-900 rounded-lg shadow-md transition"
                >
                  Create an account
                </Link>
                <div
                  className="absolute inset-0 z-10 w-full h-full"
                  style={{ backgroundColor: `${currentAccount.colour}10` }}
                ></div>
                <div className="w-full h-full">
                  <DummyAllAccounts />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
