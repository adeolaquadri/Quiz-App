import Route from 'express'
import { addQuiz, getQuiz } from '../controllers/quizController.js'

const router = Route()

router.get('/get_quiz', getQuiz)

router.post('/add_quiz', addQuiz)

export default router;