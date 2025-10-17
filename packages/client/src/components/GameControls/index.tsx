import { Button } from '@chakra-ui/react'
import GameOver from '../GameOver'

type GameControlsProps = {
  reset: () => void
  isGameComplete: boolean
  count: number
}

const GameControls = ({ reset, isGameComplete, count }: GameControlsProps) => {
  return (
    <>
      {isGameComplete && (
        <>
          <GameOver reset={reset}></GameOver>
          <h2>Поздравляем! Вы прошли игру за {count} ходов(а)! </h2>
        </>
      )}
    </>
  )
}

export default GameControls
