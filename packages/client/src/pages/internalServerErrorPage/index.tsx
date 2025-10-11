import { Box, Heading, Button, VStack, Container } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface NotFoundPageProps {
  errorText?: string
}

const InternalServerError = ({
  errorText = 'Внутренняя ошибка сервера',
}: NotFoundPageProps) => {
  const navigate = useNavigate()

  return (
    <Container
      maxW="container.md"
      display="flex"
      alignItems="center"
      justifyContent="center">
      <VStack textAlign="center">
        <Box>
          <Heading as="h1" size="2xl" color="gray.700" mb={4}>
            {errorText}
          </Heading>
        </Box>

        <Button
          onClick={() => navigate(-1)}
          colorScheme="blue"
          size="lg"
          px={8}
          _hover={{ textDecoration: 'none', transform: 'translateY(-2px)' }}
          transition="all 0.2s">
          Назад
        </Button>
      </VStack>
    </Container>
  )
}

export default InternalServerError
