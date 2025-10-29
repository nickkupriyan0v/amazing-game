import { renderHook } from '@testing-library/react'
import { ROUTES } from '../../constants/routes'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import {
  CheckAuthResponse,
  LoginPageRequest,
} from '../../pages/loginPage/request'
import { useNavigate } from 'react-router'
import { useAuth, User } from './useAuth'

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('../path/to/request', () => ({
  LoginPageRequest: {
    checkAuth: jest.fn(),
  },
}))

jest.mock('axios')

describe('useAuth hook', () => {
  const navigateMock = jest.fn()

  beforeEach(() => {
    ;(useNavigate as jest.Mock).mockReturnValue(navigateMock)
    jest.clearAllMocks()
  })

  it('should set user if checkAuth succeeds', async () => {
    const mockUser: User = { id: '1', login: 'test' }
    ;(LoginPageRequest.checkAuth as jest.Mock).mockResolvedValue({
      success: true,
      user: mockUser,
    } as CheckAuthResponse)

    const { result } = renderHook(() => useAuth())

    expect(result.current.loading).toBe(true)

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.loading).toBe(false)
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('should navigate to login if checkAuth fails', async () => {
    ;(LoginPageRequest.checkAuth as jest.Mock).mockResolvedValue({
      success: false,
      user: null,
    } as unknown as CheckAuthResponse)

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.loginPage)
  })

  it('should logout and navigate to login', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({})

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.loginPage)
  })

  it('should handle checkAuth throwing error', async () => {
    ;(LoginPageRequest.checkAuth as jest.Mock).mockRejectedValue(
      new Error('fail')
    )

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.loginPage)
  })
})
