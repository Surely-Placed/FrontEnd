'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { sectionMotion } from '../styles';

export function AnimatedSection({ children, sx, ...props }) {
  return (
    <motion.div {...sectionMotion} {...props}>
      <Box sx={sx}>{children}</Box>
    </motion.div>
  );
}

export function AnimatedItem({ children, delay = 0, sx }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{ height: sx?.height === '100%' ? '100%' : 'auto', width: '100%' }}
    >
      <Box sx={sx}>{children}</Box>
    </motion.div>
  );
}
