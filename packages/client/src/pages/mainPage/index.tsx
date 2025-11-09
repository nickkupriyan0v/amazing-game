import { Box } from '@chakra-ui/react'
import Hero from '../../components/mainPage/Hero'
import Features from '../../components/mainPage/Features'
import HowItWorks from '../../components/mainPage/HowItWorks'
import Statistics from '../../components/mainPage/Statistics'
import Footer from '../../components/mainPage/Footer'
import PreFooter from '../../components/mainPage/PreFooter'

const Home = () => {
  return (
    <Box bg="#f8f9fa">
      <Hero />
      <Features />
      <HowItWorks />
      <Statistics />
      <PreFooter />
      <Footer />
    </Box>
  )
}
export default Home
