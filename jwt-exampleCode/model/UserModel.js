import mongo from 'mongoose'

const Scema = mongo.Schema

const userSchema = new Scema({
    email:String,
    username:String,
    password:String,
    refresh_token:{type:String,default:''}
})

export const user = mongo.model('USER',userSchema)
