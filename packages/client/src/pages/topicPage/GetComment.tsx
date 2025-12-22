import {
  Box,
  Card,
  GridItem,
  Heading,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react'
import { useGetCommentsByIdQuery } from '../../api/forumApi/forumApi'
import GetReply from './GetReply'
import { useState } from 'react'
import Modal from 'react-modal'
import ModalReply from '../../components/ModalForum/ModalComment/ModalReply'

interface Reply {
  id: number
  login: string
  text: string
}

interface IComment {
  id: number
  login: string
  text: string
  replies: Reply[]
}

interface GetRepliesProps {
  commentId: IComment
}

export const GetComment = ({ comment }: GetRepliesProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const id = comment.id
  const { data, isLoading, error } = useGetCommentsByIdQuery(id!)

  if (isLoading) return <Text>Загрузка...</Text>
  if (error) return <Text>Ошибка загрузки</Text>
  if (!data) return <Text>Данных нет</Text>

  return (
    <GridItem w="100%" h="auto">
      <Card.Root
        key={comment.id}
        width="100%"
        p={5}
        borderRadius="lg"
        boxShadow="md"
        bg="gray.100"
        _dark={{ bg: 'gray.800' }}>
        <Box mb={3}>
          <Text fontWeight="bold">{data.login}</Text>
          <Text>{data.text}</Text>
        </Box>
        <Button onClick={openModal} bg={'blue.400'} w={'50%'}>
          Ответить
        </Button>
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
          <ModalReply id={comment.id} closeModal={closeModal} />
        </Modal>
        {data.replies.length === 0 && (
          <Text color="gray.500">Ответов пока нет</Text>
        )}

        {data.replies.length >= 1 && (
          <details>
            <summary>Подробнее</summary>
            <Heading size="sm" mb={2}>
              Ответы:
            </Heading>
            <Flex className="topics-list" overflow={'scroll'} h={800}>
              {data.replies.map(reply => (
                <GetReply key={reply.id} reply={reply} />
              ))}
            </Flex>
          </details>
        )}
      </Card.Root>
    </GridItem>
  )
}
