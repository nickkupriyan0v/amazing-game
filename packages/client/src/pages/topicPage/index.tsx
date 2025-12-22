import { Flex, Heading, Text, Card, Grid } from '@chakra-ui/react'
import Header from '../../components/Header'
import { useGetTopicByIdQuery } from '../../api/forumApi/forumApi'
import { useParams } from 'react-router'
import { GetComment } from './GetComment'
import ModalComment from '../../components/ModalForum/ModalComment/ModalComment'

export interface IComment {
  id: number
  text: string
  login: string
  topicId: number
  parentId: number | null
  createdAt: string
  updatedAt: string
}

const TopicPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetTopicByIdQuery(id!)

  if (isLoading) return <Text>Загрузка...</Text>
  if (error) return <Text>Ошибка загрузки</Text>
  if (!data) return <Text>Данных нет</Text>

  const comments = data.comments.filter(comment => comment.parentId === null)

  return (
    <>
      <Header />

      <Flex
        direction="column"
        align="center"
        gap={4}
        mt={10}
        _dark={{ bg: 'black', minH: '100vh', p: 4 }}>
        <Card.Root
          width="520px"
          maxW="container.md"
          p={4}
          boxShadow="md"
          bg="white"
          _dark={{ bg: 'gray.800' }}>
          <Heading>{data.title}</Heading>
          <Text mt={2}>
            Автор: <Text as="b">{data.login}</Text>
          </Text>
          <Text mt={2}>{data.text}</Text>
        </Card.Root>
        <ModalComment id={id} />
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={6}
          mt={8}
          overflow={'scroll'}
          h={400}>
          {comments.map(comment => (
            <GetComment key={comment.id} comment={comment} />
          ))}
        </Grid>
      </Flex>
    </>
  )
}

export default TopicPage
