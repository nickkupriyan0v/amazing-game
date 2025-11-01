import React, { PureComponent } from 'react'
import { urlAPI } from '../../constants/api'
import {
  Container,
  Image,
  Button,
  Text,
  Spinner,
  Card,
  Avatar,
  Heading,
  Flex,
} from '@chakra-ui/react'
import ModalAvatar from '../../components/ModalAvatar'
import ModalPassword from '../../components/ModalPassword'

interface ProfileData {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

interface AppState {
  data: ProfileData | null
  isLoading: boolean
  error: string | null
  isAvatarModalVisible: boolean
  isPasswordModalVisible: boolean
}

export default class App extends PureComponent<unknown, AppState> {
  state: AppState = {
    data: null,
    isLoading: true,
    error: null,
    isAvatarModalVisible: false,
    isPasswordModalVisible: false,
  }

  componentDidMount() {
    fetch(`${urlAPI}/auth/user`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          data,
          isLoading: false,
          error: null,
        })
        return data
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error.message,
        })
      })
  }

  changeAvatar = () => {
    this.setState({ isAvatarModalVisible: true })
  }

  changePassword = () => {
    this.setState({ isPasswordModalVisible: true })
  }

  onCloseModal = () => {
    this.setState({ isAvatarModalVisible: false })
    this.setState({ isPasswordModalVisible: false })
  }

  handleAvatarUpdate = (newAvatarUrl: string) => {
    this.setState(prevState => ({
      data: prevState.data
        ? {
            ...prevState.data,
            avatar: newAvatarUrl,
          }
        : null,
      isAvatarModalVisible: false,
    }))
  }

  render() {
    const { data, isLoading, error } = this.state

    if (isLoading) {
      return (
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px">
          <Spinner size="xl" color="blue.500" />
          <Text ml={3}>Загрузка данных...</Text>
        </Container>
      )
    }

    if (error) {
      return (
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px">
          <Text color="red.500">Ошибка: {error}</Text>
        </Container>
      )
    }

    if (!data) {
      return (
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px">
          <Text>Данные не найдены</Text>
        </Container>
      )
    }

    const {
      first_name,
      second_name,
      login,
      email,
      phone,
      avatar,
    }: ProfileData = data
    const avatarSource = `${urlAPI}/resources/${avatar}`

    return (
      <Flex justify="center">
        <Card.Root
          bg={'white.100'}
          width="520px"
          maxW="container.md"
          display="flex"
          gap="10px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="md">
          <Card.Body
            display="flex"
            gap="5px"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            <Image
              src={avatarSource}
              onClick={this.changeAvatar}
              boxSize="150px"
              borderRadius="full"
              fit="cover"
              alt="Сменить картинку"
            />
            <Heading>
              Имя: {first_name} {second_name}
            </Heading>
          </Card.Body>
          <Text>Логин: {login}</Text>
          <Text>Почта: {email}</Text>
          <Text>Телефон: {phone}</Text>
          <Card.Footer justifyContent="flex-end">
            <Button
              onClick={this.changePassword}
              bg={'green.500'}
              marginTop={'40px'}>
              Сменить пароль
            </Button>
          </Card.Footer>
          <Button
            onClick={this.changeAvatar}
            marginBottom={'40px'}
            bg={'blue.600'}>
            Сменить аватарку
          </Button>
          <ModalAvatar
            isVisible={this.state.isAvatarModalVisible}
            onClose={this.onCloseModal}
            onAvatarUpdate={this.handleAvatarUpdate}
          />
          <ModalPassword
            isVisible={this.state.isPasswordModalVisible}
            onClose={this.onCloseModal}
          />
        </Card.Root>
      </Flex>
    )
  }
}
