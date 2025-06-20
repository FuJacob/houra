import React from "react";

interface ResetButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const ResetButton = ({ onClick, disabled }: ResetButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group px-10 py-5 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 rounded-2xl hover:bg-white/30 hover:border-white/40 transition-all duration-300 text-xl font-medium shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.05] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="group-hover:text-gray-900 transition-colors">
        Reset
      </span>
    </button>
  );
};

export default ResetButton;
