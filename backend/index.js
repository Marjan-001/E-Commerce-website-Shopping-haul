
/// import packages
import express from 'express'
import path from 'path'
import dotenv  from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config();
import connectDB from './configuration/database.js'

const port = process.env.PORT || 5000;
connectDB()



const app= express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.listen(port,()=>console.log(`server is running on port ${port}`))
