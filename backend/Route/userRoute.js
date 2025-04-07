import { Router } from 'express';
import { addUser, getUser, userAuth, deleteUser, updateUser, logoutUser} from '../controllers/userController.js'

const router = Router()

router.post('/signup', addUser)

router.get('/users', getUser)

router.post('/login', userAuth)

router.delete('/user/:id', deleteUser)

router.put('/user/:_id', updateUser)

router.get('/logout', logoutUser)

export default router;