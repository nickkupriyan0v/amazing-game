import { Container, Image, Text, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const ProfilePage = () => {
  // avatar, profile info (display name, login, password), change pass modal, change avatar modal
  // use effect for avatar change, useEffect for pass change
  const [imgSrc, setSrc] = useState()
  const [login, setLogin] = useState()
  const displayName = login

  const changeAvatar = () => {
    console.log('changeAvatar')
  }
  const changePassword = () => {
    console.log('change pass')
  }

  return (
    <Container
      maxW="container.md"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Container display="flex" alignItems="center" justifyContent="center">
        <Image src={imgSrc} />
        <Button onClick={changeAvatar}></Button>
      </Container>
      <Text>{displayName}</Text>
      <Text>{login}</Text>
      <Button onClick={changePassword}></Button>
    </Container>
  )
}

export default ProfilePage
