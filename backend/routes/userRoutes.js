import express from 'express';
const router = express.Router()
import { authUser, getUserProlie, regsiterUser, updateUserProlie, getUser, deleteUser, getUserById, updateUser} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(regsiterUser).get(protect,admin,getUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProlie).put(protect, updateUserProlie);
router.route('/:id').delete(protect,admin,deleteUser).get(protect, getUserById).put(protect,updateUser);
export default router; 