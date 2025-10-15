import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import { Button } from '@chakra-ui/react'
import { CARD_COLORS, SETTINGS } from './const'

const GamePage = () => {
  const [count, setCount] = useState(0)
  const canvasRef = useRef(null)
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [disabled, setDisabled] = useState(false)

  const { rows, cols, cardWidth, cardHeight, spacing } = SETTINGS

  useEffect(() => {
    const items = [...CARD_COLORS, ...CARD_COLORS]
      .sort(() => Math.random() - 0.5)
      .map((color, index) => ({
        id: index,
        color,
        x: (cardWidth + spacing) * (index % cols),
        y: (cardHeight + spacing) * Math.floor(index / cols),
      }))

    setCards(items)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    cards.forEach(card => {
      ctx.fillStyle =
        flipped.includes(card.id) || matched.includes(card.id)
          ? card.color
          : '#ddd'
      ctx.fillRect(card.x, card.y, cardWidth, cardHeight)

      ctx.strokeStyle = '#000'
      ctx.strokeRect(card.x, card.y, cardWidth, cardHeight)
    })
  }, [cards, flipped, matched])

  const handleClick = e => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const clickedCard = cards.find(
      card =>
        x >= card.x &&
        x <= card.x + cardWidth &&
        y >= card.y &&
        y <= card.y + cardHeight
    )

    if (!clickedCard || disabled || flipped.includes(clickedCard.id)) {
      return
    }

    setCount(prev => (prev += 1))

    const newFlipped = [...flipped, clickedCard.id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setDisabled(true)
      const [first, second] = newFlipped.map(id =>
        cards.find(card => card.id === id)
      )

      if (first.color === second.color) {
        setMatched([...matched, first.id, second.id])
        setFlipped([])
        setDisabled(false)
      } else {
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5))
    setFlipped([])
    setMatched([])
    setCount(0)
    setDisabled(false)
  }

  return (
    <div className="gameBoard">
      <h1>Memo Game</h1>
      <canvas
        ref={canvasRef}
        width={cols * (cardWidth + spacing)}
        height={rows * (cardHeight + spacing)}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      <div>
        <Button onClick={resetGame}>Новая игра</Button>
      </div>
      {matched.length === cards.length && cards.length > 0 && (
        <h2>Поздравляем! Вы прошли игру за {count} ходов(а)! </h2>
      )}
    </div>
  )
}

export default GamePage
