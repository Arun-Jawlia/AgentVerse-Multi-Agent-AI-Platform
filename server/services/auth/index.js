import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()

const port = process.env.PORT || 8001

const app = express()


app.get('/', (req,res)=>{
    res.json({msg: "This is Auth Service"})
})

app.listen(port, ()=>{
    console.log(`Auth Service is running on ${port}`)
    connectDB()
})