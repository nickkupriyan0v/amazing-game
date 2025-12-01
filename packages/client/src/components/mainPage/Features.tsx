import { Box, Container, Text, Heading, Grid } from '@chakra-ui/react'
export const Features = () => {
  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="1200px">
        <Heading as="h2" size="xl" textAlign="center" mb={12} color="#333">
          Почему играть в Игру Память?
        </Heading>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={8}>
          {[
            {
              title: 'Улучшить память',
              description: 'Развивайте когнитивные способности и запоминание',
              emoji: '🧠',
            },
            {
              title: 'Быстрые сеансы',
              description:
                'Играйте в любое время и в любом месте за несколько минут',
              emoji: '⚡',
            },
            {
              title: 'Тренировка мозга',
              description:
                'Улучшайте концентрацию и внимание с помощью забавных вызовов',
              emoji: '🎯',
            },
            {
              title: 'Отслеживать прогресс',
              description:
                'Следите за своими улучшениями и побивайте свои рекорды',
              emoji: '📊',
            },
          ].map((feature, index) => (
            <Box
              key={index}
              p={8}
              bg="#f8f9fa"
              _dark={{ bg: 'black' }}
              borderRadius="12px"
              textAlign="center"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
              transition="all 0.3s ease">
              <Text fontSize="40px" mb={4}>
                {feature.emoji}
              </Text>
              <Heading as="h3" size="md" mb={3} color="#333">
                {feature.title}
              </Heading>
              <Text color="#666" fontSize="sm">
                {feature.description}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
export default Features
