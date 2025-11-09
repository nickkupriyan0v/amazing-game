import './styles.css'
import { SETTINGS } from '../../constants/game'
import { useGame } from '../../hooks/useGame/useGame'
import GameCanvasMemo from '../../components/GameCanvas'
import Title from '../../components/Title'
import GameControls from '../../components/GameControls'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { record } from '../../features/slices/sliceRecord'
import { useEffect, useRef, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
const GamePage = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [isFullBox, setFullBox] = useState(false)
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      setFullBox(true)
      await boxRef.current?.requestFullscreen()
    } else {
      setFullBox(false)
      await document.exitFullscreen()
    }
  }
  const recordValue = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  const {
    seconds,
    startTimer,
    cards,
    flipped,
    matched,
    count,
    handleCardClick,
    reset,
    isGameComplete,
    canvasSize,
  } = useGame()

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullBox(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (isGameComplete && count > 0) {
      dispatch(record(count))
    }
  }, [isGameComplete, count, dispatch])

  return (
    <div className="gameBoard">
      <div className="gameBoard_header">
        <span></span>
        <Title text="Memo Game" />
        <div>
          <IconButton variant={'ghost'} onClick={toggleFullscreen}>
            <img
              src="/src/assets/IcOutlineFullscreen.svg"
              width={22}
              height={22}
              alt=""
            />
          </IconButton>
        </div>
      </div>

      <Title
        text={recordValue === 0 ? '' : `Ваш рекорд: ${recordValue} ходов`}
      />
      <div className={`gameBoard ${isFullBox ? 'open' : ''}`} ref={boxRef}>
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
    </div>
  )
}

export default GamePage
