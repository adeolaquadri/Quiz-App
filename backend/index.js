import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import questionRoute from './Route/questionRoute.js'
import quizRoute from './Route/quizRoute.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors());
app.use(questionRoute)
app.use(quizRoute)
const port = process.env.port
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
   app.listen(port, ()=>{console.log(`Server is listening to port ${port}`)})
   console.log("Connected to MongoDB successfully")
})
.catch((err)=>{
   console.log(err)
})

