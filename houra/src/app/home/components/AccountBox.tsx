import { FaUniversity } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { selectedAccountContext } from "../page";
import { useContext } from "react";
import { AccountBoxProps } from "@/types/types";

const AccountBox = ({
  accountNumber,
  accountName,
  accountBalance,
}: AccountBoxProps) => {
  const { selectedAccount, setSelectedAccount } = useContext(
    selectedAccountContext
  );

  return (
    <button
      onClick={() => setSelectedAccount(accountNumber)}
      className="font-semibold w-96 h-52 min-w-96 max-w-96 border p-4 rounded-xl bg-red-600 text-background flex flex-col justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="rounded-full w-12 h-12 bg-white flex justify-center items-center text-red-600">
          {accountName?.slice(0, 3)}
        </div>
        <h2 className="text-xl">{accountName}</h2>
      </div>
      <div>
        <p className="flex items-center gap-2 text-red-200 pb-1">
          <FaUniversity />
          {accountNumber}
        </p>
        <h3 className="text-2xl">{accountBalance}h</h3>
      </div>
    </button>
  );
};

export default AccountBox;
