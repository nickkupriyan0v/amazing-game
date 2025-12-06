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
  
  static async reactToTopic(
    req: Request<{ topicId: string }, Record<string, never>, { type: string }>,
    res: Response
  ) {
    const { type } = req.body
    const { topicId } = req.params
    const login = req.user?.login // берём из middleware заглушки

    if (!type) {
      return res.status(400).json({ message: 'Тип реакции обязателен' })
    }

    // Проверим, что topicId число
    const id = Number(topicId)
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Некорректный topicId' })
    }

    // Создаем реакцию на тему
    const reaction = await Reaction.create({
      type,
      topicId: id,
      login,
    })

    return res.json(reaction)
  }

  static async getTopicReactions(
    req: Request<{ topicId: string }>,
    res: Response
  ) {
    const { topicId } = req.params

    const id = Number(topicId)
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Некорректный topicId' })
    }

    // Сгруппировать реакции по типу
    const reactions = await Reaction.findAll({
      where: { topicId: id },
      attributes: [
        'type',
        [Reaction.sequelize!.fn('COUNT', Reaction.sequelize!.col('type')), 'count'],
      ],
      group: ['type'],
    })

    return res.json(reactions)
  }

}
