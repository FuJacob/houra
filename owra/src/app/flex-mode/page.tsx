"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import Navigation from "../components/Navigation";
import {
  reducer,
  setRunning,
  setTimeLeft,
} from "../accounts-mode/components/TimeReducer";
import {
  formatTimeToHHMMSS,
  getTimeFromSeconds,
  numberTimeToString,
  parseTimeString,
  formatRawInput,
} from "./getTimeFromSeconds";

import { Account } from "@/types/types";
import { FaExpand, FaCompress } from "react-icons/fa6";

export default function Timer() {
  const tempAccount = {
    account_balance: 1500,
    colour: "#FFFFFF",
  };

  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: tempAccount.account_balance,
  });

  const [hoursLeft, minutesLeft, secondsLeft] = getTimeFromSeconds(
    state.timeLeft
  );
  const [inputValue, setInputValue] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const currentTime = formatTimeToHHMMSS(hoursLeft, minutesLeft, secondsLeft);
  const [currentAccount, setCurrentAccount] =
    useState<Partial<Account>>(tempAccount);

  return (
    <div className="h-screen flex flex-col items-center justify-end">
      <div
        className="flex justify-center w-screen h-full pt-36"
        style={{
          backgroundColor:
            currentAccount.colour === "#FFFFFF"
              ? "background"
              : `${currentAccount.colour}40`,
        }}
      >
        <div className="w-full max-w-7xl">
          <Navigation />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <div className="mb-24">
                <div className="relative flex flex-col items-center justify-center p-6 sm:p-12 transition-all duration-500 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10">
                  <div className="text-xl font-medium flex flex-col gap-4 justify-center w-full h-[80px] text-center mb-2">
                    <div className="flex flex-col items-center justify-center h-full space-y-3">
                      <div className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg">
                        <p className="text-gray-700 font-medium">Flex-mode</p>
                      </div>
                    </div>
                    <Link
                      href="/accounts-mode"
                      className="text-sm flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors underline decoration-1 underline-offset-2 font-medium"
                    >
                      Or go enter account mode →
                    </Link>
                  </div>

                  <div className="text-center mb-12 p-8 sm:p-16 relative">
                    <div className="relative z-10">
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
                        className="text-center border-0 outline-none font-mono font-light text-[120px] sm:text-[200px] leading-none tracking-tighter w-full min-w-0 transition-transform duration-500 ease-in-out transform scale-95 focus:scale-100 bg-transparent drop-shadow-lg"
                        style={{
                          color:
                            currentAccount.colour === "#FFFFFF"
                              ? "#374151"
                              : `${currentAccount.colour}`,
                        }}
                      />
                      <div className="mt-6 px-6 py-3">
                        <p className="text-gray-600 text-base sm:text-lg font-medium">
                          {state.timeLeft < 60
                            ? `Less than a minute remaining`
                            : `${hoursLeft} hours, ${minutesLeft} minutes remaining`}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-6 right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/3 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-500"></div>
                  </div>

                  <div className="flex gap-6 mb-8">
                    <button
                      onClick={() => dispatch(setRunning(!state.running))}
                      className="group px-10 py-5 bg-gray-900/90 backdrop-blur-sm text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 text-xl font-medium shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.05] border border-gray-800/20"
                    >
                      <span className="group-hover:text-white/90 transition-colors">
                        {state.running ? "Pause" : "Start"}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        dispatch(setRunning(false));
                        dispatch(
                          setTimeLeft(
                            currentAccount.account_balance ||
                              tempAccount.account_balance
                          )
                        );
                      }}
                      className="group px-10 py-5 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 rounded-2xl hover:bg-white/30 hover:border-white/40 transition-all duration-300 text-xl font-medium shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.05]"
                    >
                      <span className="group-hover:text-gray-900 transition-colors">
                        Reset
                      </span>
                    </button>
                  </div>

                  <div className="flex text-2xl justify-between items-end w-full mt-8">
                    <div className="flex flex-col items-start space-y-4">
                      <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg">
                        <h3 className="text-lg font-medium text-gray-700">
                          Choose Timer Color
                        </h3>
                      </div>
                      <div className="grid grid-cols-5 gap-2 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg">
                        {[
                          "#FFFFFF",
                          "#F87171",
                          "#FBBF24",
                          "#34D399",
                          "#60A5FA",
                          "#A78BFA",
                          "#F472B6",
                          "#FDBA74",
                          "#C084FC",
                          "#FACC15",
                        ].map((hex) => (
                          <button
                            key={hex}
                            type="button"
                            className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 hover:scale-110 hover:opacity-100 shadow-lg hover:shadow-xl ${
                              currentAccount.colour === hex
                                ? "border-gray-800 shadow-xl scale-105 ring-2 ring-white/50"
                                : hex === "#FFFFFF"
                                  ? "border-gray-400 opacity-90 hover:border-gray-600"
                                  : "border-white/30 opacity-80 hover:border-white/50"
                            }`}
                            style={{
                              backgroundColor: hex,
                              boxShadow: `0 4px 15px ${hex}40`,
                            }}
                            onClick={() =>
                              setCurrentAccount({ ...tempAccount, colour: hex })
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

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
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
