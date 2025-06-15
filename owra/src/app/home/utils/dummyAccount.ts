import { Account } from "@/types/types";

export const dummyAccount: Account = {
  id: "dummy-account",
  account_name: "Dummy Account",
  account_balance: 0,
  reload_freq: 0,
  last_reload: 0,
  reload_amount: 0,
  colour: "background",
  transactions: [],
  type: "burn",
};
