import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login_signup = () => {
  const { user, loginWithRedirect , isAuthenticated} = useAuth0();
  return (
    <div className="ml-[400px] w-full h-screen flex justify-center items-center">
      <div className=" w-[390px] bg-gray-400 rounded-3xl shadow-2xl h-[470px]  items-center flex flex-col">
        <h1 className="mt-[40px] font-bold text-2xl">Login</h1>
        <label className="mt-[40px] font-semibold text-xl">Username</label>
        <br />
        <input
          type="text"
          className="bg-gray-300 h-10 w-[290px] rounded-3xl "
        />
        <br />
        <label className="font-semibold text-xl">Password</label> <br />
        <input type="text" className="bg-gray-300 h-10 w-[290px] rounded-3xl" />
        <button className="mt-9 bg-blue-600 w-[100px] h-[30px] rounded-3xl">
          Signin
        </button>
        <button
          className="mt-9 bg-white w-[160px] h-[30px] rounded-3xl flex justify-center items-center"
          onClick={(e) => loginWithRedirect()}
        >
          login With Google
        </button>
   </div>
 </div>
  );
};

export default Login_signup;
