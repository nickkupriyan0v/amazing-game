'use client'

import { Box } from '@chakra-ui/react'
import Header from '../../components/mainPage/Header'
import Hero from '../../components/mainPage/Hero'
import Features from '../../components/mainPage/Features'
import HowItWorks from '../../components/mainPage/HowItWorks'
import Statistics from '../../components/mainPage/Statistics'
import Footer from '../../components/mainPage/Footer'
import PreFooter from '../../components/mainPage/PreFooter'

export default function Home() {
  return (
    <Box bg="#f8f9fa" minH="100vh">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Statistics />
      <PreFooter />
      <Footer />
    </Box>
  )
}
