import React, { useCallback, useEffect, useRef } from 'react'
import { Card } from '../../types/card'
import { CanvasSize } from '../../types/canvasSize'

type GameCanvasProps = {
  cards: Card[]
  flipped: Card['id'][]
  matched: Card['id'][]
  onCardClick: (id: Card['id']) => void
  canvasSize: CanvasSize
}

const GameCanvas = ({
  cards,
  flipped,
  matched,
  onCardClick,
  canvasSize,
}: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    cards.forEach(card => {
      ctx.fillStyle =
        flipped.includes(card.id) || matched.includes(card.id)
          ? card.color
          : '#ddd'
      ctx.fillRect(
        card.x!,
        card.y!,
        canvasSize.cardWidth,
        canvasSize.cardHeight
      )

      ctx.strokeStyle = '#000'
      ctx.strokeRect(
        card.x!,
        card.y!,
        canvasSize.cardWidth,
        canvasSize.cardHeight
      )
    })
  }, [cards, flipped, matched, canvasSize])

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const clickedCard = cards.find(
        (card: Card) =>
          x >= card.x! &&
          x <= card.x! + canvasSize.cardWidth &&
          y >= card.y! &&
          y <= card.y! + canvasSize.cardHeight
      )

      if (clickedCard) {
        onCardClick(clickedCard.id)
      }
    },
    [cards, onCardClick, canvasSize]
  )

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      onClick={handleCanvasClick}
      style={{ cursor: 'pointer' }}
      data-testid="game-canvas"
    />
  )
}

GameCanvas.displayName = 'GameCanvas'

export default GameCanvas
