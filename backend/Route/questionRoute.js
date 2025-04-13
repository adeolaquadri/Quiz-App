import { Router } from "express";
import { addQuestion, getQuestion, updateQuestion, getQuestions, deleteQuestion} from "../controllers/questionController.js";
import {verifyToken} from "../middlewares/authmiddleware.js"

const router = Router()

router.get('/questions', verifyToken, getQuestions)

router.get('/question/:id', verifyToken, getQuestion)

router.post('/question', verifyToken, addQuestion)

router.delete('/question/:id', verifyToken, deleteQuestion)

router.put('/update_question', verifyToken, updateQuestion)

export default router;