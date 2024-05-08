import React from "react";
import Menu from "./menueapi.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import cart from "../Assets/cart.svg";
import { logo } from "../Assets/logo.js";

const Navbar = ({ filterItem, setMenuData, MenuList }) => {
  const { carts } = useSelector((state) => state.allCart);
  const { user, loginWithRedirect, logout, isAuthenticated,  authenticated } = useAuth0();
  return (
    <>
     
        <div className="px-5 flex items-center justify-between">
<div> <img src={logo} className="w-[100px] h-[100px]" alt="" />
  
  </div>
          <nav className="navbar">
            <div className="btn-group flex">
              {MenuList.map((curelement) => {
                return (
                  <>
                    <button
                      key={curelement}
                      className="btn-group__item"
                      onClick={() => filterItem(curelement)}
                    >
                      {curelement}
                    </button>
                  </>
                );
              })}
            </div>
          </nav>
<div>
        <div className="flex justify-end  gap-2">
            <div className="ml-8 rounded-3xl bg-gray-300 pl-5 w-[90px] h-[38px] flex items-center justify-center">
              <p>{isAuthenticated?user.name: null}</p>
            </div>

            <div className=" rounded-3xl bg-gray-300 w-[90px] h-[38px] flex justify-center  hover:bg-gray-500">
              
                <button onClick={(e) => logout()} className="logout">Logout</button>
              
            </div>
            <NavLink to="/cart">
            <div className="flex  rounded-3xl bg-white w-[90px] h-[38px] justify-center">
            <img src={cart} alt=""className="bg-white w-[35px]" />
            </div>
          </NavLink>
          </div> 

           
       </div>
          
        </div>
       
      
    </>
  );
};

export default Navbar;
