import { Popover, Button, Flex, IconButton } from '@chakra-ui/react'
import { useReactToTopicMutation } from '../../api/forumApi/forumApi'

const reactions = ['👍', '❤️', '😂', '😡']

export function ReactionPopover({ topicId }: { topicId: number }) {
  const [sendReaction] = useReactToTopicMutation()

  const handleReact = async (emoji: string) => {
    try {
      await sendReaction({ topicId, reaction: emoji }).unwrap()
    } catch (e) {
      console.error('Reaction error:', e)
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="sm" mt={3} variant="outline">
          Reactions
        </Button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content width="300px" p={2}>
          <Popover.Body>
            <Flex justify="space-between">
              {reactions.map(r => (
                <Button
                  key={r}
                  onClick={() => handleReact(r)}
                  size="sm"
                  fontSize="22px"
                  variant="ghost">
                  {r}
                </Button>
              ))}
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
