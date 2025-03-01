import { Router } from "express";
import { addQuestion, getQuestions } from "../controllers/questionController.js";

const router = Router()

router.get('/questions', getQuestions)

router.post('/question', addQuestion)

export default router;