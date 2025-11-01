import { useState } from 'react'
import GetStartPage from './getStartPage'
import GamePage from '../gamePage'
export const Screen = () => {
  const [getStart, setGetStart] = useState<boolean>(false)
  return (
    <>
      {!getStart ? (
        <GetStartPage getStart={() => setGetStart(true)} />
      ) : (
        <GamePage />
      )}
    </>
  )
}
