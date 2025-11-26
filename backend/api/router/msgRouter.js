import { Router } from 'express'
import { sendMsgHandler, getMessagesHandler } from '../handlers/msgHandler.js'

const router = Router()

router.post('/', sendMsgHandler)
router.get('/', getMessagesHandler)

export { router as MsgRouter }