import { Account, Transaction } from "@/types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Account API functions
export const accountsApi = {
  // Get all accounts
  getAccounts: async (): Promise<Account[]> => {
    const response = await fetch(`${API_BASE_URL}/api/accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }

    const data = await response.json();
    return data.accounts;
  },

  // Get single account
  getAccount: async (accountId: string): Promise<Account> => {
    const response = await fetch(`${API_BASE_URL}/api/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch account");
    }

    const data = await response.json();
    return data.account;
  },

  // Add new account
  addAccount: async (account: Account): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    if (!response.ok) {
      throw new Error("Failed to add account");
    }

    const data = await response.json();
    return data.result;
  },

  // Update account
  updateAccount: async (accountId: string, account: Account): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/accounts/${accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    if (!response.ok) {
      throw new Error("Failed to update account");
    }

    const data = await response.json();
    return data.result;
  },

  // Delete account
  deleteAccount: async (accountId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/accounts/${accountId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete account");
    }

    const data = await response.json();
    return data.result;
  },

  // Reload accounts
  reloadAccounts: async (): Promise<Account[]> => {
    const response = await fetch(`${API_BASE_URL}/api/accounts/reload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to reload accounts");
    }

    const data = await response.json();
    return data.accounts;
  },
};

// Transaction API functions
export const transactionsApi = {
  // Add transaction to account
  addTransaction: async (
    transaction: Transaction,
    accountId: string
  ): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transaction, accountId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }

    const data = await response.json();
    return data.result;
  },
};

export const authApi = {
  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async signup(userData: { email: string; password: string; name: string }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
