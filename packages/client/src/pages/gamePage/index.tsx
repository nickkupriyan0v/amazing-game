import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import { Button } from '@chakra-ui/react'
import { CARD_COLORS, SETTINGS } from '../../constants/game'
import { useGame } from '../../hooks/useGame'
import { GameCanvas } from '../../components/GameCanvas'

const GamePage = () => {
  const {
    cards,
    flipped,
    matched,
    disabled,
    count,
    handleCardClick,
    reset,
    isGameComplete,
    canvasSize,
  } = useGame()

  return (
    <div className="gameBoard">
      <h1>Memo Game</h1>
      <GameCanvas
        cards={cards}
        flipped={flipped}
        matched={matched}
        onCardClick={handleCardClick}
        canvasSize={{ ...canvasSize, ...SETTINGS }}
      />
      <Button onClick={reset}>Новая игра</Button>
      {isGameComplete && (
        <h2>Поздравляем! Вы прошли игру за {count} ходов(а)! </h2>
      )}
    </div>
  )
}

export default GamePage
