import Route from 'express'
import dotenv from 'dotenv'

dotenv.config()

import { addQuiz, getQuiz } from '../controllers/quizController.js'
import { verifyToken } from '../middlewares/authmiddleware.js'

const router = Route()


router.get('/quiz', verifyToken, getQuiz)

router.post('/add_quiz', addQuiz)

export default router;