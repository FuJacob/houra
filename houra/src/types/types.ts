import { IconType } from "react-icons";
import { Dispatch, SetStateAction } from "react";

export interface showAddAccountModalContextType {
  showAddAccountModal: boolean;
  setShowAddAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AccountContextType {
  selectedAccount: Account;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
}

export interface SelectedAccountContextType {
  selectedAccount: Account;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
  timerRef: React.RefObject<HTMLDivElement | null>;
  accountsRef: React.RefObject<HTMLDivElement | null>;
  bringToTimer: () => void;
  goToAccounts: () => void;
}

export interface Account {
  accountNumber: number;
  accountName: string;
  accountBalance: number;
  reloadFreq: string;
  colour: string;
  transactions: Transaction[];
  type: string;
}

export interface Transaction {
  startTime: number;
  endTime: number;
  duration: number;
}
export interface User {
  name: string;
  email: string;
  password: string;
  accounts: Account[];
}

export interface SidebarButtonProps {
  id: string;
  icon: IconType;
  label: string;
}

export interface AccountBoxProps {
  accountNumber: number;
  accountName: string;
  accountBalance: number;
}

export interface AddAccountModalProps {
  setShowAddAccountModal: Dispatch<SetStateAction<boolean>>;
}

export interface CurrentUserContextType {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
}

export interface HomeContextType {
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
}
