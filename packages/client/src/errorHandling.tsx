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
    // Изначально ошибок нет
    this.state = { hasError: false, error: null }
  }

  // Этот метод вызывается React при ошибке в потомках
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Возвращаем новое состояние, чтобы показать запасной UI
    return { hasError: true, error }
  }

  // Этот метод срабатывает после того, как ошибка была "поймана"
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно отправить информацию об ошибке на сервер (логирование, мониторинг)
    console.error('Ошибка в компоненте:', error, errorInfo)
  }

  // Отрисовка UI: если есть ошибка — показываем fallback, иначе — детей
  render() {
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
