"use client";
import React, { useState } from "react";
import { Account } from "@/types/types";
import { createClient } from "@/utils/supabase/client";

interface AccountModalProps {
  mode: "edit" | "add";
  account?: Account; // Optional for add mode
  onClose: () => void;
  onUpdate?: (updatedAccount: Account) => void; // Optional for add mode
}

export default function AccountModal({
  mode,
  account,
  onClose,
  onUpdate,
}: AccountModalProps) {
  const [editedAccount, setEditedAccount] = useState<Account>({
    ...(account || {
      id: "",
      account_name: "",
      account_balance: 0,
      reload_freq: 0,
      last_reload: 0,
      reload_amount: 0,
      colour: "#F87171", // Default to the first color (red)
      type: "Growth", // Default to "Growth"
    }),
  });

  // Separate state for time inputs
  const [timeInputs, setTimeInputs] = useState(() => {
    const totalSeconds = account?.account_balance || 0;
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
      const supabase = await createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!user) {
        throw new Error("User not found");
      }

      if (mode === "edit") {
        const { error } = await supabase
          .from("accounts")
          .update(editedAccount)
          .eq("id", editedAccount.id!);

        if (error) {
          throw new Error(error.message);
        }

        onUpdate?.(editedAccount);
        onClose();
        console.log("Account updated successfully");
      } else {
        const { error } = await supabase
          .from("accounts")
          .insert({
            user_id: user.id,
            account_name: editedAccount.account_name,
            account_balance: editedAccount.account_balance,
            reload_freq: editedAccount.reload_freq,
            last_reload: editedAccount.last_reload,
            reload_amount: editedAccount.reload_amount,
            colour: editedAccount.colour,
            type: editedAccount.type,
          })
          .select()
          .single();

        if (error) {
          throw new Error(error.message);
        }

        onClose();
        // Refresh the page to show the new account
        window.location.reload();
        console.log("Account created successfully");
      }
    } catch (error) {
      console.error(
        `Error ${mode === "edit" ? "updating" : "creating"} account:`,
        error
      );
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-500 relative rounded-3xl p-6 w-full max-w-md">
      {/* Background blur effect */}

      {/* Main modal container */}

      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header with glass morphism styling */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-2xl rounded-2xl transform -rotate-1"></div>
            <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-2 shadow-lg shadow-black/5">
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
              <h2 className="relative z-10 text-lg font-light bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {mode === "edit" ? "Edit Account" : "New Account"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group relative w-8 h-8 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full shadow-lg shadow-black/10 flex items-center justify-center transition-all duration-300 border border-white/40 hover:scale-110"
          >
            <span className="text-gray-700 group-hover:text-gray-900 text-lg font-light transition-colors">
              ×
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="account_name"
              className="block text-sm font-medium text-gray-800 mb-2"
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
              className="w-full px-4 py-2.5 text-sm bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/60 focus:bg-white/30 transition-all duration-300 placeholder-gray-500 shadow-lg shadow-black/5"
              placeholder="e.g. YouTube, Reading, Exercise"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Account Type
            </label>
            <div className="flex gap-3">
              <label className="flex items-center space-x-2 p-2.5 bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl hover:bg-white/30 cursor-pointer flex-1 transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10">
                <input
                  type="radio"
                  name="type"
                  value="Growth"
                  checked={editedAccount.type === "Growth"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
                />
                <span className="text-sm font-medium text-gray-800">
                  Growth
                </span>
              </label>
              <label className="flex items-center space-x-2 p-2.5 bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl hover:bg-white/30 cursor-pointer flex-1 transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10">
                <input
                  type="radio"
                  name="type"
                  value="Burn"
                  checked={editedAccount.type === "Burn"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
                />
                <span className="text-sm font-medium text-gray-800">Burn</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
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
                    className="block text-xs font-medium text-gray-700 mb-1 capitalize"
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
                    className="w-full px-2 py-1.5 text-sm bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/60 focus:bg-white/30 transition-all duration-300 text-center shadow-lg shadow-black/5"
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
              className="block text-sm font-medium text-gray-800 mb-2"
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
              className="w-full px-4 py-2.5 text-sm bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/60 focus:bg-white/30 transition-all duration-300 placeholder-gray-500 shadow-lg shadow-black/5"
              placeholder="e.g. daily, weekly, monthly"
            />
          </div>

          <div>
            <label
              htmlFor="colour"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Colour
            </label>
            <div className="grid grid-cols-5 gap-2">
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
                  className={`w-full h-8 rounded-2xl border-2 transition-all duration-300 hover:scale-110 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 ${
                    editedAccount.colour === hex
                      ? "border-gray-800 ring-2 ring-white/60"
                      : "border-white/40"
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
            <div className="mt-3">
              <label
                htmlFor="customColour"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Custom
              </label>
              <input
                type="color"
                id="customColour"
                name="colour"
                className="w-10 h-8 rounded-2xl border-2 border-white/40 cursor-pointer shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:scale-110"
                value={editedAccount.colour}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 text-sm text-gray-700 bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2.5 text-sm bg-gray-900/90 backdrop-blur-sm text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-gray-900/25 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] border border-gray-800/20"
            >
              {mode === "edit" ? "Update Account" : "Create Account"}
            </button>
          </div>
        </form>
      </div>

      {/* Floating particles for visual interest */}
      <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-4 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 right-6 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-700"></div>
    </div>
  );
}
