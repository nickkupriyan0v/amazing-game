import { renderToString } from 'react-dom/server'
import { Root } from './main'

export function render() {
  return renderToString(<Root />)
}
