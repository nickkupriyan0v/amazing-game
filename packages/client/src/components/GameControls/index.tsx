import { Button, Heading } from '@chakra-ui/react'
import GameOver from '../GameOver'
import { useEffect, useRef } from 'react'
import { useKeyClick } from '../../constants/hotkey'

type GameControlsProps = {
  reset: () => void
  isGameComplete: boolean
  count: number
  seconds: number
  timer: (value: boolean) => void
}

const GameControls = ({
  reset,
  isGameComplete,
  count,
  seconds,
  timer,
}: GameControlsProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  useKeyClick(buttonRef, 'Enter')
  useEffect(() => {
    if (isGameComplete) {
      timer(false)
    }
  }, [timer, isGameComplete])
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
