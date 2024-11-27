require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
let refreshTokens:any[] = []
// const posts = [
//     {
//         username:"soumya",
//         title:"post 1"
//     },
//     {
//         username:"sakshi",
//         title:"post 2"
//     }
// ]
// app.get('/posts',authenticateToken,(req:any,res:any)=>{
//    res.json(posts.filter((post=>post.username === req.user.name)))
// })
app.delete('/logout',(req:any,res:any)=>{
    refreshTokens = refreshTokens.filter(token => token!== req.body.token)
    res.sendStatus(204)
})
app.post('/token',(req:any,res:any)=>{
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err:any, user:any)=>{
       if(err)return res.sendStatus(403)
        const accessToken = generateAccessToken({name:user.name})
        res.json({accessToken:accessToken})
    })
})
app.post('/login',(req:any,res:any)=>{
   const username = req.body.username
   const user = {name:username}
   const accessToken = generateAccessToken(user)
   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
   refreshTokens.push(refreshToken)
   res.json({accessToken:accessToken,refreshToken:refreshToken})
})
// function authenticateToken(req:any,res:any,next:any){
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if(token == null) return res.sendStatus(401)

//  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err:any,user:any)=>{
//     if(err) return res.sendStatus(403)
//         req.user = user
//        next()

//  })
// }
function generateAccessToken(user:any){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1m'} )
}
app.listen(4000)
export {}
