import { Router } from 'express'
import expressWs from 'express-ws'

const router = Router()
expressWs(router)
const clients = new Set();

router.ws('/send-msg', (ws, req) => {
    clients.add(ws)
    ws.on('message', (data) => {
        for (const client of clients) {
            if (client.readyState === 1) {
                try {
                    const body = JSON.parse(data)
                    client.send(JSON.stringify({ message: body.message }))
                }
                catch (e) {
                    client.send(JSON.stringify({ message: 'Invalid JSON', error: e.message }))
                }
            }
        }
    })
    ws.on('close', () => {
        clients.delete(ws);
    });
})

export { router as WsRouter }

// database model: users - chats - messages
// MULTI-CHAT ->
// const chats = {};
// /chat/:id
// const id = req.params.id;

// if (!chats[id]) chats[id] = new Set();

// chats[id].add(ws);

// ws.on('message', msg => {
//     for (const client of chats[id]) {
//         if (client.readyState === 1) client.send(msg);
//     }
// });