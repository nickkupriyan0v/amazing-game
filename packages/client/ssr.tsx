import { renderToString } from 'react-dom/server'
import AppSSR from './src/AppSSR'
export const react = () => {
  return renderToString(<AppSSR />)
}
