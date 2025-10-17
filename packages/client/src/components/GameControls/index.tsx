import { Button } from '@chakra-ui/react'

type GameControlsProps = {
  reset: () => void
  isGameComplete: boolean
  count: number
}

const GameControls = ({ reset, isGameComplete, count }: GameControlsProps) => {
  return (
    <>
      <Button onClick={reset}>Новая игра</Button>
      {isGameComplete && (
        <h2>Поздравляем! Вы прошли игру за {count} ходов(а)! </h2>
      )}
    </>
  )
}

export default GameControls
