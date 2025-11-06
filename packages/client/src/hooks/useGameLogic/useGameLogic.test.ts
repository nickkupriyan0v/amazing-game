import { renderHook, act } from '@testing-library/react'
import { useGameLogic } from './useGameLogic'
import { Card } from '../../types/card'

jest.useFakeTimers()

const createCards = (): Card[] => [
  { id: 1, color: 'red' },
  { id: 2, color: 'red' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'blue' },
]

describe('useGameLogic', () => {
  it('должен правильно инициализироваться', () => {
    const { result } = renderHook(() => useGameLogic(createCards()))

    expect(result.current.count).toBe(0)
    expect(result.current.flipped).toEqual([])
    expect(result.current.matched).toEqual([])
    expect(result.current.disabled).toBe(false)
    expect(result.current.isGameComplete()).toBe(false)
  })

  it('должен увеличивать счётчик при клике на карту', () => {
    const { result } = renderHook(() => useGameLogic(createCards()))

    act(() => {
      result.current.handleCardClick(1)
    })

    expect(result.current.count).toBe(1)
    expect(result.current.flipped).toEqual([1])
  })

  it('должен находить совпадающие карты и добавлять в matched', () => {
    const { result } = renderHook(() => useGameLogic(createCards()))

    act(() => {
      result.current.handleCardClick(1)
    })

    act(() => {
      result.current.handleCardClick(2)
    })

    expect(result.current.matched).toEqual([1, 2])
    expect(result.current.flipped).toEqual([])
    expect(result.current.disabled).toBe(false)
  })

  it('должен сбрасывать flipped через 1 секунду при несовпадении', () => {
    const { result } = renderHook(() => useGameLogic(createCards()))

    act(() => {
      result.current.handleCardClick(1)
    })

    act(() => {
      result.current.handleCardClick(3)
    })

    expect(result.current.disabled).toBe(true)
    expect(result.current.flipped).toEqual([1, 3])

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.flipped).toEqual([])
    expect(result.current.disabled).toBe(false)
  })

  it('не должен позволять кликать на уже совпавшие или перевёрнутые карты', () => {
    const { result } = renderHook(() => useGameLogic(createCards()))

    act(() => {
      result.current.handleCardClick(1)
    })

    act(() => {
      result.current.handleCardClick(2)
    })

    expect(result.current.matched).toEqual([1, 2])

    act(() => {
      const click1 = result.current.handleCardClick(1)
      const click2 = result.current.handleCardClick(2)

      expect(click1).toBe(false)
      expect(click2).toBe(false)
    })
  })

  it('должен корректно сбрасывать игру', () => {
    const { result } = renderHook(() => useGameLogic(createCards()))

    act(() => {
      result.current.handleCardClick(1)
      result.current.handleCardClick(2)
      result.current.resetGame()
    })

    expect(result.current.count).toBe(0)
    expect(result.current.flipped).toEqual([])
    expect(result.current.matched).toEqual([])
    expect(result.current.disabled).toBe(false)
  })

  it('должен определять завершение игры, если все карты совпали', () => {
    const { result } = renderHook(() => useGameLogic(createCards()))

    act(() => {
      result.current.handleCardClick(1)
    })
    act(() => {
      result.current.handleCardClick(2)
    })

    act(() => {
      result.current.handleCardClick(3)
    })
    act(() => {
      result.current.handleCardClick(4)
    })

    expect(result.current.matched).toEqual([1, 2, 3, 4])
    expect(result.current.isGameComplete()).toBe(true)
  })
})
