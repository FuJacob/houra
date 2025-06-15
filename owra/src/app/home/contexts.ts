import { createContext } from "react";
import {
  SelectedAccountContextType,
  CurrentUserContextType,
  showAddAccountModalContextType,
  HomeContextType,
} from "@/types/types";

export const showAddAccountModalContext =
  createContext<showAddAccountModalContextType>({
    showAddAccountModal: false,
    setShowAddAccountModal: () => {},
  });

// Create default refs for context
const createDefaultRef = (): React.RefObject<HTMLDivElement | null> => ({
  current: null,
});

export const selectedAccountContext = createContext<SelectedAccountContextType>(
  {
    selectedAccount: {
      id: 0,
      account_name: "",
      account_balance: 0,
      reload_freq: "",
      colour: "background",
      transactions: [],
      type: "",
    },
    setSelectedAccount: () => {},
    timerRef: createDefaultRef(),
    accountsRef: createDefaultRef(),
    bringToTimer: () => {},
    goToAccounts: () => {},
  }
);

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
