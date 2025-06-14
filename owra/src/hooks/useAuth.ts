import { useCallback } from 'react';

export const useAuth = () => {
  const getAccessToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }, []);

  const setAccessToken = useCallback((token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', token);
  }, []);

  const removeAccessToken = useCallback((): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return getAccessToken() !== null;
  }, [getAccessToken]);

  return {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    isAuthenticated,
  };
};
