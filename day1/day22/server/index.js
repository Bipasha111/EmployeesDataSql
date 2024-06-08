const express = require('express');
const app = express();
const connection = require('./connection');
const bodyParser=require('body-parser');
// const Router =require('./router/index')



const AuthRouter = require('./router/AuthRouter(1)');
// const PostRouter = require('./router/postRouther')

const cors = require("cors");

//middlewares
app.use(express.json())
app.use(bodyParser.json())


app.use(cors({
    credentials:true, 
    origin:"http://localhost:3000"
    
}))



app.use("/auth",AuthRouter) 

// app.use('/api',Router);

app.get("/employees",(req,res)=>{

    connection.query('SELECT * FROM employees',(err,rows)=>{
        if(err){
            console.log( " error from query   ",err)
        }
        else{
            console.log(rows);
            res.send(rows)
        }
    })
  
    
})


app.get("/employees/:id",(req,res)=>{

    connection.query('SELECT * FROM employees WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log( " error from query   ",err)
        }
        else{
            console.log(rows);
            res.send(rows)
        }
    })
  
    
})




                                        //  delete employee data

app.delete("/employees/:id",(req,res)=>{

    connection.query('DELETE  FROM employees WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log( " error from query  ",err)
        }
        else{
            console.log(rows);
            res.send(rows)
        }
    })
  
    
})



                                        //  INSERT EMPLOYEES DATA

app.post("/employees",(req,res)=>{

var emp =req.body;
var empData =[emp.name,emp.email,emp.password]
    connection.query('INSERT INTO employees(name,email,password) values(?)',[empData],(err,rows)=>{
        if(err){
            console.log( " error from query  ",err)
        }
        else{
            console.log(rows);
            res.send(rows)
        }
    })
  
    
})


//                                             //  UPDATE EMPLOYEE  DATA

  
app.patch("/employees",(req,res)=>{

    var emp =req.body;
    var empData =[emp.name,emp.email,emp.password]
        connection.query('UPDATE  employees SET? WHERE id='+emp.id,[emp],(err,rows)=>{
            if(err){
                console.log( " error from query  ",err)
            }
            else{
                console.log(rows);
                res.send(rows)
            }
        })
      
        
    })                                          



app.listen(4000,()=>{
   console.log("api is created")
}) 
