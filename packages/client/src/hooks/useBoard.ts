import { useCallback, useEffect, useState } from 'react'
import { useColors } from './useColors'

export const useBoard = (rows, cols, cardWidth, cardHeight, spacing) => {
  const { getColorsForPairs } = useColors()
  const [cards, setCards] = useState([])

  const initializeBoard = useCallback(() => {
    const pairsCount = (rows * cols) / 2
    const colors = getColorsForPairs(pairsCount)

    const items = [...colors, ...colors]
      .sort(() => Math.random() - 0.5)
      .map((color, index) => ({
        id: index,
        color,
        x: (cardWidth + spacing + 9) * (index % cols),
        y: (cardHeight + spacing + 5) * Math.floor(index / cols),
      }))

    setCards(items)
  }, [rows, cols, cardWidth, cardHeight, spacing, getColorsForPairs])

  const resetBoard = useCallback(() => {
    initializeBoard()
  }, [initializeBoard])

  useEffect(() => {
    initializeBoard()
  }, [initializeBoard])

  return { cards, resetBoard }
}
