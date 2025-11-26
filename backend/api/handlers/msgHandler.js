import { sendMsgController, getMessagesController } from "../controllers/msgController.js"

/** @param {Request} req @param {Response} res*/
const sendMsgHandler = (req, res) => {
    const reqBody = req.body
    if (!reqBody.message) {
        return res.status(400).json({ error: 'Message is missing' })
    }
    const messages = sendMsgController(reqBody.message)
    res.status(201).json({ message: 'Message was sent', data: messages })
}

/** @param {Request} req @param {Response} res*/
const getMessagesHandler = (req, res) => {
    const messages = getMessagesController()
    res.status(200).json({ message: 'Messages retrieved', data: messages })
}

export {
    sendMsgHandler,
    getMessagesHandler
}