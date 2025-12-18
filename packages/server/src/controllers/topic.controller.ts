/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express'
import { Topic } from '../models/topic.model'
import { ITopic } from '../types/topic.interface'

export class TopicController {
  static async create(req: Request<{}, {}, ITopic>, res: Response) {
    const { title, text, login } = req.body

    if (!login) {
      return res.status(400).json({ message: 'Требуется логин' })
    }

    const topic = await Topic.create({ title, text, login })

    return res.json(topic)
  }

  static async update(req: Request<ITopic, {}, ITopic>, res: Response) {
    const { title, text, login } = req.body
    const { id } = req.params

    const topic = await Topic.findByPk(id)

    if (!topic) {
      return res.status(404).json({ message: 'Не найдено' })
    }
    if (topic.login !== login) {
      return res.status(403).json({ message: 'Запрещено' })
    }

    topic.title = title ?? topic.title
    topic.text = text ?? topic.text

    await topic.save()
    return res.json(topic)
  }

  static async delete(req: Request<ITopic, {}, ITopic>, res: Response) {
    const { login } = req.body
    const { id } = req.params

    const topic = await Topic.findByPk(id)

    if (!topic) {
      return res.status(404).json({ message: 'Не найдено' })
    }
    if (topic.login !== login) {
      return res.status(403).json({ message: 'Запрещено' })
    }

    await topic.destroy()
    return res.json({ message: 'Удалено' })
  }

  static async get(req: Request<ITopic>, res: Response) {
    const { id } = req.params

    const topic = await Topic.findByPk(id, {
      include: ['comments'],
    })

    return res.json(topic)
  }

  static async list(res: Response) {
    const topics = await Topic.findAll({
      include: ['comments'],
    })

    return res.json(topics)
  }
}
