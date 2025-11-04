import { Button, Heading } from '@chakra-ui/react'
import GameOver from '../GameOver'
import { useEffect, useRef } from 'react'
import { useKeyClick } from '../../constants/hotkey'

type GameControlsProps = {
  reset: () => void
  isGameComplete: boolean
  count: number
  seconds: number
}

const GameControls = ({
  reset,
  isGameComplete,
  count,
  seconds,
}: GameControlsProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  useKeyClick(buttonRef, 'Enter')
  return (
    <>
      {isGameComplete ? (
        <>
          <GameOver reset={reset} />
          <h2>
            Поздравляем! Вы прошли игру за {count} ходов(а) и {seconds} секунд!{' '}
          </h2>
        </>
      ) : (
        <>
          <Heading>{seconds}</Heading>
          <Button onClick={reset} ref={buttonRef} bg={'green'}>
            Новая игра
          </Button>
        </>
      )}
    </>
  )
}

export default GameControls
