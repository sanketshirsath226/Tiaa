import express from 'express';
import { blockUser, updatePostToHide, updatePostToReport } from '../controllers/AdminController.js';

const router = express.Router();

router.put('/:id/hide',updatePostToHide);
router.put('/:id/report',updatePostToReport)
router.post('/block/:id',blockUser)
export default router;