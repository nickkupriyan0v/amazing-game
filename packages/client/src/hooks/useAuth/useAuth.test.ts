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

jest.mock('../../pages/loginPage/request.ts', () => ({
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

  it('должен быть установлен пользователь, если checkAuth завершится успешно', async () => {
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

  it('следует перейти к входу в систему, если произойдет сбой checkAuth', async () => {
    ;(LoginPageRequest.checkAuth as jest.Mock).mockResolvedValue({
      success: false,
      user: null,
    } as unknown as CheckAuthResponse)

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.loginPage)
  })

  it('следует выйти из системы и перейти к входу в систему', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({})

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.loginPage)
  })

  it('должен обрабатывать ошибку, вызывающую checkAuth', async () => {
    ;(LoginPageRequest.checkAuth as jest.Mock).mockRejectedValue(
      new Error('fail')
    )

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(navigateMock).toHaveBeenCalledWith(ROUTES.loginPage)
  })
})
