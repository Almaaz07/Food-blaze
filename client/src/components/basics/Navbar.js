import React from "react";
import Menu from "./menueapi.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ filterItem, setMenuData, MenuList }) => {
  
  const {carts} = useSelector((state)=>state.allCart)
  console.log(carts)
  const { user, loginWithRedirect , logout,isAuthenticated} = useAuth0();
  return (
    
    <>
    {isAuthenticated?<div className="flex items-center justify-center">
     <nav className="navbar">
        <div className="btn-group flex">
          {MenuList.map((curelement) => {
            return (
              <>
                <button
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

      <div className="flex justify-end  gap-4 ml-7 mt-7">
      {/* <div className="ml-8  rounded-3xl bg-gray-300 w-[90px] h-[30px] flex  items-center justify-center">

{isAuthenticated?user.name: null}
</div> */}
     
        <div className=" rounded-3xl bg-gray-300 w-[90px] h-[30px] flex justify-center"> 
        {isAuthenticated?<button onClick={(e)=>logout()}>Logout</button>:null}
        </div>
      </div>
     


        
      <NavLink to="/cart">
      <div className="justify-center mt-6 ml-[200px]">
                <button className="text-3xl ">Cart</button>
               
                </div>
      </NavLink>
     </div>:null}
     
    </>
  );
};

export default Navbar;
