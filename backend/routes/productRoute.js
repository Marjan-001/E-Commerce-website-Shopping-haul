import express from 'express'
import formidable from 'express-formidable';
const router = express.Router();

import { authenticate,adminCheck } from '../middlewares/authMiddleware.js';
import { addProduct, updatingProductDetails ,discardProduct, getProducts, getSingleProduct, getAllProducts, addProductReview, fetchTopProducts , fetchNewProducts} from '../controllers/productCOntroller.js';
import checkId from '../middlewares/checkId.js';

router.route('/').post(authenticate,adminCheck,formidable(), addProduct)
router.route('/').get(getProducts)
router.route('/allproducts').get(getAllProducts)
router.route('/:id').put(authenticate,adminCheck,formidable(), updatingProductDetails).delete(authenticate,adminCheck,discardProduct).get(getSingleProduct)
router.route('/:id/reviews').post(authenticate,adminCheck, checkId, addProductReview)
router.route('/top').get(fetchTopProducts)
router.get('/new',fetchNewProducts)
export default router;