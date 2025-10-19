'use strict'

import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'

export default function PreFooter() {
  return (
    <Box
      bg="linear-gradient(135deg, #4ecdc4 0%, #6b5dff 100%)"
      py={{ base: 16, md: 24 }}
      color="white">
      <Container maxW="1200px">
        <VStack gap={8} align="center" textAlign="center">
          <Heading as="h2" size="xl">
            Готовы испытать свою память?
          </Heading>
          <Text fontSize="lg" maxW="600px">
            Начните играть прямо сейчас и посмотрите, сколько пар вы сможете
            сопоставить!
          </Text>
          <Link to="/game">
            <Button
              size="lg"
              bg="white"
              color="#6b5dff"
              fontWeight="bold"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
              transition="all 0.3s ease">
              Играть сейчас
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  )
}
