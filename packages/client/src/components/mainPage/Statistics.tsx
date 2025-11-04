'use client'

import { Box, Container, Text, Heading, Grid } from '@chakra-ui/react'
export default function Statistics() {
  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="1200px">
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          {[
            { number: '10K+', label: 'Игроков' },
            { number: '50K+', label: 'Игр сыграно' },
            { number: '4.8★', label: 'Рейтинг' },
          ].map((stat, index) => (
            <Box key={index} textAlign="center" py={8}>
              <Heading as="h3" size="2xl" color="#6b5dff" mb={2}>
                {stat.number}
              </Heading>
              <Text color="#666" fontSize="lg">
                {stat.label}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
