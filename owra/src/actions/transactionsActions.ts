import { Transaction } from "@/types/types";
import { createClient } from "@/utils/supabase/client";

export async function addTransaction(
  transaction: Transaction,
  accountId: string
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("User not found");
  }

  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", accountId)
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) {
    throw new Error("Account does not belong to user");
  }

  const { data, error } = await supabase.from("transactions").insert({
    ...transaction,
    account_id: account.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function reloadAccounts() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("User not found");
  }

  const { data: accounts, error: accountsError } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id);

  if (accountsError) {
    throw new Error(accountsError.message);
  }

  const currentTime = new Date().getTime();

  accounts.forEach(async (account) => {
    if (currentTime - account.last_reload >= account.reload_freq) {
      account.account_balance = account.account_balance + account.reloadAmount;
      account.last_reload = currentTime;
      await supabase
        .from("accounts")
        .update({
          account_balance: account.account_balance,
          last_reload: currentTime,
        })
        .eq("id", account.id);
    }
  });

  return accounts;
}
