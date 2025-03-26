import { Router } from 'express';
import { addUser, getUser, userAuth, deleteUser, updateUser} from '../controllers/userController.js'

const router = Router()

router.post('/add_user', addUser)

router.get('/get_user', getUser)

router.post('/login', userAuth)

router.delete('/users/:id', deleteUser)

router.put('/update_user/:_id', updateUser)

export default router;