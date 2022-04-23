import express from 'express'
import cors from 'cors'
import mongo from 'mongoose'
import dotenv from "dotenv";
import test from './REST/index.js'
import bodyparser from 'body-parser'
import cookies from 'cookie-parser'
//import {validateToken} from './midle/validate.js'
import {user} from './model/UserModel.js'
dotenv.config()
//console.log(process.env.ACCESS_TOKEN)
import router from './router/index.js'
const app = express()

//mongoose config
const url = 'mongodb://127.0.0.1:27017'
try {
    await mongo.connect(url)
    console.log('connection succesfully')
} catch (error) {
    console.log(error)
}

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookies())
app.use(router)
app.listen(8888,()=>{
    console.log('your app runing on port 8888')
    test()
})

