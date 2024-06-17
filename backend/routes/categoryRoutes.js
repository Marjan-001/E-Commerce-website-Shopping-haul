import express  from "express";
import { createCategory, updateCategory } from "../controllers/categoryController.js"; 
import { authenticate,adminCheck } from "../middlewares/authMiddleware.js";
 const router = express.Router();

 router.route('/').post(authenticate,adminCheck, createCategory)
 router.route('/:categoryId').put(authenticate,adminCheck,updateCategory)

 export default router;