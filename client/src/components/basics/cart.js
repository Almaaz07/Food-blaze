import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feature/cartslice";
import { loadStripe } from "@stripe/stripe-js/pure";
import toast from "react-hot-toast";




const Cart = () => {
  const [totalPrice, setPrice] = useState(0);
  const { carts } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();
  const handleInc = (e) => {
    dispatch(addToCart(e));
  };

  const total = () => {
    let totalPrice = 0;
    carts.map((elm, index) => {
      totalPrice = elm.amount * elm.qnty + totalPrice;
      console.log(totalPrice);
    });
    setPrice(totalPrice);
    console.log(totalPrice);
  };

  useEffect(() => {
    total();
  }, [total]);

  const makePay = async () => {
    // toast.success("Redirecting to payment gateway")
    const stripe = await loadStripe(
      "your key"
    );
    const body = {
      products: carts,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    
    <div className="flex flex-col w-full h-screen  bg-cover bg-[url('./assets/img/login.jpg')] bg-no-repeat  items-center   ">
      <div className="shop-cart backdrop-blur-2xl mt-[160px] rounded-3xl">
         <div className="flex gap-[530px] w-[800px] h-20 justify-center items-center">
          <h1 className=" text-xl font-semibold text-white">
            {carts.length} items in Cart{" "}
          </h1>
          {carts.length > 0 ? (
            <span className="ml-3 mt-6 text-white text-xl  rounded-3xl w-[110px] h-10 ">
              Your Cart
            </span>
          ) : null}
        </div>
    <div className="mt-4 shadow-2xl w-[800px] rounded-3xl ">
          {carts.length === 0 ? (
            <p> Your cart is empty</p>
          ) : (
            <table>
              <thead>
                <tr key=" " className=" ml-5 pt-12 flex gap-[75px] mb-2">
                  <th>Action</th>
                  <th>product</th>
                  <th>name</th>
                  <th>Price</th>
                  <th>qty</th>
                  <th className="ml-[120px]">Total Amount</th>
                </tr>
                
              </thead>
              <tbody>
                {carts.map((data, index) => {
                  return (
                    <tr
                      key=""
                      className="flex gap-12 mx-5 border-b h-[60px] items-center"
                    >
                      <td>
                        <button className="font-semibold">Delete</button>
                      </td>
                      <td>
                        <div>
                          <img
                            src={data.image}
                            alt=""
                            className=" flex hover:cursor-zoom-in hover:scale-150 hover:con transition-all duration-500 font-semibold h-[40px] ml-[40px]"
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <p className=" ml-[83px] font-semibold w-[50px]">
                            {data.name}
                          </p>
                        </div>
                      </td>
                      <td className=" ml-[30px]  font-semibold">
                        {data.amount}
                      </td>
                      <td>
                        <div className="flex ml-[17px] ">
                          <button className=" text-3xl ">-</button>
                          <p
                            className="w-[28px] backdrop-blur-2xl outline-none font-semibold justify-center pl-3 ml-4 border-black"
                            >{data.qnty}
                            </p>
                          <button
                            className="text-3xl pl-3 ml-4 "
                            onClick={() => handleInc(data)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="ml-[168px] font-semibold">
                        {data.qnty * data.amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {carts.length === 0 ? (
            ""
          ) : (
            <div className=" flex h-14 items-center gap-[50px]">
              <p className="ml-[400px]">items in Cart :{carts.length}</p>
              <p>Total Price :<span className="font-bold text-xl font-serif"> {totalPrice}</span> Rs </p>
              <button className="hover:cursor-zoom-in hover:scale-110 hover:con transition-all duration-500 mr- bg-transparent hover:bg-green-500 rounded-3xl p-2" onClick={makePay}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
