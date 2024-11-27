require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
const posts = [
    {
        username:"soumya",
        title:"post 1"
    },
    {
        username:"sakshi",
        title:"post 2"
    }
]
app.get('/posts',authenticateToken,(req:any,res:any)=>{
   res.json(posts.filter((post=>post.username === req.user.name)))
})
app.post('/login',(req:any,res:any)=>{
   const username = req.body.username
   const user = {name:username}
   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET )
   res.json({accessToken:accessToken})
})
function authenticateToken(req:any,res:any,next:any){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

 jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err:any,user:any)=>{
    if(err) return res.sendStatus(403)
        req.user = user
       next()

 })
}

app.listen(4000)
export {}
