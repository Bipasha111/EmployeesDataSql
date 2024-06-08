import React, { Component } from "react";

class Home1 extends Component {
    constructor(props) {
        super(props);

        this.state={
            name:" ",
            email:"",
            password:""
        }
        this.FetchData = this.FetchData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   
    handleSubmit  () {
       
        console.log("handleSubmit")
         this.FetchData();
      
        }

        FetchData = async() => {
            console.log(this.state);
            const {name,email,password}=this.state
            
          
    
        try {
        
            const respond =  await fetch(`http://localhost:4000/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
                    },
            body:JSON.stringify({name,email,password}),
         });
    console.log(respond)
            
        } catch (error) {
       console.log("error from fetch api",error)      
        }
         }


    render(){
        return(<>
{/* <h1>{this.state.username}</h1>
        <h1>{this.state.email}</h1>
        <h1>{this.state.password}</h1> */}



        <div style={{height:"300px", margin:" 300px auto",backgroundColor:"yellow", width:"500px"}}>

                            
        <div style={{padding:"50px", display:"flex", gap:"2px", flexDirection:"column"}}>

         <span>Name:</span> <input type="text" required
         value={this.state.username}
         onChange={(e)=>{this.setState({name:e.target.value})}}
         placeholder="Enter the username"></input><br></br>

      <span>Email:</span> <input type="email" required
      value={this.state.email}
      onChange={(e)=>{this.setState({email:e.target.value})}}
       placeholder="Enter the email"></input><br></br>

      <span>Password:</span> <input type="password" required value={this.state.password}
       onChange={(e)=>{this.setState({password:e.target.value})}}
      placeholder="Enter the password "></input><br></br>

      <button onClick={this.handleSubmit}
      style={{width:"200px", backgroundColor:"skyblue"}}
      >Submit</button>
                                    </div>
                          </div>
        </>)
        
       
    }
}
export default Home1;