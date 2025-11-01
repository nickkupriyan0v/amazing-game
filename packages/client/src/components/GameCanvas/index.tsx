'use client'

import React, { useCallback, useEffect, useRef } from 'react'

interface Card {
  id: number
  x: number
  y: number
  color: string
}

interface CanvasSize {
  width: number
  height: number
  cardWidth: number
  cardHeight: number
}

interface GameCanvasProps {
  cards: Card[]
  flipped: number[]
  matched: number[]
  onCardClick: (cardId: number) => void
  canvasSize: CanvasSize
}

const GameCanvas = React.memo(
  ({ cards, flipped, matched, onCardClick, canvasSize }: GameCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      cards.forEach(card => {
        const isFlipped = flipped.includes(card.id) || matched.includes(card.id)

        const cardRadius = 12
        const x = card.x
        const y = card.y
        const width = canvasSize.cardWidth
        const height = canvasSize.cardHeight

        ctx.shadowColor = 'rgba(107, 93, 255, 0.2)'
        ctx.shadowBlur = 12
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 4

        ctx.fillStyle = isFlipped ? card.color : '#e8e8f0'
        ctx.beginPath()
        ctx.moveTo(x + cardRadius, y)
        ctx.lineTo(x + width - cardRadius, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + cardRadius)
        ctx.lineTo(x + width, y + height - cardRadius)
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - cardRadius,
          y + height
        )
        ctx.lineTo(x + cardRadius, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - cardRadius)
        ctx.lineTo(x, y + cardRadius)
        ctx.quadraticCurveTo(x, y, x + cardRadius, y)
        ctx.closePath()
        ctx.fill()

        ctx.shadowColor = 'transparent'

        ctx.strokeStyle = isFlipped ? 'rgba(78, 205, 196, 0.4)' : '#d0d0e0'
        ctx.lineWidth = 3
        ctx.stroke()
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
          card =>
            x >= card.x &&
            x <= card.x + canvasSize.cardWidth &&
            y >= card.y &&
            y <= card.y + canvasSize.cardHeight
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
        style={{
          cursor: 'pointer',
          border: 'none',
          borderRadius: '12px',
        }}
      />
    )
  }
)

GameCanvas.displayName = 'GameCanvas'

export default GameCanvas
