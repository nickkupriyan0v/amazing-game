import { useState, useEffect } from 'react'
import { getLeaderboard } from '../../api/leaderBoard/leaderBoardSupabase'
import './style.css'
import { Table, Box, Heading, Spinner } from '@chakra-ui/react'
import { LeaderboardResponse } from '../../api/leaderBoard/types'
import Header from '../../components/Header'

const LeaderBoardPage = () => {
  const [leaders, setLeaders] = useState<LeaderboardResponse>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaders = async () => {
      const response = await getLeaderboard()
      if (response) setLeaders(response)
      setLoading(false)
    }

    fetchLeaders()
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <Box
          maxW="800px"
          mx="auto"
          mt={10}
          p={6}
          bg="white"
          _dark={{ bg: 'black' }}
          borderRadius="xl"
          boxShadow="md"
          textAlign="center">
          <Heading className="leaderboard__loading">
            Загрузка... <br />
            <Spinner color="blue.500" size="xl" />
          </Heading>
        </Box>
      </>
    )
  }

  return (
    <Box _dark={{ bg: 'black' }}>
      <Header />
      <Box minH="100vh" _dark={{ bg: 'black' }}>
        <Box
          maxW="800px"
          mx="auto"
          mt={10}
          p={6}
          bg="bg.surface"
          _dark={{ bg: 'black' }}
          borderRadius="xl"
          boxShadow="md">
          <Heading
            size="lg"
            mb={6}
            textAlign="center"
            _dark={{ color: 'gray.100', bg: 'black' }}>
            🏆 Лидерборд
          </Heading>

          <Table.Root variant="outline" size="md">
            <Table.Header _dark={{ color: 'gray.100' }}>
              <Table.Row
                bg="gray.100"
                _dark={{ bg: 'black', color: 'gray.100' }}>
                <Table.ColumnHeader
                  textAlign="center"
                  _dark={{ bg: 'black', color: 'gray.100' }}>
                  #
                </Table.ColumnHeader>
                <Table.ColumnHeader _dark={{ bg: 'black', color: 'gray.100' }}>
                  Имя
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  _dark={{ bg: 'black', color: 'gray.100' }}>
                  Очки
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body _dark={{ bg: 'black', color: 'gray.100' }}>
              {leaders &&
                leaders.data &&
                leaders.data.map((leader, index) => (
                  <Table.Row key={index + 1} _hover={{ bg: 'gray.50' }}>
                    <Table.Cell
                      textAlign="center"
                      fontWeight="medium"
                      _dark={{ bg: 'black', color: 'gray.100' }}>
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell
                      fontWeight="semibold"
                      _dark={{ bg: 'black', color: 'gray.100' }}>
                      {leader.name || '—'}
                    </Table.Cell>
                    <Table.Cell textAlign="center" fontWeight="semibold">
                      {leader.seconds}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Box>
  )
}

export default LeaderBoardPage
