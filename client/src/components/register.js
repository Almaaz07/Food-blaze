import React, { useState , useEffect } from "react";
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate } from "react-router-dom";
import { regImage } from "./Assets/RegisterImage";
import eye from "./Assets/eye.svg"

const Register = () => {
  const [sendDataa , setSendData] = useState({
    "Username":"",
    "Password":""
  })
const [show , setShow]=useState(true)
  const showP =(e)=>{
    e.preventDefault();
setShow(!show)

  }   
const Navigate= useNavigate()
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(sendDataa.Username=="" || sendDataa.Password==""){
      toast.error("please fill the details")
    }
    else{
      await axios.post("http://localhost:7000/register",sendDataa)
      console.log("data send to backebd" , sendDataa)
     toast.success("Registered Succesfully");
     Navigate("/")
    }
    
}

const handleChange = (e)=>{
    setSendData({...sendDataa,[e.target.name]:e.target.value})
}

  const { user, loginWithRedirect , isAuthenticated} = useAuth0();

  return (
 <>
<div className="flex  w-full h-screen shadow-2xl bg-[url('./assets/img/login.jpg')] bg-cover bg-no-repeat justify-center items-center ">
<form>
 <div className=" w-full h-screen  flex justify-center items-center">
      <div className=" w-[390px] backdrop-blur-3xl rounded-l-3xl shadow-2xl h-[470px]  items-center flex flex-col">
        <h1 className="mt-[40px] font-bold text-2xl"> Create Your Account</h1>
        <label className="mt-[40px] font-semibold text-xl">Username</label>
        <br />
        <input
          type="text"
          name="Username"
          onChange={handleChange}
          className="px-3 text-xl font-medium border-blue-800 bg-transparent border-2 outline-none h-12 w-[290px] rounded-3xl "
        />
        <br />
        <label className="font-semibold text-xl">Password</label> <br />
<div className="flex text-xl font-medium text-white border-blue-800 bg-transparent border-2 h-12 w-[290px] rounded-3xl ">
        <input type={!show ? "text" : "password"}  onChange={handleChange}  name="Password" className=" px-3 text-l font-medium text-white bg-transparent outline-none h-12 w-[250px] rounded-3xl "/>
          <span className="flex items-center justify-center "><img src={eye} alt="" className="w-8 cursor-pointer" onClick={showP} /></span>
</div>

        <button className="mt-9 bg-blue-500  hover:bg-blue-600 transition-shadow w-[100px] h-[30px] rounded-3xl" onClick={handleSubmit}>
         Register
        </button>
       <NavLink to={"/"} className="mt-6">
       <span>Already have an account</span> <button className="text-blue-700">Login</button>
        </NavLink>
        {/* <button onClick={loginWithRedirect  }
          className="mt-9 bg-white w-[160px] hover:bg-blue-600 h-[30px] rounded-3xl flex justify-center items-center" 
        >
          login with Google
        </button> */}
        
   </div>
 </div>
 </form>
 <div className="flex items-center justify-center ">
<img src={regImage} alt="" className="w-[390px] h-[470px] rounded-r-3xl shadow-2xl" />
</div>
</div>


 {/* {
  get.map((e)=>( <p>{e.Username}</p> ))
  
 } */}
 </>
  );
};

export default Register;
