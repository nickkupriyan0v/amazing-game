import { data } from './data'
import './index.css'
const ForumPage = () => {
  return (
    <div className="forum-container">
      <header className="forum-header">
        <h1>Форум карточной игры «Память»</h1>
        <button className="create-topic-btn">Создать тему</button>
      </header>

      <div className="topics-list">
        {data.map(topic => (
          <div className="topic-card" key={topic.id}>
            <div className="topic-header">
              <h2>{topic.title}</h2>
              <span className="created">Пост был создан: {topic.created}</span>
            </div>

            <div className="topic-footer">
              <div className="author">
                <div className="avatar">{topic.author[0]}</div>
                <span>@{topic.author}</span>
              </div>
              <span className="comments">
                Кол-во комментариев: {topic.comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForumPage
