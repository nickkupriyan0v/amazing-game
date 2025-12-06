export interface IComment {
  login?: string
  text?: string
  topicId: number
  id: number
  comment: string
  reactions: string
  parentId?: number
}
