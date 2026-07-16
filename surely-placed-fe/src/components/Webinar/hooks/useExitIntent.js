'use client';

import { useEffect } from 'react';

export function useExitIntent(enabled, onFire, armDelayMs = 6000) {
  useEffect(() => {
    if (!enabled) return;
    let fired = false;
    let handler = null;
    const arm = window.setTimeout(() => {
      handler = (e) => {
        if (fired || e.relatedTarget || e.clientY > 12) return;
        fired = true;
        onFire();
      };
      document.addEventListener('mouseout', handler);
    }, armDelayMs);
    return () => {
      window.clearTimeout(arm);
      if (handler) document.removeEventListener('mouseout', handler);
    };
  }, [enabled, onFire, armDelayMs]);
}
