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

export interface Account {
  accountNumber: number;
  accountName: string;
  accountBalance: number;
  reloadFreq: string;
  colour: string;
  transactions: Transaction[];
}

export interface Transaction {
  transactionId: string;
  transactionAmount: number;
  transactionDate: Date;
  startTime: Date;
  endTime: Date;
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
