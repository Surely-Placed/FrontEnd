'use client';

import { useEffect, useMemo, useState } from 'react';

export function useCountdown(targetIso) {
  const target = useMemo(() => {
    if (!targetIso) return null;
    const t = new Date(targetIso).getTime();
    return Number.isFinite(t) ? t : null;
  }, [targetIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const diff = target == null ? 0 : Math.max(0, target - now);
  const pad = (n) => String(n).padStart(2, '0');

  return {
    d: pad(Math.floor(diff / 86_400_000)),
    h: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    m: pad(Math.floor((diff % 3_600_000) / 60_000)),
    s: pad(Math.floor((diff % 60_000) / 1000)),
  };
}
