import { Button, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Modal from 'react-modal'
import ModalReply from '../../components/ModalForum/ModalComment/ModalReply'
const GetReply = ({ reply }) => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <>
      <Heading>{reply.login}</Heading>
      <Text>{reply.text}</Text>
      <Button onClick={openModal}>Ответить</Button>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <ModalReply id={reply.id} closeModal={closeModal} />
      </Modal>
    </>
  )
}
export default GetReply
