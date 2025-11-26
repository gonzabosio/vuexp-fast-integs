import { Router } from 'express'
import { signupUserHandler, loginUserHandler } from '../handlers/userHandler.js'

const router = Router()

router.post('/signup', signupUserHandler)
router.post('/login', loginUserHandler)

export { router as UserRouter }