import { useCallback } from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const supabase = await createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw new Error(error.message);
      }

      return user;
    };

    getCurrentUser()
      .then((user) => {
        if (!user) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(user);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);

  return { isAuthenticated, user };
};
