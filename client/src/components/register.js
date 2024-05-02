import React, { useState , useEffect } from "react";
import toast from 'react-hot-toast';
// import { NavLink }  from "react-router-dom"
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [get, setGetData]= useState([])
  const [sendDataa , setSendData] = useState({
    "Username":"",
    "Password":""
  })

console.log(sendDataa)
  
   
const Navigate= useNavigate()
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    await axios.post("http://localhost:7000/register",sendDataa)
    console.log("data send to backebd" , sendDataa)
   toast.success("Registered Succesfully");
   Navigate("/")
}

const handleChange = (e)=>{
    setSendData({...sendDataa,[e.target.name]:e.target.value})
}

  const { user, loginWithRedirect , isAuthenticated} = useAuth0();

  return (
 <>
 <form onSubmit={handleSubmit}>
 <div className=" w-full h-screen flex justify-center items-center">
      <div className=" w-[390px] bg-gray-400 rounded-3xl shadow-2xl h-[470px]  items-center flex flex-col">
        <h1 className="mt-[40px] font-bold text-2xl">Register</h1>
        <label className="mt-[40px] font-semibold text-xl">Username</label>
        <br />
        <input
          type="text"
          name="Username"
          onChange={handleChange}
          className="bg-gray-300 h-10 w-[290px] rounded-3xl "
        />
        <br />
        <label className="font-semibold text-xl">Password</label> <br />
        <input type="text"  onChange={handleChange}  name="Password" className="bg-gray-300 h-10 w-[290px] rounded-3xl" />
        <button className="mt-9 bg-blue-600  hover:bg-white transition-shadow w-[100px] h-[30px] rounded-3xl">
          Register
        </button>
       <NavLink to={"/"}>
       <span>Already have an account</span> <button className="text-blue-700">Login</button>
        </NavLink>
        <button onClick={loginWithRedirect  }
          className="mt-9 bg-white w-[160px] hover:bg-blue-600 h-[30px] rounded-3xl flex justify-center items-center" 
        >
          login with Google
        </button>
        
   </div>
 </div>
 </form>


 {
  get.map((e)=>( <p>{e.Username}</p> ))
  
 }
 </>
  );
};

export default Register;
