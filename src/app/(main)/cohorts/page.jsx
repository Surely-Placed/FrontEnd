import AllCohorts from '@/components/Cohorts/AllCohorts'
import Header from '@/components/Cohorts/Header'
import FAQ from '@/components/Homepage/FAQ'
import FirstStep from '@/components/Homepage/FirstStep'
import Stories from '@/components/Homepage/Stories'
import { Box } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <Box>
        <Header />
        <AllCohorts />
        <Stories />
        <FAQ />
        <FirstStep />
    </Box>
  )
}

export default page