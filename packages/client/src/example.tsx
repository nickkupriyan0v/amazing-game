import { useState } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a target="_blank">
          <img className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Example
