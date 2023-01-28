const express = require('express')
const router = express.Router()
const {getAllProducts ,addProduct ,getSingleProduct,addReview} = require('../controllers/productController')

router.route('/').get(getAllProducts)
router.route('/singleproduct:id').get(getSingleProduct)
router.route('/add').get(addProduct)
router.route('/addreview/:id').post(addReview)


module.exports = router