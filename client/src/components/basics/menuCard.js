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
    <New/>
    <Card/>
    <section className="main-card--cointainer">
        {MenuData.map((curelement) => {

          const {id , name, amount,category, image, description} = curelement;
          return (
            <>
              <div className="card-container mb-12" key={id}>
                <div className="card rounded-3xl">
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
                  <img src={image} alt="images" className="card-media hover:cursor-zoom-in hover:scale-125 hover:con transition-all duration-500" />
                  <h3 className="text-xl font-bold m-4 "> ₹{amount}</h3>

                  <button className="card-tag subtle bg-green-900 hover:text-black-800 hover:bg-green-700 rounded-xl" onClick={()=>send(curelement)}> Add to Cart</button>
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
