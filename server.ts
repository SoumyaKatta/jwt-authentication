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
app.get('/posts',(req:any,res:any)=>{
   res.json(posts)
})
app.post('/login',(req:any,res:any)=>{
   const username = req.body.username
   const user = {name:username}
   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET )
   res.json({accessToken:accessToken})
})


app.listen(3000)
