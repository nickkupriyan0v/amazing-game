import { renderHook, act } from '@testing-library/react'
import { useColors } from './useColors'
import { CARD_COLORS } from '../../constants/game'

jest.mock('../../constants/game', () => ({
  CARD_COLORS: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
}))

describe('useColors', () => {
  it('возвращает корректное количество цветов для указанного количества пар', () => {
    const { result } = renderHook(() => useColors())

    expect(result.current.getColorsForPairs(3)).toEqual([
      'red',
      'blue',
      'green',
    ])
    expect(result.current.getColorsForPairs(1)).toEqual(['red'])
    expect(result.current.getColorsForPairs(6)).toEqual(CARD_COLORS)
  })

  it('возвращает пустой массив когда количество пар равно 0', () => {
    const { result } = renderHook(() => useColors())

    expect(result.current.getColorsForPairs(0)).toEqual([])
  })

  it('возвращает все доступные цвета когда количество пар больше чем доступно цветов', () => {
    const { result } = renderHook(() => useColors())

    expect(result.current.getColorsForPairs(10)).toEqual(CARD_COLORS)
  })

  it('мемоизирует функцию getColorsForPairs', () => {
    const { result, rerender } = renderHook(() => useColors())

    const firstRenderResult = result.current.getColorsForPairs
    rerender()
    const secondRenderResult = result.current.getColorsForPairs

    expect(firstRenderResult).toBe(secondRenderResult)
  })
})
