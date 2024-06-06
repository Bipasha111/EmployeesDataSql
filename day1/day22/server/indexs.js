
const express = require("express");
const app = express();
// const morgan = require("morgan")

const AuthRouter = require('./router/AuthRouter')
// const PostRouter = require('./router/postRouther')
// const cookies = require('cookie-parser')
const cors = require("cors");

//middlewares
app.use(express.json())

app.use(cors({
    credentials:true, 
    origin:"http://localhost:3000"
    
}))



app.use("/auth",AuthRouter) 

app.get("/get",(req,res)=>{
    res.send("i am get api")
})
// app.use("/post",PostRouter)


app.listen(4000,()=>{
    console.log("api is created")
})                  




 