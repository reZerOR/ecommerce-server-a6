import { Status } from 'better-status-codes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (_req: Request, res: Response)=>{
    res.status(Status.OK).json({
        success: true,
        message: 'welcome to the server'
    })
})

export default app