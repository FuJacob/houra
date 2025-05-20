"use client"; // Enables client-side rendering for this component

import { useReducer, useEffect, useState } from "react";
import { reducer, setRunning, setTimeLeft } from "./TimeReducer";
import { useContext } from "react";
import { selectedAccountContext } from "../page";
import { FaUniversity } from "react-icons/fa";

// Timer component displays and controls a countdown timer
export default function Timer() {
  // Account interface defines the expected structure of an account object
  interface Account {
    email: string;
    accountNumber: number;
    accountName: string;
    accountBalance: number;
    reloadFreq: string;
  }

  // Accessing the selected account from context
  const { selectedAccount } = useContext(selectedAccountContext);

  // Reducer state contains whether the timer is running and the time left in seconds
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: 1020, // Initial time in seconds (17 minutes)
  });

  // Separate state values for hours, minutes, and seconds display
  const [hoursLeft, setHoursLeft] = useState(Math.floor(state.timeLeft / 3600));
  const [minutesLeft, setMinutesLeft] = useState(
    Math.floor((state.timeLeft % 3600) / 60)
  );
  const [secondsLeft, setSecondsLeft] = useState(state.timeLeft % 60);


  useEffect(() => {
    const fetchAccount = async () => {
      try {
        console.log("Fetching account");
        const response = await fetch(
          `/api/accounts/getAccount?accountNumber=${selectedAccount}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        dispatch(setTimeLeft(data.account.timeLeft));
      } catch (error) {
        console.error(error);
        return;
      }
    };

    fetchAccount();
  }, [selectedAccount]);
  // Effect runs every second when the timer is running
  useEffect(() => {
    if (!state.running || state.timeLeft <= 0) return;

    // Decrease time left every 1000ms (1 second)
    const interval = setInterval(
      () => dispatch(setTimeLeft(state.timeLeft - 1)),
      1000
    );

    // Update display states based on updated time
    setHoursLeft(Math.floor(state.timeLeft / 3600));
    setMinutesLeft(Math.floor((state.timeLeft % 3600) / 60));
    setSecondsLeft(state.timeLeft % 60);

    console.log(hoursLeft, minutesLeft, secondsLeft);

    // Clear interval when effect dependencies change or component unmounts
    return () => clearInterval(interval);
  }, [state.running, state.timeLeft]);

  return (
    <div className="flex flex-col justify-center items-center w-full bg-primary rounded-xl p-12">
      {/* Informative label showing how much time is left */}
      <h2 className="font-semibold text-gray-400">
        {state.timeLeft < 60
          ? `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds left`
          : `${hoursLeft} hours, ${minutesLeft} minutes left`}
        .
      </h2>
      {/* Main timer display in HH:MM:SS format */}
      <h1 className="font-sans font-black text-[150px]">
        {hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}:
        {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
        {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
      </h1>
      <button
        // onClick={() => setSelectedAccount(accountNumber)}
        className="font-semibold w-96 h-52 min-w-96 max-w-96 border-2 border-gray-800 p-4 rounded-xl bg-gray-600 text-background flex flex-col justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full w-12 h-12 bg-white flex justify-center items-center text-red-600">
            {/* {accountName?.slice(0, 3)} */}
          </div>
          {/* <h2 className="text-xl">{accountName}</h2> */}
        </div>
        <div>
          <p className="flex items-center gap-2 text-red-200 pb-1">
            <FaUniversity />
            {/* {accountNumber} */}
          </p>
          {/* <h3 className="text-2xl">{accountBalance}h</h3> */}
        </div>
      </button>{" "}
      {/* Start/Pause toggle button */}
      {/* <button
        onClick={() => dispatch(setRunning(!state.running))}
        className="bg-background px-8 py-4 rounded-full text-2xl font-semibold"
      >
        {state.running ? "Pause" : "Start"}
      </button>{" "} */}
    </div>
  );
}
