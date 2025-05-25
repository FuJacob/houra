"use client";
import { useContext, useState } from "react";
import { FaX } from "react-icons/fa6";
import { Account, AddAccountModalProps } from "@/types/types";
import { CurrentUserContext } from "@/app/home/page";

export default function AddAccountModal({
  setShowAddAccountModal,
}: AddAccountModalProps) {
  const [newAccount, setNewAccount] = useState<Account>({
    accountNumber: 0,
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
    colour: "",
  });

  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="accountBalance"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Time Balance (hours)
                </label>
                <input
                  onChange={handleChange}
                  name="accountBalance"
                  id="accountBalance"
                  type="number"
                  placeholder="2"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
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
              <input
                onChange={handleChange}
                name="colour"
                id="colour"
                type="color"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
