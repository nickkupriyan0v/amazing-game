import React, { useEffect, useState } from 'react'
import './getStartPage.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

interface GetStartPageProps {
  getStart?: () => void
}

export default function GetStartPage({ getStart }: GetStartPageProps) {
  const [timer, setTimer] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (timer === null || timer === 0) return

    const countdown = setTimeout(() => setTimer(timer - 1), 1000)

    if (timer === 1) {
      if (getStart) getStart()
      navigate(ROUTES.gamePage)
    }

    return () => clearTimeout(countdown)
  }, [timer])

  return (
    <div className="startScreen">
      {timer === null ? (
        <div className="start-content">
          <h1>Игра на память</h1>
          <p>Найди все пары одинаковых карточек как можно быстрее!</p>
          <button className="start-button" onClick={() => setTimer(3)}>
            Начать игру
          </button>
        </div>
      ) : (
        <div className="count-down">
          <div className="loader"></div>
          <h2 className="game-countdown">Игра начнется через {timer}...</h2>
        </div>
      )}
    </div>
  )
}
