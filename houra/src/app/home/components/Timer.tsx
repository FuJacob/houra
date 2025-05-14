"use client";
import { useReducer, useEffect } from "react";
import { reducer, setRunning, setTimeLeft } from "./TimeReducer";
export default function Timer() {
  const [state, dispatch] = useReducer(reducer, {
    running: false,
    timeLeft: 60,
  });
  useEffect(() => {
    if (!state.running || state.timeLeft <= 0) return;

    const interval = setInterval(
      () => dispatch(setTimeLeft(state.timeLeft - 1)),
      1000
    );
    return () => clearInterval(interval);
  }, [state.running, state.timeLeft]);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="font-sans font-black text-9xl">{state.timeLeft}</h1>
      <button
        onClick={() => dispatch(setRunning(!state.running))}
        className="bg-primary px-8 py-4 rounded-full text-2xl font-semibold"
      >
        {state.running ? "Pause" : "Start"}
      </button>{" "}
    </div>
  );
}
