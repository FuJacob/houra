// SSR version of home page
import { redirect } from "next/navigation";
import { getServerSession, getUserAccounts } from "@/lib/auth-server";
import { cookies } from "next/headers";
import HomeClient from "./home-client";

export default async function HomePage() {
  // Server-side authentication check
  const user = await getServerSession();

  if (!user) {
    redirect("/login");
  }

  // Fetch user accounts on server
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token")?.value;
  const accounts = token ? await getUserAccounts(token) : [];

  // Pass server data to client component
  return <HomeClient initialUser={user} initialAccounts={accounts} />;
}
