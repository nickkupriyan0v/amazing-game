export interface CommentAttribute {
  login: string
  text: string
  topicId?: number
  id: number
  comment?: string
  parentId?: number | null
  createdAt?: Date
  updatedAt?: Date
}
export type CommentCreationAttributes = Omit<CommentAttribute, 'id'>
