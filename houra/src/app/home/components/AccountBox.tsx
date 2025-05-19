import { FaUniversity } from "react-icons/fa";
const AccountBox = ({
  accountName,
  accountBalance,
}: {
  accountName: string;
  accountBalance: number;
}) => {
  return (
    <li className="p-4 bg-gray-200 w-64 h-54 rounded-2xl flex-col flex justify-between">
      <div className="flex items-center gap-2">
        <div className="rounded-full w-12 h-12 bg-white flex justify-center items-center ">
          {accountName.slice(0, 3)}
        </div>{" "}
        <h2 className="text-xl font-semibold">{accountName}</h2>
      </div>{" "}
      <div className="">
        <p className="flex items-center gap-2 text-gray-500 pb-1">
          <FaUniversity />
          31231231
        </p>
        <h3 className="font-semibold text-2xl">{accountBalance}</h3>
      </div>
    </li>
  );
};
export default AccountBox;
