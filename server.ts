const express = require('express')
const app = express()
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
app.get('/login',(req:any,res:any)=>{
    
})

app.listen(3000)
