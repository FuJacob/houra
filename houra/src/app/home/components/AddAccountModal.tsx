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
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="inset-0 fixed bg-gray-700 opacity-30" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-white rounded-2xl shadow-xl opacity-100 z-50 p-12 w-1/4"
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl mb-4">Create an Account</h1>
          <button
            onClick={() => setShowAddAccountModal(false)}
            className="bg-gray-100 p-4 rounded-full"
          >
            <FaX className="text-xs" />
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="accountName">Account name</label>
          <input
            onChange={handleChange}
            name="accountName"
            id="accountName"
            type="text"
            placeholder="YouTube"
            className="border-1 p-2 rounded-xl mb-2"
          />

          <label htmlFor="accountBalance">Account balance (hours)</label>
          <input
            onChange={handleChange}
            name="accountBalance"
            id="accountBalance"
            type="number"
            placeholder="2"
            className="border-1 p-2 rounded-xl mb-2"
          />

          <label htmlFor="reloadFreq">Reload Frequency</label>
          <input
            onChange={handleChange}
            name="reloadFreq"
            id="reloadFreq"
            type="text"
            placeholder="daily"
            className="border-1 p-2 rounded-xl mb-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 font-semibold"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
