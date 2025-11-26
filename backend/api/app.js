import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressWs from 'express-ws'

const app = express()

// ws patch on app
expressWs(app)
// const { app: appWs } = expressWs(app)

import { UserRouter } from './router/userRouter.js'
import { InfoRouter } from './router/infoRouter.js'
import { MsgRouter } from './router/msgRouter.js'
import { WsRouter } from './router/msgWsRouter.js'
import { verifyTokenMiddleware } from './middlewares/userMw.js'

const port = process.env.PORT

app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', verifyTokenMiddleware)
app.use('/user', UserRouter)
app.use('/msg', MsgRouter)
app.use('/auth/info', InfoRouter)

app.use('/ws', WsRouter)

app.listen(port, () => {
    console.log('Listening on port:', port)
})

export default app