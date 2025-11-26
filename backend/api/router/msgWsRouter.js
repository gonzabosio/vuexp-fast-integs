import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)

router.ws('/send-msg', (ws, req) => {
    ws.on('message', (data) => {
        try {
            const body = JSON.parse(data)
            ws.send(JSON.stringify({ message: body.message }))
        }
        catch (e) {
            ws.send(JSON.stringify({ message: 'Invalid JSON', error: e.message }))
        }
    })
})

export { router as WsRouter }