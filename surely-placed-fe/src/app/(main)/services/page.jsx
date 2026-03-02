import FAQ from '@/components/Homepage/FAQ'
import FirstStep from '@/components/Homepage/FirstStep'
import Stories from '@/components/Homepage/Stories'
import Expertise from '@/components/Services/Expertise'
import Innovation from '@/components/Services/Innovation'
import { Box } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <Box>
        <Expertise />
        <Innovation />
        <Stories />
        <FAQ />
        <FirstStep />
    </Box>
  )
}

export default page