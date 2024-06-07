
import express from 'express'
import { createUser,loginUser,logoutUser, getAllUsers } from '../controllers/userControllers.js';
import { adminCheck, authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(createUser).get(authenticate,adminCheck,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout', logoutUser)


export default router;
