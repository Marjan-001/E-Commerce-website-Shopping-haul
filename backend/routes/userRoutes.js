
import express from 'express'
import { createUser,loginUser,logoutUser, getAllUsers, getCurrentUser, updateUserProfile, deleteUser,getUserById,updateUserById } from '../controllers/userControllers.js';
import { adminCheck, authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(createUser).get(authenticate,adminCheck,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout', logoutUser)
router.route('/profile').get(authenticate,getCurrentUser).put(authenticate,updateUserProfile)
// admin functionality

router.route('/:id').delete(authenticate,adminCheck,deleteUser).get(authenticate,adminCheck,getUserById).put(authenticate,adminCheck,updateUserById)
export default router;
