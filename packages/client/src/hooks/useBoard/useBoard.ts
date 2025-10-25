import { useCallback, useEffect, useState } from 'react'
import { useColors } from '../useColors/useColors'
import { Card } from '../../types/card'

export const useBoard = (
  rows: number,
  cols: number,
  cardWidth: number,
  cardHeight: number,
  spacing: number
) => {
  const { getColorsForPairs } = useColors()
  const [cards, setCards] = useState<Card[]>([])

  const initializeBoard = useCallback(() => {
    const pairsCount = (rows * cols) / 2
    const colors = getColorsForPairs(pairsCount)

    const items = [...colors, ...colors]
      .sort(() => Math.random() - 0.5)
      .map((color, index) => ({
        id: index,
        color,
        x: (cardWidth + spacing) * (index % cols),
        y: (cardHeight + spacing) * Math.floor(index / cols),
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
