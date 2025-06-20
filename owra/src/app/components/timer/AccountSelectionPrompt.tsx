import React from "react";
import { FaArrowDown } from "react-icons/fa6";

interface AccountSelectionPromptProps {
  onGoToAccounts: () => void;
}

const AccountSelectionPrompt = ({ onGoToAccounts }: AccountSelectionPromptProps) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center rounded-full px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
        <button
          onClick={onGoToAccounts}
          className="p-2 text-gray-800 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
        >
          <FaArrowDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AccountSelectionPrompt;
