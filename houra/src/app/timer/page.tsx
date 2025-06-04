"use client"; // Enables client-side rendering for this component

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import Navigation from "../../app/components/Navigation";
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
import { FaArrowRight, FaExpand, FaCompress } from "react-icons/fa6";

// Timer component displays and controls a countdown timer
export default function Timer() {
  // Temporary account object with default balance and color
  const tempAccount = {
    accountBalance: 1500, // 25 minutes default
    colour: "#FFFFFF", // Default color for the timer (white)
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Effect hook to handle countdown timer when running
  useEffect(() => {
    if (state.running && state.timeLeft > 0) {
      const interval = setInterval(() => {
        dispatch(setTimeLeft(state.timeLeft - 1));
      }, 1000);
      return () => clearInterval(interval);
    } else if (state.timeLeft <= 0) {
      dispatch(setRunning(false));
    }
  }, [state.running, state.timeLeft]);

  useEffect(() => {
    setInputValue(numberTimeToString(state.timeLeft));
  }, [state.timeLeft]);

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

  // Format current time as HH:MM:SS string with leading zeros
  const currentTime = formatTimeToHHMMSS(hoursLeft, minutesLeft, secondsLeft);
  const [currentAccount, setCurrentAccount] =
    useState<Partial<Account>>(tempAccount);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div
        className="flex justify-center w-screen "
        style={{
          backgroundColor:
            currentAccount.colour === "#FFFFFF"
              ? "background"
              : `${currentAccount.colour}40`,
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
                  className="relative flex flex-col items-center justify-center p-4 sm:p-12 transition-all duration-300 rounded-2xl bg-gray-50"
                  style={{
                    backgroundColor:
                      currentAccount.colour === "#FFFFFF"
                        ? "background"
                        : `${currentAccount.colour}20`,
                  }}
                >
                  <div className="text-xl text-gray-500 font-medium  flex justify-center w-full h-[60px] text-center">
                    <div className="flex flex-col items-center justify-center h-full space-y-2">
                      <p>Free-mode </p>
                      <Link
                        href="/home"
                        className="text-sm flex items-center justify-center underline decoration-1 underline-offset-2"
                      >
                        Or go enter account mode →
                      </Link>
                    </div>
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
                        color:
                          currentAccount.colour === "#FFFFFF"
                            ? "#111827"
                            : `${currentAccount.colour}`,
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

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="absolute bottom-4 right-4 p-3 bg-white/80 hover:bg-white/90 rounded-full shadow-lg transition-all duration-200 hover:scale-105 border border-gray-200"
                    title={
                      isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                    }
                  >
                    {isFullscreen ? (
                      <FaCompress className="w-4 h-4 text-gray-700" />
                    ) : (
                      <FaExpand className="w-4 h-4 text-gray-700" />
                    )}
                  </button>

                  <div className="flex text-2xl justify-between items-end w-full mt-8">
                    <div className="flex flex-col items-start space-y-3">
                      <h3 className="text-lg font-medium text-gray-600">
                        Choose Timer Color
                      </h3>
                      <div className="grid grid-cols-5 gap-1">
                        {[
                          "#FFFFFF", // white (default)
                          "#F87171", // red
                          "#FBBF24", // yellow
                          "#34D399", // green
                          "#60A5FA", // blue
                          "#A78BFA", // purple
                          "#F472B6", // pink
                          "#FDBA74", // orange
                          "#C084FC", // violet
                          "#FACC15", // amber
                        ].map((hex) => (
                          <button
                            key={hex}
                            type="button"
                            className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:opacity-100 shadow-sm ${
                              currentAccount.colour === hex
                                ? "border-gray-800 shadow-md scale-105"
                                : hex === "#FFFFFF"
                                ? "border-gray-400 opacity-90 hover:border-gray-600"
                                : "border-gray-300 opacity-70 hover:border-gray-400"
                            }`}
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
                    <div className="flex items-center text-foreground/60">
                      <h3 className="text-foreground font-light">
                        Timer Settings
                      </h3>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <AccountHistory />
              <div className="relative w-full rounded-2xl">
                {/* Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center ">
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                  <div className="relative z-30 text-center p-8 rounded-2xl max-w-md mx-4">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                        Ready to get started?
                      </h3>
                      <p className="text-white/90 leading-relaxed text-lg drop-shadow-md">
                        Create your account to unlock personalized time tracking
                        with custom accounts and detailed analytics.
                      </p>
                    </div>
                    <Link
                      href="/signup"
                      className="inline-flex items-center px-10 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl border-2 border-white/20"
                    >
                      Create Your Account
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Dimmed content */}
                <div className="relative z-10">
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
