import express from 'express'
const router = express.Router()
import { RegisterUser,LoginUser,GetUserData,AddOrder } from '../controllers/userController.js'
import { verifyToken } from '../middleware/VerifyToken.js'

router.route('/register').post(RegisterUser)
router.route('/login').post(LoginUser)
router.route('/get').get(verifyToken,GetUserData)
router.route('/addorder').post(AddOrder)

export default router