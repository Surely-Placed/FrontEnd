'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import TitleContent from '@/common/TitleContent';
import SubtitleContent from '@/common/SubtitleContent';
import BulletContent from '@/common/BulletContent';
import {
  refundEvaluationFactors,
  nonRefundCircumstances,
  cancellationConsequences,
} from '../../../mockData/refund';

const RefundCancellationPolicy = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 1 },
        py: { xs: 2, sm: '6rem' },
        mt: { xs: 10, sm: 10, md: 10 },
      }}
    >
      {/* Main Heading */}
      <Typography
        component={'h1'}
        variant="h4"
        fontWeight={500}
        fontFamily={'var(--font-avantgarde), sans-serif'}
        lineHeight={'normal'}
        sx={{
          mb: '0.75rem',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Refund & Cancellation Policy
      </Typography>

      <Typography
        variant="subtitle1"
        fontFamily={'var(--font-avantgarde), sans-serif'}
        lineHeight={'normal'}
        sx={{
          mb: { xs: 3, sm: '2.81rem' },
        }}
      >
        Last updated: February 19, 2026
      </Typography>

      <TitleContent content={'1. General Policy'} />
      <SubtitleContent
        content={
          <>
            Surely Placed does not guarantee refunds or cancellations. Any refund or cancellation
            request is reviewed on a <strong>case-by-case</strong> basis and may be approved{' '}
            <strong>solely at the discretion of Surely Placed.</strong>
          </>
        }
      />
      <SubtitleContent
        content={
          'By enrolling in any cohort, service, or program, you acknowledge and agree to this policy.'
        }
      />

      <TitleContent content={'2. Refund Requests'} />
      <SubtitleContent
        content={
          <>
            Refund requests may be submitted by contacting our support team. Submission of a request
            does <strong>not</strong> guarantee approval.
          </>
        }
      />
      <SubtitleContent
        content={
          'Refunds, if approved, are evaluated based on factors including (but not limited to):'
        }
      />

      {refundEvaluationFactors.map((item, i) => (
        <BulletContent key={i} content={item} />
      ))}

      <TitleContent content={'3. Non-Guarantee of Refunds'} />
      <SubtitleContent
        content={
          <>
            Surely Placed is <strong>not obligated</strong> to provide refunds in any circumstance,
            including but not limited to:
          </>
        }
      />

      {nonRefundCircumstances.map((item, i) => (
        <BulletContent key={i} content={item} />
      ))}

      <TitleContent content={'4. Partial Refunds'} />
      <SubtitleContent
        content={
          <>
            If a refund is approved, Surely Placed may, at its sole discretion, issue a{' '}
            <strong>partial refund</strong> based on service usage and delivery status.
          </>
        }
      />

      <TitleContent content={'5. Cancellations'} />
      <SubtitleContent
        content={'You may request cancellation of your enrollment by notifying our support team.'}
      />
      {cancellationConsequences.map((item, i) => (
        <BulletContent key={i} content={item} />
      ))}

      <TitleContent content={'6. Processing Time'} />
      <SubtitleContent
        content={
          <>
            Any refund approved by Surely Placed will be processed within{' '}
            <strong>7–14 business days</strong> to the original payment method, unless otherwise
            stated.
          </>
        }
      />
      <TitleContent content={'7. Contact for Refunds'} />
      <SubtitleContent
        content={'All refund or cancellation requests must be submitted in writing to:'}
      />
      <SubtitleContent
        content={
          <>
            <strong>Email:</strong> support@surelyplaced.com
            <br />
            <strong>Phone:</strong> +1 (917) 755-0774
          </>
        }
      />
    </Box>
  );
};

export default RefundCancellationPolicy;
