import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box
      bg="#333"
      _dark={{ bg: 'black' }}
      color="white"
      py={8}
      textAlign="center">
      <Text>&copy; 2025 Игра Память. Все права защищены.</Text>
    </Box>
  )
}
export default Footer
