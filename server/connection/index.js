const mongoose = require("mongoose");
const connect = mongoose.connect("connection string")
connect.then(()=>{
    console.log("MongoDB connected")
}).catch((e)=>{
    console.log("error while connectiong MongoDB", e)
})
const UserSchema = new mongoose.Schema({
    Username: {
        type:String
    },
    Password:{
        type:String,
    }
})

const Data = mongoose.model("Data",UserSchema);
module.exports = Data