import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";


const Login_signup = () => {
  const [sendDataa, setSendData] = useState({
    Username: "",
    Password: "",
  });
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [authenticated, setAuthenticated] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  const handleChange = (e) => {
    setSendData({ ...sendDataa, [e.target.name]: e.target.value });
  };

  if(isAuthenticated || authenticated){
    Navigate("/res")
  }


  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="ml-[400px] w-full h-screen flex justify-center items-center">
          <div className=" w-[390px] bg-gray-400 rounded-3xl shadow-2xl h-[470px]  items-center flex flex-col">
            <h1 className="mt-[40px] font-bold text-2xl">Login</h1>
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
            <input
              type="text"
              onChange={handleChange}
              name="Password"
              className="bg-gray-300 h-10 w-[290px] rounded-3xl"
            />
            <button className="mt-9 bg-blue-600 w-[100px] h-[30px] rounded-3xl">
              Signin
            </button>
            <NavLink to="/register">
              <button className="text-xl ">Register</button>
            </NavLink>
            <button
              className="mt-9 bg-white w-[160px] h-[30px] rounded-3xl flex justify-center items-center"
              onClick={(e) => loginWithRedirect()}
            >
              login With Google
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login_signup;
