// import { Container, Image, Text, Button } from '@chakra-ui/react'
// import React, { useEffect, useMemo, useState } from 'react'

// const ProfilePage = () => {
//   // avatar, profile info (display name, login, password), change pass modal, change avatar modal
//   // use effect for avatar change, useEffect for pass change
//   const mock = 'https://wallpapers.com/images/hd/hilarious-dog-dressed-as-a-lobster-mnkd5bveuzf4gstp.jpg';
//   const mockFirstName = 'Bob';
//   const mockSecondName = 'Bob';
//   const mockLogin = 'Bob';
//   const mockEmail = 'simple@simple.simple';
//   const mockPhone = '+7900000';

//   const [imgSrc, setSrc] = useState(mock);
//   // setSrc(mock);
//   const [first_name, setFirstName] = useState(mockFirstName);
//   const [second_name, setSecondName] = useState(mockSecondName);
//   const [login, setLogin] = useState(mockLogin);
//   const [email, setEmail] = useState(mockEmail);
//   const [phone, setPhone] = useState(mockPhone);
//   // setLogin(moclLogin);
//   const displayName = login;

//   const userData = useEffect(() => {
//     console.log('user data');
//   })// TODO: set variable
//   const changeAvatar = () => {
//     console.log('changeAvatar')
//   }
//   const changePassword = () => {
//     console.log('change pass')
//   }

//   return (
//     <Container
//       maxW="container.md"
//       display="flex"
//       gap="10px"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center">
//       <Container
//         display="flex"
//         gap="5px"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Image src={imgSrc} width="100px" height="100px" />
//         <Button onClick={changeAvatar}>Change avatar</Button>
//       </Container>
//       <Text>Имя: {first_name}</Text>
//       <Text>Фамилия: {second_name}</Text>
//       <Text>Логин: {login}</Text>
//       <Text>Почта: {email}</Text>
//       <Text>Телефон: {phone}</Text>
//       <Button onClick={changePassword}>Change password</Button>
//     </Container>
//   )
// }

// export default ProfilePage

import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  state = {
    data: null,
  }
  static userName = 'yandex-praktikum'

  componentDidMount() {
    fetch('ya-praktikum.tech/api/v2/auth/signin', {
      method: 'POST',
    })
    fetch(`ya-praktikum.tech/api/v2/user`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data })
        return data
      })
  }

  render() {
    return (
      <React.Fragment>
        <pre>{JSON.stringify(this.state)}</pre>
      </React.Fragment>
    )
  }
}
