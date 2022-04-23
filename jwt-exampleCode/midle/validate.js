import jwt from 'jsonwebtoken'
export const validateToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.status(401).json({msg:'token invalid'})
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decode)=>{
        if(err) return res.status(403).json({msg:'token error'})
        req.email = decode.email
        next()
    })
}
