import { Router } from "express";
import { addQuestion, getQuestion, updateQuestion, getQuestions, deleteQuestion} from "../controllers/questionController.js";
import {verifyToken} from "../middlewares/authmiddleware.js"

const router = Router()

router.get('/questions', getQuestions)

router.get('/question/:id', verifyToken, getQuestion)

router.post('/question', addQuestion)

router.delete('/question/:id', deleteQuestion)

router.put('/update_question', updateQuestion)

export default router;