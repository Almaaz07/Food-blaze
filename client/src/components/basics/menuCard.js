import React from "react";
import "./style.css";
import { addToCart } from "../../redux/feature/cartslice.js";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { useAuth0 } from "@auth0/auth0-react";
import Login_signup from "../login_signup.js";
import Navbar from "./Navbar.js";
import New from "./new.js";
import Footer from "./Footer.js";
import Card from "./card.js";

const Menucard = ({ MenuData  }) => {
  const dispatch = useDispatch()

  const send = (e)=>{
  dispatch(addToCart(e))
  toast.success("Item Added to Cart")
  }
  const { user, loginWithRedirect , isAuthenticated} = useAuth0();
  return (
    
    <>
    <New className="p-0 m-0"/>
    <Card/>
    <section className="main-card--cointainer">
        {MenuData.map((curelement) => {

          const {id , name, amount,category, image, description} = curelement;
          return (
            <>

              <div className="card-container  rounded-2xl mb-12" key={id}>
                <div className="card rounded-2xl">
                  <div className="cadr-body">
                    <span className="card-number card-circle subtle"> {id}</span>
                    <span className="card-author subtle"></span>
                    <h2 className="card-title">
                    {name}
                    </h2>
                    <span className="card-description subtle">
                    {description}
                    </span>
                    <div className="card-read"> Read</div>
                  </div>
                  <img src={image} alt="images" className="card-media hover:cursor-zoom-in hover:scale-110 hover:con transition-all duration-500 w-[300px] h-[200px]" />
                  <h3 className="text-xl font-bold m-4 "> ₹{amount}</h3>

                  <button className="flex float-right b-2 rounded-3xl bg-transparent backdrop-blur-2xl hover:text-black-800 hover:bg-white text-xl px-3 py-2" onClick={()=>send(curelement)}> Add to Cart</button>
                </div>
              </div>
              
            </>
          );
        })}
      </section>
      <Footer/>
    </>
  );
};
export default Menucard;
