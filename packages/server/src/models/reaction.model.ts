import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { Comment } from './comment.model'
import { IReaction } from '../types/reaction.interface'
import { Topic } from './topic.model'

export type IReactionCreationAttributes = Omit<
  IReaction,
  'id' | 'createdAt' | 'updatedAt'
>
export enum TReaction {
  like = 'like',
  dislike = 'dislike',
  heart = 'heart',
  fire = 'fire',
}
@Table({ tableName: 'reaction' })
export class Reaction extends Model<Reaction, IReaction> implements IReaction {
  @Column({
    type: DataType.ENUM(...Object.values(TReaction)),
    allowNull: false,
  })
  type!: TReaction

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER })
  commentId!: number

  @BelongsTo(() => Comment)
  comment!: Comment

  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @Column({ type: DataType.STRING, allowNull: false })
  login!: string
}
