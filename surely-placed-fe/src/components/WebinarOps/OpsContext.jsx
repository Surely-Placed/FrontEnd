'use client';

import { createContext, useContext } from 'react';

const OpsContext = createContext(null);

export function OpsProvider({ value, children }) {
  return <OpsContext.Provider value={value}>{children}</OpsContext.Provider>;
}

export function useOps() {
  const ctx = useContext(OpsContext);
  if (!ctx) throw new Error('useOps must be used inside OpsShell');
  return ctx;
}
