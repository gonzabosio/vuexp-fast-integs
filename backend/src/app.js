import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRouter } from './router/userRouter.js'
import { InfoRouter } from './router/infoRouter.js'
import { verifyTokenMiddleware } from './middlewares/userMw.js'

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', verifyTokenMiddleware)
app.use('/user', UserRouter)
app.use('/auth/info', InfoRouter)

app.listen(port, () => {
    console.log('Listening on port:', port)
})