import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

router.route('/auth/signup').post(userCtrl.create)
router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)

export default router