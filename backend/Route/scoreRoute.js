import { Router } from "express";
import { addScore, getAllScore, deleteAllScore } from "../controllers/scoreController.js";
import { verifyToken } from "../middlewares/authmiddleware.js";

const router = Router()

router.post('/add-score', verifyToken, addScore)

router.get('/score', getAllScore)

router.delete('/score', deleteAllScore)

export default router;