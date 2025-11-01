import '@testing-library/jest-dom'

global.requestAnimationFrame = jest.fn()
global.cancelAnimationFrame = jest.fn()
