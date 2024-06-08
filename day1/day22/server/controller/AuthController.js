const {error,sucess} =require('../utils/responseWrapper')
const connection = require('../connection');
const  bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')


const  singup =async(req,res)=>{

    try {
    const {name,email,password} = req.body;
    // console.log(req.body)
     
      if (!email || !password) { return res.send(error(400, "all fields are required please enter the all detailes")) }

                           //    Check user is already present or not
        const userExists = await checkUserExists(email);
         if (userExists) { 
          console.log("Already have account");
                          // return res.status(400).send({ message: 'Email is already taken' });
                          return res.send(error(400,"Email is already taken"))
                        }

    
            //  encrypted password
        const hashedpassword =await bcrypt.hash(password,10)
        console.log(req.body,hashedpassword)
    
        var emp =req.body;
        var empData = [name, email,hashedpassword];
        // insert data into database
        connection.query('INSERT INTO employees(name,email,password) values(?)',[empData],(err,rows)=>{
            if(err){
                console.log( " error from query  ",err)
            }
            else{
                console.log(rows);
                console.log(req.body)
               
      // Generate an access token
      const tokenPayload = { name, email };  // include relevant user information
      const secretKey = 'your_secret_key_here';
      const accessToken = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
      console.log("accessToken         ",accessToken)
      console.log("ok data is ready to send the database")

               return res.send(sucess(200,{rows,accessToken}))
            }
        })


        

    } catch (err) {
        console.log("error from loginnnnn",err)
    }

    }


                    //  Function  checkUserExists
function checkUserExists(email) {
    const query = `SELECT * FROM employees;`;
    return new Promise((resolve, reject) => {
      connection.query(query, [], (err, results) => {
        if (err) return reject(err);
        const userExists = results.length > 0;
        resolve(userExists);
      });
    });
}



                                                        //   User Login Form

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
  
      if (!email || !password) {
        return res.send(error(400, "All fields are required"));
      }
  
      const user = await findUserByEmail(email);
      console.log("userrrr",user)
      

      if (!user) {
          console.log("invalid user")
        return res.status(400).send({ message: 'Invalid credentials' });
      }
    //   console.log(password);
    //   console.log(user.password)
  
    //   const isPasswordValid = await bcrypt.compare(password, user.password);
      const match = await bcrypt.compare(password,user.password)
      console.log(match)
      
    //   if (!match) {
    //     console.log("invalid password")
    //     return res.status(400).send({ message: 'Invalid password' });
    //   }
  
      const tokenPayload = { id: user.id, name: user.name, email: user.email };
    
    console.log("token     ",tokenPayload)
    
      const secretKey = 'your_secret_key_here';
      const accessToken = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
      console.log("@access tok    ",accessToken);
      const refreshToken = jwt.sign(tokenPayload, secretKey, { expiresIn: '7d' });
    console.log("refreshToken",refreshToken)
      await storeRefreshToken(user.email, refreshToken);
     
    //   return res.send({
    //     message: "Login successful",

    //     // accessToken: accessToken,
    //     // refreshToken: refreshToken
    //   });


return res.send(sucess(200,"login successful",{accessToken,refreshToken}))


    } catch (err) {
      return res.status(500).send({ message: 'Internal server error' });
    }

 
  };


  
  function findUserByEmail(email) {
    const query = 'SELECT * FROM employees WHERE email = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
  
  function storeRefreshToken(email, refreshToken) {
    const query = 'UPDATE employees SET refreshToken = ? WHERE email = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, [refreshToken, email], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
  

module.exports ={singup,login}











