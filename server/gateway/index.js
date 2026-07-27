import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
dotenv.config()

const port = process.env.PORT || 8000

const app = express()

app.use('/auth', proxy(process.env.AUTH_SERVICE))

app.get('/', (req,res)=>{
    res.json({msg: "This is API Gateway"})
})

app.listen(port, ()=>{
    console.log(`Api gateway is running on ${port}`)
})