import { useCallback, useState } from 'react'
import { CARD_COLORS } from '../../constants/game'

export const useColors = () => {
  const [colors] = useState<string[]>(CARD_COLORS)

  const getColorsForPairs = useCallback(
    (pairsCount: number) => colors.slice(0, pairsCount),
    [colors]
  )

  return { getColorsForPairs }
}
