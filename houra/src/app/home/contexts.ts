import { createContext } from "react";
import {
  AccountContextType,
  CurrentUserContextType,
  showAddAccountModalContextType,
  HomeContextType,
} from "@/types/types";

export const showAddAccountModalContext =
  createContext<showAddAccountModalContextType>({
    showAddAccountModal: false,
    setShowAddAccountModal: () => {},
  });

export const selectedAccountContext = createContext<AccountContextType>({
  selectedAccount: {
    accountNumber: 0,
    accountName: "",
    accountBalance: 0,
    reloadFreq: "",
    colour: "background",
    transactions: [],
    type: "",
  },
  setSelectedAccount: () => {},
});

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: {
    name: "",
    email: "",
    password: "",
    accounts: [],
  },
  setCurrentUser: () => {},
});

export const HomeContext = createContext<HomeContextType>({
  selectedPage: "Home",
  setSelectedPage: () => {},
});
