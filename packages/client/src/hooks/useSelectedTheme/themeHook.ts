import React from 'react'

export const useTheme = () => {
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme || 'light'
    setColorMode(initialTheme)
  }, [])

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light'
    setColorMode(newColorMode)

    document.documentElement.setAttribute('data-theme', newColorMode)
    document.documentElement.style.colorScheme = newColorMode
    localStorage.setItem('theme', newColorMode)

    if (newColorMode === 'dark') {
      document.body.style.backgroundColor = '#0f1419'
      document.body.style.color = '#e1e7ed'
    } else {
      document.body.style.backgroundColor = '#ffffff'
      document.body.style.color = '#2d3748'
    }
  }

  return { colorMode, toggleColorMode }
}
