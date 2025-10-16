import React, { useCallback, useEffect, useRef } from 'react'

export const GameCanvas = React.memo(
  ({ cards, flipped, matched, onCardClick, canvasSize }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      cards.forEach(card => {
        ctx.fillStyle =
          flipped.includes(card.id) || matched.includes(card.id)
            ? card.color
            : '#ddd'
        ctx.fillRect(
          card.x,
          card.y,
          canvasSize.cardWidth,
          canvasSize.cardHeight
        )

        ctx.strokeStyle = '#000'
        ctx.strokeRect(
          card.x,
          card.y,
          canvasSize.cardWidth,
          canvasSize.cardHeight
        )
      })
    }, [cards, flipped, matched, canvasSize])

    const handleCanvasClick = useCallback(
      e => {
        const canvas = canvasRef.current
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
        style={{ cursor: 'pointer' }}
      />
    )
  }
)
