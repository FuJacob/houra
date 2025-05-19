"use client";
import { useReducer, useEffect, useState } from "react";
import { reducer, setRunning, setTimeLeft } from "./TimeReducer";
export default function Timer() {
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: 1020,
  });

  const [hoursLeft, setHoursLeft] = useState(Math.floor(state.timeLeft / 360));
  const [minutesLeft, setMinutesLeft] = useState(
    Math.floor(state.timeLeft / 60)
  );
  const [secondsLeft, setSecondsLeft] = useState(state.timeLeft % 60);

  useEffect(() => {
    if (!state.running || state.timeLeft <= 0) return;

    const interval = setInterval(
      () => dispatch(setTimeLeft(state.timeLeft - 1)),
      1000
    );

    setHoursLeft(Math.floor(state.timeLeft / 360));
    setMinutesLeft(Math.floor(state.timeLeft / 60));
    setSecondsLeft(state.timeLeft % 60);
    console.log(hoursLeft, minutesLeft, secondsLeft);
    return () => clearInterval(interval);
  }, [state.running, state.timeLeft]);
  return (
    <div className="flex flex-col justify-center items-center w-full bg-primary rounded-xl p-12">
      <h2 className="font-semibold text-gray-400">
        {state.timeLeft < 60
          ? `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds left`
          : `${hoursLeft} hours, ${minutesLeft} minutes left`}.
      </h2>
      <h1 className="font-sans font-black text-[150px]">
        {hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}:
        {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
        {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
      </h1>
      <button
        onClick={() => dispatch(setRunning(!state.running))}
        className="bg-primary px-8 py-4 rounded-full text-2xl font-semibold"
      >
        {state.running ? "Pause" : "Start"}
      </button>{" "}
    </div>
  );
}
