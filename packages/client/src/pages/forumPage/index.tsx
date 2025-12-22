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
import { useGetTopicsQuery } from '../../api/forumApi/forumApi'
import ModalForum from '../../components/ModalForum'
import { Link } from 'react-router'
import { ROUTES } from '../../constants/routes'
const ForumPage = () => {
  const { data, isLoading, error } = useGetTopicsQuery('')
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
        <Stack className="topics-list" overflow={'scroll'} h={800}>
          {isLoading && <Text>Загрузка..</Text>}
          {error && <Text>Произошла ошибка: {data}</Text>}
          <ModalForum />
          {data &&
            data?.map(element => (
              <Box
                className="topic-card"
                _dark={{ bg: 'cyan.600', color: 'white' }}
                key={element.id}>
                <Box
                  className="topic-header"
                  _dark={{ bg: 'cyan.600', color: 'white' }}>
                  <Heading _dark={{ color: 'white' }}>{element.title}</Heading>
                  <span className="created">
                    Пост был создан:{element.createdAt}
                  </span>
                </Box>

                <div className="topic-footer">
                  <AvatarGroup>
                    <Avatar.Root>
                      <Avatar.Fallback name={element.login} />
                      <Avatar.Image />
                    </Avatar.Root>
                  </AvatarGroup>
                  <Text>{element.login}</Text>
                  <Link to={`${ROUTES.topicPage}/${element.id}`}>Перейти</Link>
                </div>
                <details>
                  <Heading _dark={{ bg: 'cyan.600', color: 'white' }}>
                    {element.title}
                  </Heading>
                  <summary>Подробнее:</summary>
                  <p>{element.text}</p>
                </details>
              </Box>
            ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default ForumPage
