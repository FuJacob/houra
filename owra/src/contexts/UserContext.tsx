"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserContextType } from "@/types/types";
import type { User } from "@supabase/auth-js";

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const supabase = await createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error("Error getting user:", error.message);
          setUser(null);
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error("Error getting user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();

    // Listen for auth changes
    const setupAuthListener = async () => {
      const supabase = await createClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return subscription;
    };

    setupAuthListener();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
