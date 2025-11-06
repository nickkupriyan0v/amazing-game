import { renderHook, act } from '@testing-library/react'
import { useBoard } from './useBoard'
import { useColors } from '../useColors/useColors'

jest.mock('../useColors/useColors')

const mockUseColors = useColors as jest.MockedFunction<typeof useColors>

describe('useBoard', () => {
  const mockGetColorsForPairs = jest.fn()

  beforeEach(() => {
    mockUseColors.mockReturnValue({
      getColorsForPairs: mockGetColorsForPairs,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('инициализирует доску с правильным количеством карт при монтировании', () => {
    const mockColors = ['red', 'blue', 'green']
    mockGetColorsForPairs.mockReturnValue(mockColors)

    const { result } = renderHook(() => useBoard(2, 3, 100, 150, 10))

    expect(mockGetColorsForPairs).toHaveBeenCalledWith(3)
    expect(result.current.cards).toHaveLength(6)

    const colorCount = result.current.cards.reduce((acc, card) => {
      acc[card.color] = (acc[card.color] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    expect(colorCount.red).toBe(2)
    expect(colorCount.blue).toBe(2)
    expect(colorCount.green).toBe(2)
  })

  it('правильно вычисляет координаты для карт', () => {
    const mockColors = ['red', 'blue']
    mockGetColorsForPairs.mockReturnValue(mockColors)

    const { result } = renderHook(() => useBoard(2, 2, 100, 150, 10))

    const cards = result.current.cards

    expect(cards[0]).toMatchObject({ x: 0, y: 0 })
    expect(cards[1]).toMatchObject({ x: 110, y: 0 })
    expect(cards[2]).toMatchObject({ x: 0, y: 160 })
    expect(cards[3]).toMatchObject({ x: 110, y: 160 })
  })

  it('перемешивает карты при инициализации', () => {
    const mockColors = ['red', 'blue']
    mockGetColorsForPairs.mockReturnValue(mockColors)

    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.5
    global.Math = mockMath

    const { result } = renderHook(() => useBoard(2, 2, 100, 150, 10))

    const expectedColors = ['red', 'blue', 'red', 'blue']
    const actualColors = result.current.cards.map(card => card.color)
    expect(actualColors).toEqual(expectedColors)
  })

  it('сбрасывает доску при вызове resetBoard', () => {
    const mockColors = ['red', 'blue']
    mockGetColorsForPairs.mockReturnValue(mockColors)

    const { result } = renderHook(() => useBoard(2, 2, 100, 150, 10))

    const initialCards = [...result.current.cards]

    act(() => {
      result.current.resetBoard()
    })

    const resetCards = result.current.cards
    expect(resetCards).toHaveLength(initialCards.length)

    const initialColors = initialCards.map(card => card.color).sort()
    const resetColors = resetCards.map(card => card.color).sort()
    expect(initialColors).toEqual(resetColors)
  })

  it('переинициализирует доску при изменении параметров', () => {
    mockGetColorsForPairs
      .mockReturnValueOnce(['red', 'blue'])
      .mockReturnValueOnce(['red', 'blue', 'green'])

    const { result, rerender } = renderHook(
      ({ rows, cols, cardWidth, cardHeight, spacing }) =>
        useBoard(rows, cols, cardWidth, cardHeight, spacing),
      {
        initialProps: {
          rows: 2,
          cols: 2,
          cardWidth: 100,
          cardHeight: 150,
          spacing: 10,
        },
      }
    )

    expect(result.current.cards).toHaveLength(4)
    expect(mockGetColorsForPairs).toHaveBeenCalledWith(2)

    rerender({
      rows: 3,
      cols: 2,
      cardWidth: 100,
      cardHeight: 150,
      spacing: 10,
    })

    expect(mockGetColorsForPairs).toHaveBeenCalledWith(3)
    expect(result.current.cards).toHaveLength(6)
  })

  it('обрабатывает случай с нечетным количеством ячеек', () => {
    const mockColors = ['red', 'blue', 'green']
    mockGetColorsForPairs.mockReturnValue(mockColors)

    const { result } = renderHook(() => useBoard(2, 3, 100, 150, 10))

    expect(mockGetColorsForPairs).toHaveBeenCalledWith(3)
    expect(result.current.cards).toHaveLength(6)
  })

  it('создает правильное количество пар для различных размеров сетки', () => {
    const testCases = [
      { rows: 2, cols: 2, expectedPairs: 2, expectedCards: 4 },
      { rows: 3, cols: 2, expectedPairs: 3, expectedCards: 6 },
      { rows: 4, cols: 3, expectedPairs: 6, expectedCards: 12 },
      { rows: 2, cols: 4, expectedPairs: 4, expectedCards: 8 },
    ]

    testCases.forEach(({ rows, cols, expectedPairs, expectedCards }) => {
      mockGetColorsForPairs.mockClear()
      mockGetColorsForPairs.mockReturnValue(
        Array.from({ length: expectedPairs }, (_, i) => `color${i}`)
      )

      const { result } = renderHook(() => useBoard(rows, cols, 100, 150, 10))

      expect(mockGetColorsForPairs).toHaveBeenCalledWith(expectedPairs)
      expect(result.current.cards).toHaveLength(expectedCards)
    })
  })
})
