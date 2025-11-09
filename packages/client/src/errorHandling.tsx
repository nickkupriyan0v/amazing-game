import React, { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Вызывается React при ошибке в потомках
    return { hasError: true, error } // Возвращаем новое состояние, чтобы показать запасной UI
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Срабатывает после того, как ошибка была "поймана"
    console.error('Ошибка в компоненте:', error, errorInfo) // Можно отправить информацию об ошибке на сервер
  }

  render() {
    // Отрисовка UI: если есть ошибка — показываем fallback, иначе — детей
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red' }}>
          Произошла ошибка: {this.state.error?.message}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
