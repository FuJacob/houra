import AccountBox from "../home/components/AccountBox";
import { Account } from "@/types/types";

const dummyAccounts: Account[] = [
  {
    accountNumber: 1000000001,
    accountName: "VALORANT",
    accountBalance: 90,
    reloadFreq: "daily",
    colour: "#3B82F6",
    transactions: [],
    type: "burn",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 1000000002,
    accountName: "Study for SAT",
    accountBalance: 150,
    reloadFreq: "weekly",
    colour: "#10B981",
    transactions: [],
    type: "growth",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 1000000003,
    accountName: "Learn French",
    accountBalance: 120,
    reloadFreq: "monthly",
    colour: "#F59E0B",
    transactions: [],
    type: "growth",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 1000000004,
    accountName: "YouTube",
    accountBalance: 45,
    reloadFreq: "daily",
    colour: "#EF4444",
    transactions: [],
    type: "burn",
    lastReload: 0,
    reloadAmount: 0,
  },
  {
    accountNumber: 1000000005,
    accountName: "TikTok",
    accountBalance: 30,
    reloadFreq: "daily",
    colour: "#8B5CF6",
    transactions: [],
    type: "burn",
    lastReload: 0,
    reloadAmount: 0,
  },
];

const DummyAccountsStacked = () => {
  return (
    <div className="relative h-64 w-full flex justify-center items-center">
      {dummyAccounts.map((account, index) => (
        <div
          key={account.accountNumber}
          className="absolute"
          style={{
            left: `${index * 10 + 5}rem`,
            top: `${index % 2 === 0 ? -1 : 1}rem`,
            zIndex: index,
            rotate: `${index % 2 === 0 ? -8 : 8}deg`,
          }}
        >
          <AccountBox account={account} isDummy={true} />
        </div>
      ))}
    </div>
  );
};

export default DummyAccountsStacked;
