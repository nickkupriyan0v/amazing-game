import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <Box minH="100vh" bg="bg.canvas" color="fg.default">
      {children}
    </Box>
  )
}
