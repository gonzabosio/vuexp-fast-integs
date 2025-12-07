import { Router } from 'express'
import { signupUserHandler, loginUserHandler, logoutUserHandler } from '../handlers/userHandler.js'

const router = Router()

router.post('/signup', signupUserHandler)
router.post('/login', loginUserHandler)
router.post('/logout', logoutUserHandler)

export { router as UserRouter }