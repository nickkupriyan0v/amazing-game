export interface CommentAttribute {
  login: string
  text: string
  topicId?: number | number
  id: number
  comment?: string
  parentId?: number | null
}
export type CommentCreationAttributes = Omit<CommentAttribute, 'id'>
