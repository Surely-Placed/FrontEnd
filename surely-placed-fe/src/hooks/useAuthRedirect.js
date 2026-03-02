'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/store/user/user.reducer';
import { getAuthToken } from './CookiesUtils';

const RETURN_URL_KEY = 'post_auth_return_url';

export const setReturnUrl = (url) => {
  try {
    if (typeof window !== 'undefined' && url) {
      sessionStorage.setItem(RETURN_URL_KEY, url);
    }
  } catch (_) {}
};

export const consumeReturnUrl = () => {
  try {
    if (typeof window === 'undefined') return null;
    const url = sessionStorage.getItem(RETURN_URL_KEY);
    if (url) {
      sessionStorage.removeItem(RETURN_URL_KEY);
      return url;
    }
  } catch (_) {}
  return null;
};

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector(selectUserData);

  const isAuthenticated = Boolean(user) || Boolean(getAuthToken());

  const ensureAuthAndNavigate = useCallback(
    (targetUrl) => {
      if (!targetUrl) return;
      if (isAuthenticated) {
        router.push(targetUrl);
        return;
      }
      // Save return URL then go to login
      setReturnUrl(targetUrl);
      router.push('/login');
    },
    [isAuthenticated, router]
  );

  const ensureAuthFromEvent = useCallback(
    (e, targetUrl) => {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      ensureAuthAndNavigate(targetUrl || pathname);
    },
    [ensureAuthAndNavigate, pathname]
  );

  return { isAuthenticated, ensureAuthAndNavigate, ensureAuthFromEvent };
}



