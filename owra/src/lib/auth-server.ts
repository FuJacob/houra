// Server-side authentication utilities
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  name: string;
  email: string;
}

export async function getServerSession(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Fetch user data from your API
    const response = await fetch("http://localhost:4500/api/auth/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function getUserAccounts(token: string) {
  try {
    const response = await fetch(
      "http://localhost:4500/api/accounts/getAccounts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.accounts || [];
  } catch (error) {
    return [];
  }
}
