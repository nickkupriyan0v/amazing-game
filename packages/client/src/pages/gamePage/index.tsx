import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import GameOver from '../../components/GameOver'

const GamePage = () => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div>
      GamePage and Gameover
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Скрыть' : 'Показать'} контейнер
      </Button>
      {isVisible ? <GameOver /> : ''}
    </div>
  )
}

export default GamePage
