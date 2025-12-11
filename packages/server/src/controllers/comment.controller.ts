import { Request, Response } from 'express'
import { IComment } from '../types/comment.interface'
import { Comment } from '../models/comment.model'

export class CommentController {
  static async create(
    req: Request<{ topicId?: string; parentId: number }, unknown, IComment>,
    res: Response
  ) {
    const { text, login } = req.body

    const parentId = req.params.parentId ? Number(req.params.parentId) : null
    let topicId = req.params.topicId ? Number(req.params.topicId) : null

    if (!login) return res.status(400).json({ message: 'Логин не получен' })

    if (parentId) {
      if (isNaN(parentId))
        return res.status(400).json({ message: 'Некорректный parentId' })

      const parentComment = await Comment.findByPk(parentId)
      if (!parentComment)
        return res
          .status(404)
          .json({ message: 'Родительский комментарий не найден' })

      topicId = parentComment.topicId
    }

    if (!topicId || isNaN(topicId))
      return res.status(400).json({ message: 'Некорректный topicId' })

    const comment = await Comment.create({
      text,
      login,
      topicId,
      parentId: parentId,
    })

    return res.json(comment)
  }
  static async get(req: Request<{ id: number }>, res: Response) {
    const { id } = req.params
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Не корректный id' })
    }

    const comment = await Comment.findByPk(id, {
      include: [{ model: Comment, as: 'replies' }],
    })
    if (!comment) {
      return res.status(404).json({ message: 'Не найден комментарий' })
    }
    return res.json(comment)
  }
  static async update(
    req: Request<{ id: string }, unknown, IComment>,
    res: Response
  ) {
    const { text, login } = req.body
    const id = Number(req.params.id)

    if (isNaN(id)) return res.status(400).json({ message: 'Некорректный id' })

    const comment = await Comment.findByPk(id)
    if (!comment)
      return res.status(404).json({ message: `Не найдено: ${comment}` })
    if (comment.login !== login)
      return res.status(403).json({ message: 'Запрещено' })

    if (text !== undefined) comment.text = text
    await comment.save()

    return res.json(comment)
  }

  static async delete(
    req: Request<{ id: string }, unknown, IComment>,
    res: Response
  ) {
    const { login } = req.body
    const id = Number(req.params.id)

    if (isNaN(id)) return res.status(400).json({ message: 'Некорректный id' })

    const comment = await Comment.findByPk(id)
    if (!comment) return res.status(404).json({ message: 'Not found' })
    if (comment.login !== login)
      return res.status(403).json({ message: 'Forbidden' })

    await comment.destroy()
    return res.json({ message: 'Deleted' })
  }

  static async getCommentsWithReplies(
    req: Request<{ topicId: string }>,
    res: Response
  ) {
    const topicId = Number(req.params.topicId)
    if (isNaN(topicId))
      return res.status(400).json({ message: 'Некорректный topicId' })

    const comments = await Comment.findAll({
      where: { topicId, parentId: null },
      include: [{ model: Comment, as: 'replies' }],
    })

    return res.json(comments)
  }
}
