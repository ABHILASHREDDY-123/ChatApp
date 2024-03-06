const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
         name:{
            type:String,
            required:true
         },
         gmail:{
            type:String,
            required:true,
            unique:true
         },
         password:{
            type:String,
            required:true
         }
},{timestamps:true});

const Users = mongoose.model("users",userSchema);
module.exports = Users;