'use client';

import { useCallback, useEffect, useState } from 'react';
import { TOKEN_KEY } from '../constants';

export default function useOpsAuth() {
  const [token, setToken] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(window.sessionStorage.getItem(TOKEN_KEY) || '');
    setReady(true);
  }, []);

  const login = useCallback((nextToken) => {
    window.sessionStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
  }, []);

  return { token, ready, login, logout, isAuthenticated: Boolean(token) };
}
