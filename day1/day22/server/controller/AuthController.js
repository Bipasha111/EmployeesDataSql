const {error,sucess} =require('../utils/responseWrapper')
const connection = require('../connection');
const  bcrypt = require('bcrypt'); 


const  login =async(req,res)=>{

    res.send("this is login")

    const {name,email,password} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);

    if(!email || !password){
        // return res.status(400).send("khali bharo")
        return res.send(error(400,"all fields are required please enter the all detailes"))
    }
    

// connection.query('SELECT * FROM employees WHERE email = ?', [email], async (err, results) => {
//     if(err){
//         console.log( " error from query  ",err)
//     }else{
//         res.send(error(300,"Alredy have account"))
//     }
// })

    const hashedpassword =await bcrypt.hash(password,10)
    console.log(password)
    console.log(hashedpassword)
 

    // var emp =req.body;
    // var empData =[emp.name,emp.email,emp.password]
    var empData = [name, email,hashedpassword];
    connection.query('INSERT INTO employees(name,email,password) values(?)',[empData],(err,rows)=>{
        if(err){
            console.log( " error from query  ",err)
        }
        else{
            console.log(rows);
            res.send(rows)
        }
    })
    

  
}



module.exports ={login}

