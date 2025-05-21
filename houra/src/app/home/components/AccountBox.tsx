"use client";
import { FaUniversity } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { selectedAccountContext } from "../page";
import { useContext, useState } from "react";
import { Account } from "@/types/types";

const AccountBox = ({ account }: { account: Account }) => {
  const { setSelectedAccount } = useContext(selectedAccountContext);
  const [seconds, setSeconds] = useState(account.accountBalance % 60);
  const [minutes, setMinutes] = useState(
    Math.floor(account.accountBalance / 60) % 60
  );
  const [hours, setHours] = useState(Math.floor(account.accountBalance / 3600));

  return (
    <button
      onClick={() => setSelectedAccount(account)}
      className="font-semibold w-96 h-52 min-w-96 max-w-96 border p-4 rounded-xl bg-red-600 text-background flex flex-col justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="rounded-full w-12 h-12 bg-white flex justify-center items-center text-red-600">
          {account.accountName?.slice(0, 3)}
        </div>
        <h2 className="text-xl">{account.accountName}</h2>
      </div>
      <div>
        <p className="flex items-center gap-2 text-red-200 pb-1">
          <FaUniversity />
          {account.accountNumber}
        </p>
        <h3 className="text-2xl">
          {hours}h {minutes}m {seconds}s
        </h3>
      </div>
    </button>
  );
};

export default AccountBox;
