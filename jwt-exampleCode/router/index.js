import {getUser,Register,login,refreshTokens} from '../controller/User.js'
import express from 'express'
import {validateToken} from '../midle/validate.js'
const router = express.Router()

router.get('/users/:email',validateToken,getUser)
router.post('/users',Register)
router.post('/login',login)
router.get('/token/:email',refreshTokens)
export default router

