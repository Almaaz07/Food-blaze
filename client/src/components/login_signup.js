import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Imageee } from "./Assets/images"
import { Google } from "./Assets/google";
import eye from "./Assets/eye.svg"


const Login_signup = () => {
  const [sendDataa, setSendData] = useState({
    Username: "",
    Password: "",
  });
  const [show , setShow]=useState(true)
  const showP =(e)=>{
    e.preventDefault();
setShow(!show)

  } 
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [authenticated, setAuthenticated] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if(sendDataa.Username=="" || sendDataa.Password==""){
      toast.error("please fill the details")
    }
else{
  await axios.post("http://localhost:7000/login", sendDataa).then((res) => {
    try {
      if (res.status === 200) {
        setAuthenticated(true);
        console.log(authenticated);
      }
     if(res.status === 401){
     console.log("error")
     }
      else {
        console.log("error while login");
      }
    } catch (error) {
      console.log("error", error);
    }
  });
  console.log("verified from backebd", sendDataa);
  toast.success("login Succesfully");
  Navigate("/");
}
    


  };

  const handleChange = (e) => {
    setSendData({ ...sendDataa, [e.target.name]: e.target.value });
  };

  if(isAuthenticated || authenticated){
    Navigate("/res")
  }


  return (
    <>
     <div className="flex flex-row-reverse w-full h-screen  justify-center items-center">
      <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <div className=" w-[390px] backdrop-blur-2xl rounded-r-3xl shadow-2xl h-[470px]  items-center flex flex-col">
            <h1 className="mt-[40px] font-bold text-3xl">Welcome back 😎</h1>
            <label className="mt-[18px] font-semibold text-xl">Username</label>
            <br />
            <input
              type="text"
              name="Username"
              onChange={handleChange}
              className=" px-3 text-xl font-medium text-white bg-transparent border-2 h-12 w-[290px] rounded-3xl "
            />
            <br />
            <label className="font-semibold text-xl">Password</label> <br />
            <div className="flex text-xl font-medium text-white bg-transparent border-2 h-12 w-[290px] rounded-3xl ">
        <input type={!show ? "text" : "password"}  onChange={handleChange}  name="Password" className=" px-3 text-l font-medium text-white bg-transparent outline-none h-12 w-[250px] rounded-3xl "/>
          <span className="flex items-center justify-center "><img src={eye} alt="" className="w-8 cursor-pointer" onClick={showP} /></span>
</div>
            <button className="mt-9 bg-blue-600 w-[100px] h-[30px] rounded-3xl">
              Signin
            </button>
            <NavLink to="/register">
              <button className="text-l mt-4 ">Don't have an account <span className="text-blue-800 font-bold hover:text-blue-600">Register</span></button>
            </NavLink>
            <button
              className="mt-4 bg-white w-[174px] h-[39px] rounded-3xl flex justify-center items-center"
              onClick={(e) => loginWithRedirect()}>
              <span> <img src={Google} alt="" className="w-10 h-10"/> </span> 
             <span className="ml-1"> login With Google</span>
            </button>
          </div>
        </div>
      </form>
      </div>

<div className="flex items-center justify-center ">
<img src={Imageee} alt="" className="w-[390px] h-[470px] rounded-l-3xl shadow-2xl" />
</div>


     </div>
    </>
  );
};

export default Login_signup;
