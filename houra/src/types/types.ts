import { IconType } from "react-icons";
import { Dispatch, SetStateAction } from "react";

export interface HomeContextType {
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
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
