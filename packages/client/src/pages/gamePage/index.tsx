import './styles.css'
import { SETTINGS } from '../../constants/game'
import { useGame } from '../../hooks/useGame/useGame'
import GameCanvasMemo from '../../components/GameCanvas'
import Title from '../../components/Title'
import GameControls from '../../components/GameControls'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { record } from '../../features/slices/sliceRecord'
import { useEffect } from 'react'

const GamePage = () => {
  const recordValue = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  const {
    seconds,
    startTimer,
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

  useEffect(() => {
    if (isGameComplete && count > 0) {
      dispatch(record(count))
    }
  }, [isGameComplete, count, dispatch])

  return (
    <div className="gameBoard">
      <Title text="Memo Game" />
      <Title
        text={recordValue === 0 ? '' : `Ваш рекорд: ${recordValue} ходов`}
      />
      <GameCanvasMemo
        startTimer={startTimer}
        cards={cards}
        flipped={flipped}
        matched={matched}
        onCardClick={handleCardClick}
        canvasSize={{ ...canvasSize, ...SETTINGS }}
      />
      <GameControls
        seconds={seconds}
        reset={reset}
        count={count}
        isGameComplete={isGameComplete}
      />
    </div>
  )
}

export default GamePage
