import { useState, useEffect } from 'react'
import getLeaderboard, { Leader } from './request'
import './style.css'
const LeaderBoardPage = () => {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaders = async () => {
      const data = await getLeaderboard()
      if (data) setLeaders(data)
      setLoading(false)
    }

    fetchLeaders()
  }, [])

  if (loading) {
    return <p className="leaderboard__loading">Загрузка...</p>
  }

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">🏆 Лидерборд</h2>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {item.data.name ||
                  item.data.userName ||
                  item.data.username ||
                  '—'}
              </td>
              <td>{item.data.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoardPage
