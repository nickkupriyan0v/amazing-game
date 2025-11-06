import { renderHook, act } from '@testing-library/react'
import { useGame } from './useGame'

jest.mock('../useBoard/useBoard')
jest.mock('../useGameLogic/useGameLogic')

import { useBoard } from '../useBoard/useBoard'
import { useGameLogic } from '../useGameLogic/useGameLogic'
import { SETTINGS } from '../../constants/game'

describe('useGame хук', () => {
  const mockCards = [
    { id: 1, color: 'red', x: 0, y: 0 },
    { id: 2, color: 'red', x: 50, y: 0 },
  ]

  const resetBoard = jest.fn()
  const resetGame = jest.fn()
  const handleCardClick = jest.fn()
  const isGameComplete = jest.fn()
  const resetTimer = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks() as typeof jest
    ;(useBoard as jest.Mock).mockReturnValue({
      cards: mockCards,
      resetBoard,
    })
    ;(useGameLogic as jest.Mock).mockReturnValue({
      flipped: [1],
      matched: [],
      disabled: false,
      count: 0,
      handleCardClick,
      resetGame,
      isGameComplete,
      resetTimer,
    })
  })

  it('должен корректно возвращать данные и методы', () => {
    isGameComplete.mockReturnValue(false)

    const { result } = renderHook(() => useGame())

    expect(result.current.cards).toEqual(mockCards)
    expect(result.current.flipped).toEqual([1])
    expect(result.current.matched).toEqual([])
    expect(result.current.disabled).toBe(false)
    expect(result.current.count).toBe(0)
    expect(result.current.handleCardClick).toBe(handleCardClick)
    expect(result.current.isGameComplete).toBe(false)
    expect(result.current.canvasSize).toEqual({
      width: SETTINGS.cols * (SETTINGS.cardWidth + SETTINGS.spacing),
      height: SETTINGS.rows * (SETTINGS.cardHeight + SETTINGS.spacing),
    })
  })

  it('должен сбрасывать игру и доску при вызове reset', () => {
    isGameComplete.mockReturnValue(false)

    const { result } = renderHook(() => useGame())

    act(() => {
      result.current.reset()
    })

    expect(resetBoard).toHaveBeenCalledTimes(1)
    expect(resetGame).toHaveBeenCalledTimes(1)
  })
})
