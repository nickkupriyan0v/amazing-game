import React, { MouseEventHandler, PureComponent, useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { urlAPI } from '../../constants/api'
import { Container, Image, Button, Text, Spinner } from '@chakra-ui/react'
import ModalAvatar from '../../components/ModalAvatar'
import ModalPassword from '../../components/ModalPassword'

export default class App extends PureComponent {
  state = {
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

  handleAvatarUpdate = newAvatarUrl => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        avatar: newAvatarUrl,
      },
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

    const { first_name, second_name, login, email, phone, avatar } =
      this.state.data
    const avatarSource = `${urlAPI}/resources/${avatar}`

    return (
      <Container
        maxW="container.md"
        display="flex"
        gap="10px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <Container
          display="flex"
          gap="5px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <Image src={avatarSource} width="100px" height="100px" />
          <Button onClick={this.changeAvatar}>Change avatar</Button>
        </Container>
        <Text>Имя: {first_name}</Text>
        <Text>Фамилия: {second_name}</Text>
        <Text>Логин: {login}</Text>
        <Text>Почта: {email}</Text>
        <Text>Телефон: {phone}</Text>
        <Button onClick={this.changePassword}>Change password</Button>
        <ModalAvatar
          isVisible={this.state.isAvatarModalVisible}
          onClose={this.onCloseModal}
          onAvatarUpdate={this.handleAvatarUpdate}
        />
        <ModalPassword
          isVisible={this.state.isPasswordModalVisible}
          onClose={this.onCloseModal}
        />
      </Container>
    )
  }
}
