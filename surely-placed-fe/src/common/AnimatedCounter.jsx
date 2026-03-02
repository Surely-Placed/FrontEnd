'use client';
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

// Helper: parse string like "15K" → 15000
function parseValue(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;

  const num = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, "").toUpperCase();

  switch (suffix) {
    case "K":
      return num * 1000;
    case "M":
      return num * 1000000;
    case "B":
      return num * 1000000000;
    default:
      return num;
  }
}

function formatValue(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return Math.round(num).toString();
}

function AnimatedCounter({ end, duration = 2.6 }) {
  const numericEnd = parseValue(end);
  const count = useMotionValue(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const formatted = useTransform(count, (latest) => formatValue(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, numericEnd, {
        duration,
        ease: "easeOut",
      });
    }
  }, [isInView, count, numericEnd, duration]);

  return (
    <motion.span ref={ref} style={{ display: "inline-block" }}>
      {formatted}
    </motion.span>
  );
}

export default AnimatedCounter;
