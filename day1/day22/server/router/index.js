
const router = require('express').Router();



router.get("/employees",(req,res)=>{

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


router.get("/employees/:id",(req,res)=>{

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


router.post("/employees",(req,res)=>{

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
    
    
                                                //  UPDATE EMPLOYEE  DATA
    
      
    router.patch("/employees",(req,res)=>{
    
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
    
    
    
    
    module.exports =router;