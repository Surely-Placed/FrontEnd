'use client';

import { useEffect, useState } from 'react';
import { getActiveWebinarPublic } from '@/lib/payments';
import { WEBINAR_DATETIME_LABEL, WEBINAR_DEFAULTS } from '../../../../mockData/Webinar';
import { useCountdown } from './useCountdown';

export function useWebinarPublic({
  price: priceProp = WEBINAR_DEFAULTS.price,
  seatsLeft: seatsLeftProp = WEBINAR_DEFAULTS.seatsLeft,
  seatsTotal: seatsTotalProp = WEBINAR_DEFAULTS.seatsTotal,
  webinarDate: webinarDateProp = WEBINAR_DEFAULTS.webinarDate,
  datetimeLabel: datetimeLabelProp = WEBINAR_DATETIME_LABEL,
} = {}) {
  const [price, setPrice] = useState(priceProp);
  const [seatsLeft, setSeatsLeft] = useState(seatsLeftProp);
  const [seatsTotal, setSeatsTotal] = useState(seatsTotalProp);
  const [webinarDate, setWebinarDate] = useState(webinarDateProp);
  const [datetimeLabel, setDatetimeLabel] = useState(datetimeLabelProp);
  const [webinarActive, setWebinarActive] = useState(true);

  const priceLabel = `$${Number(price).toFixed(2)}`;
  const countdown = useCountdown(webinarDate);

  useEffect(() => {
    let cancelled = false;

    const applyWebinar = (w) => {
      if (!w || cancelled) return;
      setWebinarActive(w.active !== false);
      if (typeof w.seatsLeft === 'number') setSeatsLeft(w.seatsLeft);
      if (typeof w.seatsTotal === 'number') setSeatsTotal(w.seatsTotal);
      if (w.priceCents) setPrice(w.priceCents / 100);
      if (w.startsAt) setWebinarDate(w.startsAt);
      if (w.datetimeLabel) setDatetimeLabel(w.datetimeLabel);
    };

    const refresh = () =>
      getActiveWebinarPublic()
        .then((data) => applyWebinar(data?.webinar))
        .catch(() => {
          /* keep last known values */
        });

    refresh();
    const timer = window.setInterval(refresh, 10_000);
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const seatsFilled = Math.max(0, seatsTotal - seatsLeft);
  const seatsProgress =
    seatsTotal > 0 ? Math.min(100, Math.round((seatsFilled / seatsTotal) * 100)) : 0;

  return {
    price,
    priceLabel,
    seatsLeft,
    setSeatsLeft,
    seatsTotal,
    seatsProgress,
    webinarDate,
    datetimeLabel,
    webinarActive,
    countdown,
  };
}
