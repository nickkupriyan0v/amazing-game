import { useState } from 'react'
import { data } from './data'
import './style.css'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Code,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
const ForumPage = () => {
  const user = useState(false)
  return (
    <Container className="forum-container">
      <Box className="forum-header">
        <Heading>Форум карточной игры «Память»</Heading>
        {user ? (
          <Button className="create-topic-btn">Создать тему</Button>
        ) : (
          <Text className="auth-advise">
            Нужно зарегистрироваться чтобы создать статью
          </Text>
        )}
      </Box>

      <Stack className="topics-list">
        {data.map(topic => (
          <Box className="topic-card" key={topic.id}>
            <Box className="topic-header">
              <Heading>{topic.title}</Heading>
              <span className="created">Пост был создан: {topic.created}</span>
            </Box>

            <div className="topic-footer">
              <AvatarGroup>
                <Avatar.Root>
                  <Avatar.Fallback name={topic.author} />
                  <Avatar.Image />
                </Avatar.Root>
              </AvatarGroup>
              <Text>{topic.author}</Text>
              <span className="comments">
                Кол-во комментариев: {topic.comments}
              </span>
            </div>
            <details>
              <Heading>{topic.title}</Heading>
              <summary>Подробнее:</summary>
              <p>{topic.text}</p>
            </details>
          </Box>
        ))}
      </Stack>
    </Container>
  )
}

export default ForumPage
