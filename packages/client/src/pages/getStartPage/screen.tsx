import { useState } from 'react'
import { GetStartPage } from './getStartPage'
import GamePage from '../gamePage'
export const Screen = () => {
  const [getStart, setGetStart] = useState(false)
  ;<>
    {!getStart ? (
      <GetStartPage getStart={() => setGetStart(true)} />
    ) : (
      <GamePage />
    )}
  </>
}
