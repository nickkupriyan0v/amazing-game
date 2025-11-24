import { useState, useEffect } from 'react'
import getLeaderboard, { Leader } from './request'
import './style.css'
import { Table, Box, Heading, Spinner } from '@chakra-ui/react'
import Header from '../../components/Header'
const LeaderBoardPage = () => {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaders = async () => {
      const data = await getLeaderboard()
      if (data) setLeaders(data)
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
    <>
      <Header />
      <Box
        maxW="800px"
        mx="auto"
        mt={10}
        p={6}
        bg="white"
        borderRadius="xl"
        boxShadow="md">
        <Heading size="lg" mb={6} textAlign="center">
          🏆 Лидерборд
        </Heading>

        <Table.Root variant="outline" size="md">
          <Table.Header>
            <Table.Row bg="gray.100">
              <Table.ColumnHeader textAlign="center">#</Table.ColumnHeader>
              <Table.ColumnHeader>Имя</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Очки</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {leaders.map((leader, index) => (
              <Table.Row key={index + 1} _hover={{ bg: 'gray.50' }}>
                <Table.Cell textAlign="center" fontWeight="medium">
                  {index + 1}
                </Table.Cell>
                <Table.Cell fontWeight="semibold">
                  {leader.data.name ||
                    leader.data.userName ||
                    leader.data.username ||
                    '—'}
                </Table.Cell>
                <Table.Cell textAlign="center" fontWeight="semibold">
                  {leader.data.score}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  )
}

export default LeaderBoardPage
