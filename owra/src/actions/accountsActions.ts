import { Account } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export async function getAccounts() {
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

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getAccount(accountId: string) {
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

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", accountId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function addAccount(account: Account) {
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

  const { data, error } = await supabase.from("accounts").insert({
    user_id: user.id,
    ...account,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteAccount(accountId: string) {
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

  const { data, error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", accountId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateAccount(accountId: string, account: Account) {
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

  const { data, error } = await supabase
    .from("accounts")
    .update(account)
    .eq("id", accountId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
