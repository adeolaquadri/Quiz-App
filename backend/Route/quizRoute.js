import Route from 'express'
import dotenv from 'dotenv'

dotenv.config()

import { addQuiz, getQuiz, deleteQuiz, getQuizImage } from '../controllers/quizController.js'
import { verifyToken } from '../middlewares/authmiddleware.js'

const router = Route()


router.get('/quiz', verifyToken, getQuiz)

router.post('/add_quiz', verifyToken, addQuiz)

router.get('/getImage/:id', verifyToken, getQuizImage)

router.delete('/delete_quiz/:id', verifyToken, deleteQuiz)

export default router;