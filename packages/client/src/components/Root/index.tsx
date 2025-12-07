import { ReactNode } from 'react'
import Header from '../Header'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default RootLayout
