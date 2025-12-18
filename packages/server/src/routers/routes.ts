import { Router } from 'express'
import { TopicController } from '../controllers/topic.controller'
import { CommentController } from '../controllers/comment.controller'
const router = Router()

// const authStub = (req: Request, res: Response, next: NextFunction) => {
//   console.log('Временная заглушка для Middleware:', req.method, req.url)
//   req.user = { id: 1, login: 'testUser' }
//   next()
// }
// router.use(authStub)

//Темы(Topics) для форума
router.post('/topics', TopicController.create)
router.get('/topics', TopicController.list)
router.get('/topics/:id', TopicController.get)
router.put('/topics/:id', TopicController.update)
router.delete('/topics/:id', TopicController.delete)

//Комментарии
router.post('/topics/:topicId/comments', CommentController.create)
router.get('/comments/:id', CommentController.get)
router.put('/comments/:id', CommentController.update)
router.delete('/comments/:id', CommentController.delete)
router.get('comments/:id', CommentController.get)
router.get(
  '/topics/:topicId/comments',
  CommentController.getCommentsWithReplies
)
router.post('/comments/:parentId/replies', CommentController.create)
export default router
