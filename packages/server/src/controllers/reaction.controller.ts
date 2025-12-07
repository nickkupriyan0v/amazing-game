import { Reaction } from '../models/reaction.model'
import { IReaction } from '../types/reaction.interface'
import { Request, Response } from 'express'
export class ReactionController {
  static async create(req: Request<IReaction>, res: Response) {
    const { type, login, commentId } = req.body
    if (!login) {
      return res.status(400).json({ message: 'Логин не получен' })
    }
    const reaction = await Reaction.create({
      type,
      login,
      commentId,
    })
    return res.json(reaction)
  }

  static async update(
    req: Request<{ id: string }, object, IReaction>,
    res: Response
  ) {
    const { type, login } = req.body
    const { id } = req.params

    if (!login) {
      return res.status(400).json({ message: 'Логин обязателен' })
    }

    const reaction = await Reaction.findByPk(id)

    if (!reaction) {
      return res.status(404).json({ message: 'Реакция не найдена' })
    }

    if (reaction.login !== login) {
      return res.status(403).json({ message: 'Нет доступа' })
    }

    reaction.type = type ?? reaction.type
    await reaction.save()

    return res.json(reaction)
  }
  static async delete(
    req: Request<IReaction, unknown, IReaction>,
    res: Response
  ) {
    const { login } = req.body
    const { id } = req.params

    const reaction = await Reaction.findByPk(id)

    if (!reaction) {
      return res.status(404).json({ message: 'Не найдено' })
    }

    if (reaction.login !== login) {
      return res.status(403).json({ message: 'Запрещено' })
    }

    await reaction.destroy()
    return res.json({ message: 'Удалено' })
  }
}
