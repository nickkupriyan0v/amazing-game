import { useEffect } from 'react'

export const useKeyClick = (ref: React.RefObject<HTMLElement>, key: string) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        e.preventDefault()
        ref.current?.click()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [key, ref])
}
