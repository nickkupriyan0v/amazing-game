import { useState } from 'react'
import { data } from './data'
import './style.css'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAppSelector } from '../../store/hooks'
import Header from '../../components/Header'
const ForumPage = () => {
  const user = useAppSelector(state => state.updateUser)
  const isLoggedIn = !!user?.id
  return (
    <Box _dark={{ bg: 'black' }}>
      <Header />
      <Container
        className="forum-container"
        minH="100vh"
        _dark={{ bg: 'black' }}>
        <Box className="forum-header" _dark={{ bg: 'black' }}>
          <Heading _dark={{ color: 'white' }}>
            Форум карточной игры «Память»
          </Heading>
          {isLoggedIn ? (
            <Button
              className="create-topic-btn"
              _dark={{ bg: 'orange', color: 'white' }}>
              Создать тему
            </Button>
          ) : (
            <Text className="auth-advise">
              Нужно зарегистрироваться чтобы создать статью
            </Text>
          )}
        </Box>

        <Stack className="topics-list">
          {data.map(topic => (
            <Box
              className="topic-card"
              key={topic.id}
              _dark={{ bg: 'cyan.600', color: 'white' }}>
              <Box
                className="topic-header"
                _dark={{ bg: 'cyan.600', color: 'white' }}>
                <Heading _dark={{ color: 'white' }}>{topic.title}</Heading>
                <span className="created">
                  Пост был создан: {topic.created}
                </span>
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
                <Heading _dark={{ bg: 'cyan.600', color: 'white' }}>
                  {topic.title}
                </Heading>
                <summary>Подробнее:</summary>
                <p>{topic.text}</p>
              </details>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default ForumPage
