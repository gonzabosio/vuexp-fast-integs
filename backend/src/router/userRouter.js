import express from 'express'
import { signupUserHandler, loginUserHandler } from '../handlers/userHandler.js'

const router = express.Router()

router.post('/signup', signupUserHandler)
router.post('/login', loginUserHandler)

export { router as UserRouter }