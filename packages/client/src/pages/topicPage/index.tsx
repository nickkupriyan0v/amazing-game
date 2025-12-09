import Header from '../../components/Header'
import { useGetTopicByIdQuery } from '../../api/forumApi/forumApi'
import { useParams } from 'react-router'
import { ReactionPopover } from '../../components/TopicPage/ReactionPopover'

const TopicPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetTopicByIdQuery(id!)

  if (isLoading) return <Text>Загрузка...</Text>
  if (error) return <Text>Ошибка загрузки</Text>
  if (!data) return <Text>Данных нет</Text>

  return (
    <>
      <Header />
      <Flex
        direction="column"
        align="center"
        gap={4}
        mt={10}
        _dark={{ bg: 'black', minH: '100vh', p: 4 }}>
        {/* Основная тема */}
        <Card.Root
          width="520px"
          maxW="container.md"
          p={4}
          boxShadow="md"
          bg="white"
          _dark={{ bg: 'gray.800' }}>
          <Heading>{data.title}</Heading>
          <Text mt={2}>
            Автор:{' '}
            <Text as="b" display="inline">
              {data.login}
            </Text>
          </Text>
          <Text mt={2}>{data.text}</Text>
          <ReactionPopover topicId={Number(id)} />
        </Card.Root>

        {data.comments &&
          data.comments.map(comment => (
            <Card.Root
              key={comment.id}
              width="520px"
              maxW="container.md"
              p={4}
              boxShadow="md"
              bg="gray.100"
              _dark={{ bg: 'gray.700' }}>
              <Heading size="md">{comment.login}</Heading>
              <Text mt={2}>{comment.text}</Text>

              {comment.replies && comment.replies.length > 0 && (
                <Box
                  mt={3}
                  pl={4}
                  borderLeft="2px solid gray"
                  display="flex"
                  flexDirection="column"
                  gap={2}>
                  {comment.replies.map(reply => (
                    <Card.Root
                      key={reply.id}
                      p={2}
                      bg="gray.200"
                      _dark={{ bg: 'cyan.600', color: 'white' }}>
                      <Heading size="sm">{reply.login}</Heading>
                      <Text>{reply.text}</Text>
                    </Card.Root>
                  ))}
                </Box>
              )}
            </Card.Root>
          ))}
      </Flex>
    </>
  )
}

export default TopicPage
