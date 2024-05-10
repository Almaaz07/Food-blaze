const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require ("cors");
const Data = require("./connection/index.js")
const User = require("./userModel.js");
require("./connection/index.js")
const nodemailer = require('nodemailer');

const stripe = require ("stripe")("sk_test_51OOKoASJXbsezbMWUwU1nSPXNwTZ3B5VNBTtvpsH2vqOBQTOKvfsdL9r9poVUIfbAbBeU1YZ7dLxJUGtGRq5Br0600YH6MDHSK")
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:false}))
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
        id:session.id,
        
    })
})


app.post("/register", async (req,res)=>{
    const {Username , Password} = req.body; 
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ Username });
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);
    
        // Create a new user
        const newUser = new User({
            Username,
            Password: hashedPassword,
        });
        await newUser.save();
    
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
         
       
})



app.post("/login", async (req, res) => {
    const { Username, Password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ Username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, "Authorisation", {
        expiresIn: "1h",
      });
  
      res.status(200).json({ token , Username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

app.listen(7000 , ()=>{
    console.log("server is listing at port no: 7000")
})
