import React from "react";
import Menu from "./menueapi.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ filterItem, setMenuData, MenuList }) => {
  const { carts } = useSelector((state) => state.allCart);
  const { user, loginWithRedirect, logout, isAuthenticated,  authenticated } = useAuth0();
  return (
    <>
     
        <div className="flex items-center justify-center">
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

          <div className="flex justify-end  gap-4 ml-7 mt-7">
            {/* <div className="ml-8  rounded-3xl bg-gray-300 w-[90px] h-[30px] flex  items-center justify-center">

              {isAuthenticated?user.name: null}
            </div> */}

            <div className=" rounded-3xl bg-gray-300 w-[90px] h-[30px] flex justify-center  hover:bg-gray-500">
              
                <button onClick={(e) => logout()}>Logout</button>
              
            </div>
          </div>

          <NavLink to="/cart">
            <div className="flex justify-center mt-6 ml-[200px] bg-slate-400 w-[100px] items-center text-center rounded-3xl h-[40px] hover:bg-gray-500">
              <button className="text-3xl ">Cart</button>
            </div>
          </NavLink>
        </div>
      
    </>
  );
};

export default Navbar;
