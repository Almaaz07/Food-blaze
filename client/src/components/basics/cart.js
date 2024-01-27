import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feature/cartslice";
import {loadStripe} from '@stripe/stripe-js/pure';
import { json } from "react-router-dom";

const Cart = () => {
    const [totalPrice , setPrice] = useState(0);
    const {carts} = useSelector((state)=>state.allCart)
const dispatch = useDispatch()
    const handleInc=(e)=>{
     dispatch(addToCart(e))
    }
    
  const total = ()=>{
    let totalPrice = 0;
    carts.map((elm,index)=>{
        totalPrice=elm.amount * elm.qnty + totalPrice
        console.log(totalPrice)
    });
    setPrice(totalPrice);
    console.log(totalPrice)
  }

  useEffect(()=>{
total()
  }, [total]  );


  const makePay= async()=>{
    const stripe = await loadStripe("pk_test_51OOKoASJXbsezbMWrjFmarqbxm84SAU92Wv8ZhyVV97KDfsem0Vy2T1EqWfpXBm7s4S4niKQBjPoWqdC7y87LkbL00IWbnTgOO")
    const body = {
        products:carts
      }
    
    const headers ={
        "Content-Type":"application/json"
    }
    
    const response = await fetch("http://localhost:7000/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session= await response.json()
    const result = stripe.redirectToCheckout({
        sessionId:session.id
    })


    if(result.error){
        console.log(result.error)
    }
  }






  return (
    <div className="flex flex-col w-full h-screen mt-[0px] items-center justify-center ">
        <div className="flex gap-[570px] bg-gray-800 w-[800px] h-20 justify-center  rounded-b rounded-3xl items-center">
          <h1 className=" text-xl font-semibold text-white">Cart {carts.length} items</h1>
            {carts.length > 0 ? <button className="text-white text-xl bg-slate-600 rounded-3xl w-[110px] h-10 ">Empty Cart</button> : null}
        </div>
      <div className="mt-4 shadow-2xl w-[800px] rounded-t rounded-3xl ">
       { carts.length===0?<p>  Your cart is empty</p>:
       <table >
        <thead>
            <tr key=" " className=" ml-5 flex gap-[75px] mb-2">
                <th>Action</th>
                <th>product</th>
                <th>name</th>
                <th>Price</th>
                <th>qty</th>
                <th className="ml-[120px]">Total Amount</th>
            </tr>
            <hr/>
        </thead>
        <tbody>
            {
                carts.map((data,index)=>{
                    return(
                        <tr key=""   className="flex gap-12 mx-5 border-b h-[60px] items-center">
                            <td><button className="font-semibold">Delete</button></td>
                            <td><div><img src={data.image} alt="" className=" flex  font-semibold h-[40px] ml-[40px]" /></div></td>
                            <td><div><p className=" ml-[83px] font-semibold w-[50px]">{data.name}</p></div></td>
                            <td className=" ml-[30px]  font-semibold">{data.amount}</td>
                            <td>
                                <div className="flex ml-[17px] ">
                                    <button className=" text-3xl ">-</button>
                                    <input type="text" className="w-[28px] font-semibold border-b justify-center pl-3 ml-4 border-black" value={data.qnty} />
                                    <button className="text-3xl pl-3 ml-4 " onClick={()=>handleInc(data)}>+</button>

                                </div>
                            </td>
                            <td className="ml-[168px] font-semibold">
                            {data.qnty * data.amount}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
        
       </table>
       }
       
       <div className=" flex h-14 items-center gap-[50px]">
       <p className="ml-[500px]">items in Cart :{carts.length}</p>
       <p>Total Price : {totalPrice} </p>
       <button className="mr-4" onClick={makePay} >Checkout</button>
       </div>
     
      </div>
    </div>
  );
};

export default Cart;
