import React, { PureComponent, useState } from 'react'
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
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react'
import ModalAvatar from '../../components/ModalAvatar'
import ModalPassword from '../../components/ModalPassword'
import axios from 'axios'
import { ROUTES } from '../../constants/routes'
import { AppDispatch, RootState } from '../../store/store'
import { userInfo } from '../../features/slices/sliceUser'
import { connect } from 'react-redux'

interface ProfileData {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}
interface AppProps {
  user: ProfileData | null
  setUserInfo: (data: ProfileData) => void
}
interface AppState {
  data: ProfileData | null
  isLoading: boolean
  error: string | null
  isAvatarModalVisible: boolean
  isPasswordModalVisible: boolean
}
export class App extends PureComponent<AppProps, AppState> {
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
        this.props.setUserInfo(data)
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

  logout = async () => {
    try {
      await axios.post(`${urlAPI}/auth/logout`, {}, { withCredentials: true })
      this.props.setUserInfo({
        id: 0,
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        email: '',
        phone: '',
        avatar: '',
      })
      console.log(this.props.setUserInfo)
      window.location.href = ROUTES.mainPage
    } catch (err) {
      console.log('Ошибка')
    }
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
      display_name,
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
          boxShadow="md"
          mt="200px">
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
              bg={'gray.100'}
              border="solid 1px"
            />
            <Heading>
              {first_name} {second_name}
            </Heading>
          </Card.Body>
          <Text>Логин: {login}</Text>
          <Text>Почта: {email}</Text>
          <Text>Телефон: {phone}</Text>
          <Card.Footer justifyContent="flex-end">
            <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
              <Button
                onClick={this.changePassword}
                bg={'green.500'}
                width={190}>
                Сменить пароль
              </Button>
              <Button onClick={this.changeAvatar} bg={'blue.600'} width={192}>
                Сменить аватарку
              </Button>
              <GridItem colSpan={2}>
                <Button
                  onClick={this.logout}
                  marginBottom={'40px'}
                  bg={'red'}
                  width={400}>
                  Выйти
                </Button>
              </GridItem>
            </Grid>
          </Card.Footer>

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

const mapStateToProps = (state: RootState) => ({
  user: state.userInfo,
})
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setUserInfo: (data: ProfileData) => dispatch(userInfo(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
