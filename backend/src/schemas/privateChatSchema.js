const mongoose = require("mongoose");


const privateChatSchema = new mongoose.Schema({
         sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
         },
         recipient:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
         },
         message :{
            type:String,
            required:true
         },
         media : {
            type:String
         }


},{timestamps:true});

const PrivateChats = mongoose.model("privateChats",privateChatSchema);
module.exports = PrivateChats;