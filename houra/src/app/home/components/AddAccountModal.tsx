"use client";
import { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";
import { useState } from "react";
interface Account {
  accountName: string;
  accountBalance: number;
  reloadFreq: string;
}

export default function AddAccountModal({
  setShowAddAccountModal,
}: {
  setShowAddAccountModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [newAccount, setNewAccount] = useState<Account>({
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/user/addAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return;
    }
    console.log("Account created successfully", data);
    setShowAddAccountModal(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewAccount((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="inset-0 fixed bg-gray-700 opacity-30" />
      <form
        action=""
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

          <label htmlFor="accountBalance">Account balance</label>
          <input
            name="accountBalance"
            id="accountName"
            type="number"
            placeholder="YouTube"
            className="border-1 p-2 rounded-xl mb-2"
          />

          <label htmlFor="reloadFreq">Reload Frequency</label>
          <input
            name="reloadFreq"
            id="reloadFreq"
            type="text"
            placeholder="YouTube"
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
        </div>{" "}
      </form>
    </div>
  );
}
