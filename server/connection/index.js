const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://almaazsiddiqui3:V33YDQSfczuHOp9B@cluster0.rmy45bj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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