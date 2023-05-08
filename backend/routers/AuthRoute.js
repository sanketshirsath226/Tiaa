import express from 'express';
import { loginUser, otpValidate, registerUser } from '../controllers/AuthController.js';

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/otpvalidate',otpValidate)
export default router;