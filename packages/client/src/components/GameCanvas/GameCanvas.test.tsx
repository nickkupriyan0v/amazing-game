import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card } from '../../types/card'
import { CanvasSize } from '../../types/canvasSize'
import GameCanvas from './GameCanvas'

class MockContext {
  clearRect = jest.fn()
  fillRect = jest.fn()
  strokeRect = jest.fn()
  fillStyle = ''
  strokeStyle = ''
}

describe('GameCanvas', () => {
  const mockCards: Card[] = [
    { id: 1, color: '#ff0000', x: 0, y: 0 },
    { id: 2, color: '#00ff00', x: 100, y: 0 },
  ]

  const mockCanvasSize: CanvasSize = {
    width: 800,
    height: 600,
    cardWidth: 100,
    cardHeight: 150,
  }

  const defaultProps = {
    cards: mockCards,
    flipped: [] as number[],
    matched: [] as number[],
    onCardClick: jest.fn(),
    canvasSize: mockCanvasSize,
  }

  let mockContext: MockContext

  beforeEach(() => {
    mockContext = new MockContext()

    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext as any)

    HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 800,
      height: 600,
      right: 800,
      bottom: 600,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }))

    jest.clearAllMocks()
  })

  it('отображает canvas с правильными атрибутами', () => {
    render(
      <GameCanvas
        startTimer={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...defaultProps}
      />
    )

    const canvas = screen.getByTestId('game-canvas')
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('width', '800')
    expect(canvas).toHaveAttribute('height', '600')
  })

  it('вызывает onCardClick при клике на карточку', () => {
    render(
      <GameCanvas
        startTimer={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...defaultProps}
      />
    )

    const canvas = screen.getByTestId('game-canvas')

    fireEvent.click(canvas, { clientX: 50, clientY: 75 })

    expect(defaultProps.onCardClick).toHaveBeenCalledWith(1)
  })

  it('не вызывает onCardClick при клике вне карточек', () => {
    render(
      <GameCanvas
        startTimer={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...defaultProps}
      />
    )

    const canvas = screen.getByTestId('game-canvas')

    fireEvent.click(canvas, { clientX: 500, clientY: 500 })

    expect(defaultProps.onCardClick).not.toHaveBeenCalled()
  })

  it('корректно обрабатывает множественные клики по карточкам', () => {
    render(
      <GameCanvas
        startTimer={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...defaultProps}
      />
    )

    const canvas = screen.getByTestId('game-canvas')

    fireEvent.click(canvas, { clientX: 50, clientY: 75 })
    expect(defaultProps.onCardClick).toHaveBeenCalledWith(1)

    fireEvent.click(canvas, { clientX: 150, clientY: 75 })
    expect(defaultProps.onCardClick).toHaveBeenCalledWith(2)
  })

  it('вызывает методы canvas', () => {
    render(
      <GameCanvas
        startTimer={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...defaultProps}
      />
    )

    expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 800, 600)
    expect(mockContext.fillRect).toHaveBeenCalled()
    expect(mockContext.strokeRect).toHaveBeenCalled()
  })

  it('обновляется при изменении пропсов', () => {
    const { rerender } = render(
      <GameCanvas
        startTimer={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...defaultProps}
      />
    )

    const newProps = {
      ...defaultProps,
      flipped: [1],
    }

    rerender(
      <GameCanvas
        startTimer={function (): void {
          throw new Error('Function not implemented.')
        }}
        {...newProps}
      />
    )

    expect(mockContext.clearRect).toHaveBeenCalledTimes(2)
  })
})
