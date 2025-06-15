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
  id: string;
  created_at?: string; // timestamptz from database
  user_id?: string; // foreign key to users table
  account_name: string;
  account_balance: number; // int8 from database
  reload_freq: number; // int8 from database (changed from string)
  last_reload: number; // int8 from database
  reload_amount: number; // int8 from database
  colour: string;
  type: string;
  transactions?: Transaction[]; // optional since it's a relation, not a direct field
}

export interface Transaction {
  id?: string; // uuid primary key
  duration: number; // int8 from database
  start_time: string; // timestamptz from database
  end_time: string; // timestamptz from database
  account_id?: string; // foreign key to accounts table
}

export interface User {
  id?: string; // uuid primary key
  created_at: string; // timestamptz from database
  name: string;
  accounts?: Account[]; // optional since it's a relation, not a direct field
}

export interface SidebarButtonProps {
  id: string;
  icon: IconType;
  label: string;
}

export interface AccountBoxProps {
  id: number;
  account_name: string;
  account_balance: number;
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
