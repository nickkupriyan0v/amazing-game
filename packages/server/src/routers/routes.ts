import { Router } from 'express'
import { TopicController } from '../controllers/topic.controller'
import { CommentController } from '../controllers/comment.controller'
import { ReactionController } from '../controllers/reaction.controller'

const router = Router()
//Темы(Topics) для форума
router.post('/topics', TopicController.create)
router.get('/topics', TopicController.list)
router.get('/topics/:id', TopicController.get)
router.put('/topics/:id', TopicController.update)
router.delete('/topics/:id', TopicController.delete)

//Комментарии
router.post('/topics/:topicId/comments', CommentController.create)
router.put('/comments/:id', CommentController.update)
router.delete('/comments/:id', CommentController.delete)
router.get(
  '/topics/:topicId/comments',
  CommentController.getCommentsWithReplies
)
router.post('/comments/:parentId/replies', CommentController.create)

// Реакции
router.post('/reactions', ReactionController.create)
router.put('/reactions/:id'),
  router.delete('/reactions/:id', ReactionController.delete)

export default router
