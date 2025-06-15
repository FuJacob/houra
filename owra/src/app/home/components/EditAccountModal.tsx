"use client";
import React, { useState, useContext } from "react";
import { Account } from "@/types/types";
import { updateAccount } from "@/actions/accountsActions";

interface EditAccountModalProps {
  account: Account;
  onClose: () => void;
  onUpdate: (updatedAccount: Account) => void;
}

export default function EditAccountModal({
  account,
  onClose,
  onUpdate,
}: EditAccountModalProps) {
  const [editedAccount, setEditedAccount] = useState<Account>({
    ...account,
  });

  // Separate state for time inputs
  const [timeInputs, setTimeInputs] = useState(() => {
    const totalSeconds = account.account_balance;
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateAccount(editedAccount.id!, editedAccount);

      onUpdate(editedAccount);
      onClose();
      console.log("Account updated successfully");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div className="absolute inset-0 z-50 rounded-xl">
      <div className="bg-white rounded-xl p-6 w-full h-full shadow-2xl border border-gray-200 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Account</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-semibold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label
              htmlFor="account_name"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Account Name
            </label>
            <input
              onChange={handleChange}
              name="account_name"
              id="account_name"
              type="text"
              value={editedAccount.account_name}
              required
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <div className="flex gap-2">
              <label className="flex items-center space-x-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
                <input
                  type="radio"
                  name="type"
                  value="Growth"
                  checked={editedAccount.type === "Growth"}
                  onChange={handleChange}
                  className="form-radio h-3 w-3 text-gray-600 transition duration-150 ease-in-out"
                />
                <span className="text-xs">Growth</span>
              </label>
              <label className="flex items-center space-x-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
                <input
                  type="radio"
                  name="type"
                  value="Burn"
                  checked={editedAccount.type === "Burn"}
                  onChange={handleChange}
                  className="form-radio h-3 w-3 text-gray-600 transition duration-150 ease-in-out"
                />
                <span className="text-xs">Burn</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Time Balance
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { unit: "days", max: 365 },
                  { unit: "hours", max: 23 },
                  { unit: "minutes", max: 59 },
                  { unit: "seconds", max: 59 },
                ] as const
              ).map(({ unit, max }) => (
                <div key={unit}>
                  <label
                    htmlFor={unit}
                    className="block text-xs font-medium text-gray-500 mb-1 capitalize"
                  >
                    {unit.slice(0, 3)}
                  </label>
                  <input
                    type="number"
                    name={unit}
                    id={unit}
                    min="0"
                    max={max}
                    value={timeInputs[unit]}
                    className="w-full px-2 py-1 text-xs rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200"
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      const updatedTimeInputs = {
                        ...timeInputs,
                        [unit]: value,
                      };
                      setTimeInputs(updatedTimeInputs);

                      const totalSeconds =
                        (updatedTimeInputs.days || 0) * 86400 +
                        (updatedTimeInputs.hours || 0) * 3600 +
                        (updatedTimeInputs.minutes || 0) * 60 +
                        (updatedTimeInputs.seconds || 0);

                      setEditedAccount((prev) => ({
                        ...prev,
                        account_balance: totalSeconds,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="reload_freq"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Reload Frequency
            </label>
            <input
              onChange={handleChange}
              name="reload_freq"
              id="reload_freq"
              type="text"
              value={editedAccount.reload_freq}
              required
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="colour"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Colour
            </label>
            <div className="grid grid-cols-5 gap-1">
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
                  className={`w-full h-6 rounded-md border transition-transform hover:scale-105 ${
                    editedAccount.colour === hex
                      ? "border-gray-800 border-2"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: hex }}
                  onClick={() =>
                    setEditedAccount((prev) => ({
                      ...prev,
                      colour: hex,
                    }))
                  }
                />
              ))}
            </div>
            <div className="mt-2">
              <label
                htmlFor="customColour"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Custom
              </label>
              <input
                type="color"
                id="customColour"
                name="colour"
                className="w-8 h-6 rounded-md border border-gray-200 cursor-pointer"
                value={editedAccount.colour}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-1.5 text-xs text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 text-xs bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
