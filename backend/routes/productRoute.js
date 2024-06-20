import express from 'express'
import formidable from 'express-formidable';
const router = express.Router();

import { authenticate,adminCheck } from '../middlewares/authMiddleware.js';
import { addProduct, updatingProductDetails ,discardProduct, getProducts} from '../controllers/productCOntroller.js';

router.route('/').post(authenticate,adminCheck,formidable(), addProduct)
router.route('/').get(getProducts)

router.route('/:id').put(authenticate,adminCheck,formidable(), updatingProductDetails).delete(authenticate,adminCheck,discardProduct)

export default router;