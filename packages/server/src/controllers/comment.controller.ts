/* eslint-disable prefer-const */
import { Request, Response } from 'express'
import { CommentAttribute } from '../types/comment.interface'
import { Comment } from '../models/comment.model'

export class CommentController {
  static async create(
    req: Request<
      { topicId?: string; parentId?: string | number },
      unknown,
      CommentAttribute
    >,
    res: Response
  ) {
    try {
      const { text, login } = req.body

      if (!login) return res.status(400).json({ message: 'Логин не получен' })
      if (!text)
        return res.status(400).json({ message: 'Текст комментария обязателен' })

      const parentId: number | null = req.params.parentId
        ? Number(req.params.parentId)
        : null
      let topicId: number | null = req.params.topicId
        ? Number(req.params.topicId)
        : null

      if (parentId !== null) {
        if (isNaN(parentId))
          return res.status(400).json({ message: 'Некорректный parentId' })

        const parentComment = await Comment.findByPk(parentId)
        if (!parentComment)
          return res
            .status(404)
            .json({ message: 'Родительский комментарий не найден' })

        topicId = parentComment.topicId
      }

      if (topicId === null || isNaN(topicId))
        return res.status(400).json({ message: 'Некорректный topicId' })

      const comment = await Comment.create({
        login,
        text,
        topicId,
        parentId,
      })

      return res.json(comment)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
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
    req: Request<{ id: string }, unknown, CommentAttribute>,
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
    req: Request<{ id: string }, unknown, CommentAttribute>,
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
