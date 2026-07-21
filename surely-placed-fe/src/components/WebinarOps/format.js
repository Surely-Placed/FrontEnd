import { CURRENCY, TZ } from './constants';

export function formatMoneyUsd(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: CURRENCY,
  }).format((Number(cents) || 0) / 100);
}

export function formatEst(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date(iso));
  } catch {
    return '—';
  }
}

/** Parse datetime-local "YYYY-MM-DDTHH:mm" into numeric wall-clock parts. */
function parseLocalDateTimeParts(localValue) {
  const match = String(localValue || '').match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/
  );
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
    second: Number(match[6] || 0),
  };
}

/**
 * Treat datetime-local value as America/New_York wall-clock time and return UTC ISO.
 * Avoids browser-local timezone skew (e.g. IST → wrong ET label).
 */
export function easternWallTimeToIso(localValue) {
  const parts = parseLocalDateTimeParts(localValue);
  if (!parts) return null;

  const utcGuess = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const asNy = Object.fromEntries(
    dtf
      .formatToParts(new Date(utcGuess))
      .filter((p) => p.type !== 'literal')
      .map((p) => [p.type, p.value])
  );

  const nyAsUtc = Date.UTC(
    Number(asNy.year),
    Number(asNy.month) - 1,
    Number(asNy.day),
    Number(asNy.hour === '24' ? '0' : asNy.hour),
    Number(asNy.minute),
    Number(asNy.second)
  );

  // Shift so the NY wall clock matches the picker value
  return new Date(utcGuess + (utcGuess - nyAsUtc)).toISOString();
}

/** datetime-local (EST wall clock) → public label in ET */
export function formatDisplayLabelFromLocal(localValue) {
  if (!localValue) return '';
  const iso = easternWallTimeToIso(localValue);
  if (!iso) return '';
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).formatToParts(new Date(iso));
    const get = (type) => parts.find((p) => p.type === type)?.value || '';
    return `${get('weekday')}, ${get('month')} ${get('day')}, ${get('year')} · ${get('hour')}:${get('minute')} ${get('dayPeriod')} ET`;
  } catch {
    return '';
  }
}
