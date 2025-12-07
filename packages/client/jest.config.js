import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __EXTERNAL_SERVER_URL__: process.env.__EXTERNAL_SERVER_URL__,
    __INTERNAL_SERVER_URL__: process.env.__INTERNAL_SERVER_URL__,
  },
}
