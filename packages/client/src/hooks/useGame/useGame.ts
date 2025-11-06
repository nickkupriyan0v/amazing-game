import { useCallback } from 'react'
import { useBoard } from '../useBoard/useBoard'
import { useGameLogic } from '../useGameLogic/useGameLogic'
import { SETTINGS } from '../../constants/game'

export const useGame = (config = SETTINGS) => {
  const { rows, cols, cardWidth, cardHeight, spacing } = config

  const { cards, resetBoard } = useBoard(
    rows,
    cols,
    cardWidth,
    cardHeight,
    spacing
  )
  const {
    flipped,
    matched,
    disabled,
    count,
    seconds,
    startTimer,
    resetTimer,
    handleCardClick,
    resetGame,
    isGameComplete,
    setTimerRunning,
  } = useGameLogic(cards)

  const reset = useCallback(() => {
    resetBoard()
    resetGame()
    resetTimer()
  }, [resetBoard, resetGame, resetTimer])

  const canvasSize = {
    width: cols * (cardWidth + spacing),
    height: rows * (cardHeight + spacing),
  }

  return {
    seconds,
    startTimer,
    cards,
    flipped,
    matched,
    disabled,
    count,
    handleCardClick,
    reset,
    isGameComplete: isGameComplete(),
    canvasSize,
  }
}
