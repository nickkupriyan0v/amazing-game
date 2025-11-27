import * as React from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { themeStyles } from './styles'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = props => {
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light')
  const [isStylesAdded, setIsStylesAdded] = React.useState(false)

  React.useEffect(() => {
    if (!isStylesAdded) {
      const styleElement = document.createElement('style')
      styleElement.textContent = themeStyles
      document.head.appendChild(styleElement)
      setIsStylesAdded(true)

      const savedTheme = localStorage.getItem('theme') as
        | 'light'
        | 'dark'
        | null
      const initialTheme = savedTheme || 'light'
      setColorMode(initialTheme)
      applyTheme(initialTheme)
    }
  }, [isStylesAdded])

  const applyTheme = (theme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme

    if (theme === 'dark') {
      document.body.classList.add('chakra-ui-dark')
      document.body.classList.remove('chakra-ui-light')
      document.body.style.backgroundColor = '#0f1419'
      document.body.style.color = '#e1e7ed'
    } else {
      document.body.classList.add('chakra-ui-light')
      document.body.classList.remove('chakra-ui-dark')
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#2d3748'
    }
  }

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light'
    setColorMode(newColorMode)
    applyTheme(newColorMode)
    localStorage.setItem('theme', newColorMode)
  }

  const text = colorMode === 'light' ? 'dark' : 'light'
  const SwitchIcon = colorMode === 'light' ? FaMoon : FaSun

  return (
    <IconButton
      title="Выбор темы"
      size="sm"
      variant="ghost"
      color="green.600"
      _hover={{
        color: 'green.400',
        bg: 'transparent',
      }}
      transition="color 0.2s ease"
      margin={4}
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
      {...props}>
      <SwitchIcon />
    </IconButton>
  )
}
