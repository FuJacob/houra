"use client"; // Enables client-side rendering for this component
import Link from "next/link";
import { useReducer, useEffect, useState } from "react";
import {
  reducer,
  setRunning,
  setTimeLeft,
} from "../home/components/TimeReducer";
import DummyAllAccounts from "../home/components/DummyAllAccounts";
import { useContext } from "react";
import { MdAccountBalance } from "react-icons/md";
import AccountHistory from "../home/components/AccountTransactions";
import AllAccounts from "../home/components/AllAccounts";
interface Account {
  accountNumber: number;
  accountName: string;
  accountBalance: number;
  reloadFreq: string;
}
// Timer component displays and controls a countdown timer
export default function Timer() {
  const tempAccount = {
    accountBalance: 1500, // 25 minutes default
    colour: "#3B82F6", // Default color for the timer
  };
  const [startTime, setStartTime] = useState(0);

  // Account interface defines the expected structure of an account object

  // Accessing the selected account from context

  // Reducer state contains whether the timer is running and the time left in seconds
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: tempAccount.accountBalance, // Initial time in seconds (17 minutes)
  });

  // Separate state values for hours, minutes, and seconds display
  const hoursLeft = Math.floor(state.timeLeft / 3600);
  const minutesLeft = Math.floor((state.timeLeft % 3600) / 60);
  const secondsLeft = state.timeLeft % 60;

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

  // update time
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div
        className="flex justify-center w-screen "
        style={{
          backgroundColor: `${tempAccount.colour}10`,
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
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <div className="py-12">
              {/* Timer Section */}
              <div className="mb-24">
                <div
                  className="flex flex-col items-center justify-center p-4 sm:p-12 transition-all duration-300 rounded-2xl bg-gray-50"
                  style={{
                    backgroundColor: `${tempAccount.colour}20`,
                  }}
                >
                  <div className="text-3xl sm:text-5xl font-light flex justify-center w-full h-[60px] text-center">
                    Productivity Timer
                  </div>

                  {/* Main timer display */}
                  <div className="text-center mb-8 p-4 sm:p-16">
                    <h1
                      className="font-mono text-[120px] sm:text-[200px] leading-none tracking-tighter font-light"
                      style={{
                        color: `${tempAccount.colour}`,
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
                    <div className="flex items-center text-foreground/60">
                      <span>Guest Timer</span>
                    </div>
                    <h3 className="text-foreground font-light">
                      Current in use
                    </h3>
                  </div>
                </div>{" "}
              </div>
              <AccountHistory />
              <div className="relative">
                <Link
                  href="/signup"
                  className="absolute flex justify-center items-center inset-0 z-20 text-lg font-semibold text-gray-900 mb-2"
                >
                  Signup to houra
                </Link>
                <div className="absolute inset-0 bg-background/40 z-10"></div>
                <DummyAllAccounts />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
