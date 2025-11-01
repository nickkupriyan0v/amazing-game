import { Box, Heading, Button, VStack, Container } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

interface NotFoundPageProps {
  errorText?: string
}

const NotFoundPage = ({
  errorText = 'Страница не найдена',
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
          onClick={() => navigate(ROUTES.mainPage)}
          colorScheme="blue"
          size="lg"
          px={8}
          _hover={{ textDecoration: 'none', transform: 'translateY(-2px)' }}
          transition="all 0.2s">
          На главную
        </Button>
      </VStack>
    </Container>
  )
}

export default NotFoundPage
