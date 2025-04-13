import { Router } from 'express';
import { addUser, getUser, userAuth, deleteUser, updateUser, logoutUser} from '../controllers/userController.js'
import { verifyToken } from '../middlewares/authmiddleware.js';

const router = Router()

router.post('/signup', addUser)

router.get('/users', verifyToken, getUser)

router.post('/login',  userAuth)

router.delete('/user/:id', verifyToken, deleteUser)

router.put('/user/:_id', verifyToken, updateUser)

router.get('/logout',  logoutUser)

export default router;