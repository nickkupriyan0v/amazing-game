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
import { Reaction } from './reaction.model'

@Table({ tableName: 'comments', timestamps: true })
export class Comment extends Model<Comment> {
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
  parentId!: number

  @BelongsTo(() => Comment, { as: 'parent' })
  parent!: Comment

  @HasMany(() => Comment, { as: 'replies', foreignKey: 'parentId' })
  replies!: Comment[]

  @HasMany(() => Reaction)
  reactions!: Reaction[]
}
