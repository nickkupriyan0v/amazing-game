import { TReaction } from '../models/reaction.model'

export interface IReaction {
  id?: number
  type?: TReaction
  commentId?: number
  replyId?: number | null
  login?: string
  topicId?: number
}
