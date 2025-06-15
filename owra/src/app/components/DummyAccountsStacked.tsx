import AccountBox from "../home/components/AccountBox";
import { Account } from "@/types/types";

const dummyAccounts: Account[] = [
  {
    id: "1000000001",
    account_name: "VALORANT",
    account_balance: 90,
    reload_freq: 1,
    colour: "#3B82F6",
    transactions: [],
    type: "burn",
    last_reload: 0,
    reload_amount: 0,
  },
  {
    id: "1000000002",
    account_name: "Study for SAT",
    account_balance: 150,
    reload_freq: 7,
    colour: "#10B981",
    transactions: [],
    type: "growth",
    last_reload: 0,
    reload_amount: 0,
  },
  {
    id: "1000000003",
    account_name: "Learn French",
    account_balance: 120,
    reload_freq: 30,
    colour: "#F59E0B",
    transactions: [],
    type: "growth",
    last_reload: 0,
    reload_amount: 0,
  },
  {
    id: "1000000004",
    account_name: "YouTube",
    account_balance: 45,
    reload_freq: 1,
    colour: "#EF4444",
    transactions: [],
    type: "burn",
    last_reload: 0,
    reload_amount: 0,
  },
  {
    id: "1000000005",
    account_name: "TikTok",
    account_balance: 30,
    reload_freq: 1,
    colour: "#8B5CF6",
    transactions: [],
    type: "burn",
    last_reload: 0,
    reload_amount: 0,
  },
];

const DummyAccountsStacked = () => {
  return (
    <div className="relative h-64 w-full flex justify-center items-center">
      {dummyAccounts.map((account, index) => (
        <div
          key={account.id}
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
