import express from 'express'
const router = express.Router()
import { RegisterUser,LoginUser,GetUserData,AddOrder,ChangeAddress } from '../controllers/userController.js'
import { verifyToken } from '../middleware/VerifyToken.js'

router.route('/register').post(RegisterUser)
router.route('/login').post(LoginUser)
router.route('/get').get(verifyToken,GetUserData)
router.route('/addorder').post(AddOrder)
router.route('/address').put(ChangeAddress)
export default router