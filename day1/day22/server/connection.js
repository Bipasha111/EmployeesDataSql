const mysql =require('mysql2')
var mysqlConnect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'employee_db'
})

mysqlConnect.connect((err)=>{
    if(err){
        console.log("error from db connection :   ",JSON.stringify(err,undefined,2))
    }
    else{
        console.log("db successfully connected good",)
    }
})
module.exports = mysqlConnect;