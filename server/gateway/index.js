import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const port = process.env.PORT || 8000

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser())

app.use('/auth', proxy(process.env.AUTH_SERVICE))

app.get('/', (req,res)=>{
    res.json({msg: "This is API Gateway"})
})

app.listen(port, ()=>{
    console.log(`Api gateway is running on ${port}`)
})