import express  from "express";
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "../controllers/categoryController.js"; 
import { authenticate,adminCheck } from "../middlewares/authMiddleware.js";
 const router = express.Router();

 router.route('/').post(authenticate,adminCheck, createCategory)
 router.route('/:categoryId').put(authenticate,adminCheck,updateCategory)
router.route('/:categoryId').delete(authenticate,adminCheck,deleteCategory)
router.route('/categories').get(getAllCategory) 
router.route('/:id').get(getSingleCategory)
export default router;