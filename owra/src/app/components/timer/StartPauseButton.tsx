import React from "react";

interface StartPauseButtonProps {
  isRunning: boolean;
  timeLeft: number;
  onClick: () => void;
}

const StartPauseButton = ({ isRunning, timeLeft, onClick }: StartPauseButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={timeLeft <= 0}
      className="group px-10 py-5 bg-gray-900/90 backdrop-blur-sm text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 text-xl font-medium shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.05] border border-gray-800/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="group-hover:text-white/90 transition-colors">
        {isRunning ? "Pause" : "Start"}
      </span>
    </button>
  );
};

export default StartPauseButton;
