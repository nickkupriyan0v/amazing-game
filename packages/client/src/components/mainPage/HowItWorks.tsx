import { Box, Container, Text, Heading, Grid } from '@chakra-ui/react'
export default function HowItWorks() {
  return (
    <Box py={{ base: 16, md: 24 }} bg="#f8f9fa">
      <Container maxW="1200px">
        <Heading as="h2" size="xl" textAlign="center" mb={12} color="#333">
          Как это работает
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
              step: '1',
              title: 'Переворачивайте карточки',
              description:
                'Нажимайте на карточки, чтобы открыть скрытые символы',
            },
            {
              step: '2',
              title: 'Найдите пары',
              description:
                'Сопоставьте две одинаковые карточки, чтобы заработать очки',
            },
            {
              step: '3',
              title: 'Завершите уровень',
              description: 'Сопоставьте все пары, чтобы закончить игру',
            },
            {
              step: '4',
              title: 'Побейте свой рекорд',
              description: 'Испытайте себя, чтобы завершить игру быстрее',
            },
          ].map((item, index) => (
            <Box
              key={index}
              p={8}
              bg="white"
              borderRadius="12px"
              textAlign="center"
              boxShadow="0 2px 8px rgba(0,0,0,0.05)">
              <Box
                w="50px"
                h="50px"
                bg="#6b5dff"
                color="white"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="24px"
                fontWeight="bold"
                mx="auto"
                mb={4}>
                {item.step}
              </Box>
              <Heading as="h3" size="md" mb={3} color="#333">
                {item.title}
              </Heading>
              <Text color="#666" fontSize="sm">
                {item.description}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
