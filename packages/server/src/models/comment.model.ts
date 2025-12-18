import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { Topic } from './topic.model'
import { CommentAttribute, CommentCreationAttributes } from 'comment.interface'
@Table({ tableName: 'comments', timestamps: true })
export class Comment extends Model<
  CommentAttribute,
  CommentCreationAttributes
> {
  @Column({ type: DataType.TEXT, allowNull: false })
  text!: string

  @Column({ type: DataType.STRING, allowNull: false })
  login!: string

  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER, allowNull: false })
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: true })
  parentId!: number | null

  @BelongsTo(() => Comment, { as: 'parent' })
  parent!: Comment

  @HasMany(() => Comment, { as: 'replies', foreignKey: 'parentId' })
  replies!: Comment[]
}
