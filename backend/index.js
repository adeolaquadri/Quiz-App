import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import questionRoute from './Route/questionRoute.js'
import quizRoute from './Route/quizRoute.js'
import userRoute from './Route/userRoute.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(cors({
   credentials: true,
   origin: "http://localhost:3000"
}));
app.use(questionRoute)
app.use(quizRoute)
app.use(userRoute)
const port = process.env.port
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
   app.listen(port, ()=>{console.log(`Server is listening to port ${port}`)})
   console.log("Connected to MongoDB successfully")
})
.catch((err)=>{
   console.log(err)
})

