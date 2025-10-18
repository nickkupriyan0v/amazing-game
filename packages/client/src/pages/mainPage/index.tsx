'use client'

import { useState } from 'react'
import { Link } from 'react-router'
import './style.css'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <main className="main">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Игра Память
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/game" className="nav-link">
                Игра
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link">
                Лидерборд
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/forum" className="nav-link">
                Форум
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/topic/1" className="nav-link">
                Топик
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Профиль
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link nav-link-auth">
                Логин
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registration" className="nav-link nav-link-register">
                Регистрация
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Decorative floating cards in background */}
      <div className="background-decorations">
        <div className="float-card float-card-1" />
        <div className="float-card float-card-2" />
        <div className="float-card float-card-3" />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-title-wrapper">
            <h1 className="hero-title">Игра Память</h1>
            <div className="title-underline" />
          </div>

          <p className="hero-tagline">
            Проверьте свою память и обострите ум, сопоставляя пары карточек.
            <span className="tagline-highlight">
              Сколько пар вы сможете найти?
            </span>
          </p>

          {/* Card showcase */}
          <div className="card-showcase">
            {[
              { emoji: '🎮', color: 'card-purple' },
              { emoji: '🧠', color: 'card-teal' },
              { emoji: '⚡', color: 'card-yellow' },
            ].map((item, index) => (
              <div
                key={index}
                className={`showcase-card ${item.color} ${
                  hoveredCard === index ? 'hovered' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}>
                <span className="card-emoji">{item.emoji}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/game" className="cta-button primary-button">
            Начать игру
          </Link>

          <p className="hero-footer">
            Без регистрации • Играйте сразу • Испытайте себя
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Почему играть в Игру Память?</h2>
        <div className="features-grid">
          {[
            {
              title: 'Улучшить память',
              description: 'Развивайте когнитивные способности и запоминание',
            },
            {
              title: 'Быстрые сеансы',
              description:
                'Играйте в любое время и в любом месте за несколько минут',
            },
            {
              title: 'Тренировка мозга',
              description:
                'Улучшайте концентрацию и внимание с помощью забавных вызовов',
            },
            {
              title: 'Отслеживать прогресс',
              description:
                'Следите за своими улучшениями и побивайте свои рекорды',
            },
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-emoji">
                {index === 0 && '🧠'}
                {index === 1 && '⚡'}
                {index === 2 && '🎯'}
                {index === 3 && '📊'}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">Как это работает</h2>
        <div className="steps-grid">
          {[
            {
              step: '1',
              title: 'Переворачивайте карточки',
              description:
                'Нажимайте на карточки, чтобы открыть скрытые символы',
            },
            {
              step: '2',
              title: 'Найдите пары',
              description:
                'Сопоставьте две одинаковые карточки, чтобы заработать очки',
            },
            {
              step: '3',
              title: 'Завершите уровень',
              description: 'Сопоставьте все пары, чтобы закончить игру',
            },
            {
              step: '4',
              title: 'Побейте свой рекорд',
              description: 'Испытайте себя, чтобы завершить игру быстрее',
            },
          ].map((item, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{item.step}</div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { number: '10K+', label: 'Игроков' },
            { number: '50K+', label: 'Игр сыграно' },
            { number: '4.8★', label: 'Рейтинг' },
          ].map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section">
        <h2 className="section-title">Готовы испытать свою память?</h2>
        <p className="cta-description">
          Начните играть прямо сейчас и посмотрите, сколько пар вы сможете
          сопоставить!
        </p>
        <Link to="/game" className="cta-button primary-button large">
          Играть сейчас
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Игра Память. Все права защищены.</p>
      </footer>
    </main>
  )
}
