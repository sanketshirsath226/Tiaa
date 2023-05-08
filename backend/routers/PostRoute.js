import express from 'express'
import { addComment, createPost, deletePost, getPost, getPostByCategory, getTimelinePosts, likePost, updatePost } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/',createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.get('/:id/:category', getPostByCategory)
router.put('/:id/addComment',addComment)
export default router