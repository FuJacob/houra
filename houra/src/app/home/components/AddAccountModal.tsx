"use client";
import { useContext, useState } from "react";
import { FaX } from "react-icons/fa6";
import { Account, AddAccountModalProps } from "@/types/types";
import { CurrentUserContext } from "../contexts";
import { useAuth } from "@/hooks/useAuth";

export default function AddAccountModal({
  setShowAddAccountModal,
}: AddAccountModalProps) {
  const { getAccessToken } = useAuth();

  const [newAccount, setNewAccount] = useState<Account>({
    accountNumber: 0,
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
    colour: "#F87171", // Default to the first color (red)
    type: "Growth", // Default to "Growth"
    transactions: [],
  });

  // Separate state for time inputs
  const [timeInputs, setTimeInputs] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting newAccount state:", newAccount);
    console.log("Submitting newAccount JSON:", JSON.stringify(newAccount));

    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        "http://localhost:4500/api/accounts/addAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newAccount),
        }
      );

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        return;
      }
      setCurrentUser((prev) => ({
        ...prev,
        accounts: [...prev.accounts, newAccount],
      }));

      setShowAddAccountModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setShowAddAccountModal(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-light text-gray-900">New Account</h2>
            <button
              onClick={() => setShowAddAccountModal(false)}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <FaX className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="accountName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Name
                </label>
                <input
                  onChange={handleChange}
                  name="accountName"
                  id="accountName"
                  type="text"
                  placeholder="e.g. YouTube"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType" // Changed name to avoid conflict if 'option' is used elsewhere
                      value="Growth" // Corrected value
                      checked={newAccount.type === "Growth"}
                      onChange={(e) =>
                        setNewAccount((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="form-radio h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
                    />
                    <span>Growth</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType" // Changed name to avoid conflict
                      value="Burn" // Corrected value
                      checked={newAccount.type === "Burn"}
                      onChange={(e) =>
                        setNewAccount((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="form-radio h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
                    />
                    <span>Burn</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Balance
                </label>
                <div className="grid grid-cols-4 gap-3">
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
                        {unit}
                      </label>
                      <input
                        type="number"
                        id={unit}
                        name={unit}
                        placeholder="0"
                        min={0}
                        max={max} // Optional: Add max values for better UX
                        required
                        className="w-full px-2 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm text-center"
                        value={timeInputs[unit] === 0 ? "" : timeInputs[unit]} // Show empty string if 0 for better placeholder visibility
                        onChange={(e) => {
                          let value = Number(e.target.value);
                          if (isNaN(value)) value = 0;
                          // Optional: Clamp value to max if you added max attribute
                          // if (value > max) value = max;

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

                          setNewAccount((prev) => ({
                            ...prev,
                            accountBalance: totalSeconds,
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="reloadFreq"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reload Frequency
                </label>
                <input
                  onChange={handleChange}
                  name="reloadFreq"
                  id="reloadFreq"
                  type="text"
                  placeholder="daily"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="colour"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="w-full h-10 rounded-md border border-gray-200 hover:scale-105 transition-transform"
                    style={{ backgroundColor: hex }}
                    onClick={() =>
                      setNewAccount((prev) => ({
                        ...prev,
                        colour: hex,
                      }))
                    }
                  />
                ))}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="customColour"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Or pick your own
                </label>
                <input
                  type="color"
                  id="customColour"
                  name="colour"
                  className="w-12 h-10 rounded-md border border-gray-200 cursor-pointer"
                  value={newAccount.colour}
                  onChange={handleChange} // Changed to use generic handleChange
                  // Removed 'required' from here as one of the preset colors can be chosen
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
