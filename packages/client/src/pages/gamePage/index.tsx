import './styles.css'
import { SETTINGS } from '../../constants/game'
import { useGame } from '../../hooks/useGame'
import GameCanvas from '../../components/GameCanvas'
import Title from '../../components/Title'
import GameControls from '../../components/GameControls'

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
      <Title text="Memo Game" />
      <GameCanvas
        cards={cards}
        flipped={flipped}
        matched={matched}
        onCardClick={handleCardClick}
        canvasSize={{ ...canvasSize, ...SETTINGS }}
      />
      <GameControls
        reset={reset}
        count={count}
        isGameComplete={isGameComplete}
      />
    </div>
  )
}

export default GamePage
