const express = require("express");
const cors = require ("cors");
const stripe = require ("stripe")("sk_test_51OOKoASJXbsezbMWUwU1nSPXNwTZ3B5VNBTtvpsH2vqOBQTOKvfsdL9r9poVUIfbAbBeU1YZ7dLxJUGtGRq5Br0600YH6MDHSK")
const app = express();



app.use(express.json());
app.use(cors());

const YOUR_DOMAIN = "http://localhost:3000"

app.post ("/api/create-checkout-session" , async (req,res)=>{
    const {products} = req.body
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name
            },
            unit_amount:product.amount*100,
        },
        quantity:product.qnty,
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    })
    res.json({
        id:session.id
    })
})


app.listen(7000 , ()=>{
    console.log("server is listing at port no: 7000")
})
