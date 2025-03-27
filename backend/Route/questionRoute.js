import { Router } from "express";
import { addQuestion, getQuestion, getQuestions, deleteQuestion} from "../controllers/questionController.js";
import {verifyToken} from "../middlewares/authmiddleware.js"

const router = Router()

router.get('/questions', getQuestions)

router.get('/questionbyquiz/:id', verifyToken, getQuestion)

router.post('/question', addQuestion)

router.delete('/question/:id', deleteQuestion)

export default router;