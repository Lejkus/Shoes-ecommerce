import express from 'express'
const router = express.Router()
import {getAllProducts ,addProduct ,getSingleProduct,addReview} from '../controllers/productController.js'

router.route('/').get(getAllProducts)
router.route('/singleproduct:id').get(getSingleProduct)
router.route('/add').get(addProduct)
router.route('/addreview/:id').post(addReview)

export default router