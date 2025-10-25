import { useCallback, useState } from 'react'
import { Card } from '../../types/card'

export const useGameLogic = (cards: Card[]) => {
  const [count, setCount] = useState(0)
  const [flipped, setFlipped] = useState<Card['id'][]>([])
  const [matched, setMatched] = useState<Card['id'][]>([])
  const [disabled, setDisabled] = useState(false)

  const handleCardClick = useCallback(
    (cardId: Card['id']) => {
      if (disabled || flipped.includes(cardId) || matched.includes(cardId)) {
        return false
      }

      setCount(prev => (prev += 1))

      const newFlipped = [...flipped, cardId]
      setFlipped(newFlipped)

      if (newFlipped.length === 2) {
        setDisabled(true)
        const [firstId, secondId] = newFlipped
        const firstCard = cards.find(card => card.id === firstId)
        const secondCard = cards.find(card => card.id === secondId)

        if (firstCard?.color === secondCard?.color) {
          setMatched(prev => [...prev, firstId, secondId])
          setFlipped([])
          setDisabled(false)
        } else {
          setTimeout(() => {
            setFlipped([])
            setDisabled(false)
          }, 1000)
        }
      }

      return true
    },
    [cards, disabled, flipped, matched]
  )

  const resetGame = useCallback(() => {
    setFlipped([])
    setMatched([])
    setCount(0)
    setDisabled(false)
  }, [])

  const isGameComplete = useCallback(() => {
    return matched.length === cards.length && cards.length > 0
  }, [matched.length, cards.length])

  return {
    flipped,
    matched,
    disabled,
    count,
    handleCardClick,
    resetGame,
    isGameComplete,
  }
}
