import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import Example from './example'

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <Example />
    </StrictMode>
  )
  return { html }
}
