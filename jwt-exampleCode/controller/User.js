import {user} from '../model/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//import cookie from 'cookie-parser'
export const getUser = async(req,res)=>{
    const email = req.params.email
    try{
        const users = await user.findOne({email},'username email')
        res.json(users)
    }catch(e){
        console.log(e)
    }
}

export const Register = async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body
    const allUser = await user.find({email})
    if(allUser.length != 0){
        return res.status(203).json({msg:'email has used'})
    }
    if(password !== confirmPassword) return res.status(400).json({msg:'password and confirm password not equal'})    
    const salt = await bcrypt.genSalt()
    const hassPw = await bcrypt.hash(password,salt)
    try {
        const userToCreate = new user()
        userToCreate.username = name
        userToCreate.email = email
        userToCreate.password = hassPw
        userToCreate.save()
        res.json({msg:'Register succesFully'})
        res.end()
    } catch (error) {
        console.log(error) 
        res.sendStatus(500)
    }
}
export const login = async(req,res)=>{
    const emails = req.body.email
    console.log(emails)
    try {
        const users = await user.find({email:emails}).exec()
        if(users[0] == undefined){
            return res.status(203).json({msg:'email not fouund'})
        }
        const match = await bcrypt.compare(req.body.password,users[0].password)
        if(!match) return res.status(400).json({msg:"password wrong !!!"})
        const {username,email,id} = users[0]
        //console.log(process.env.REFRESH_TOKEN)
        const accessToken = jwt.sign({username,email,id},process.env.ACCESS_TOKEN,{expiresIn:'1h'})   
        const refreshToken = jwt.sign({username,email,id},process.env.REFRESH_TOKEN,{expiresIn:'1d'})
        const password = users[0].password
        await user.replaceOne({id:id},{refresh_token:refreshToken,username,email,password})
        res.cookie('rfshtoken',refreshToken,{
            httpOnly:true,
            maxAge:24 * 3600 * 1000
        })
        res.json({accessToken})
        res.end()
        //console.log(await user.find({id}).exec())
    } catch (e) {
        console.log(e)
    }
}

export const refreshTokens = async(req,res)=>{
    const coockie = req.cookies.rfshtoken
    console.log(coockie)
    const email = req.params.email
    if(!coockie) return res.status(203).json({msg:'token not available'})
    const users = await user.find({email})
    if(!coockie == users[0].refreshToken) return res.sendStatus(403)
    if(!users[0]) return res.sendStatus(403)
    jwt.verify(coockie,process.env.REFRESH_TOKEN,(e,decode)=>{
        if(e) return res.status(404).json({msg:"token is invalid"})
        const {username,email,id} = users[0]
        const accessToken = jwt.sign({username,email,id},process.env.ACCESS_TOKEN,{expiresIn:'1h'})
        res.json({accessToken})
    })
}


