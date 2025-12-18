import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Comment } from './comment.model'
import { ITopic } from '../types/topic.interface'
@Table({ tableName: 'topics' })
export class Topic extends Model<ITopic> {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string

  @Column({ type: DataType.TEXT, allowNull: false })
  text!: string

  @Column({ type: DataType.STRING, allowNull: false })
  login!: string

  @HasMany(() => Comment)
  comments!: Comment[]
}
