const mongoose = require("mongoose");


const privateChatSchema = new mongoose.Schema({
         sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
         },
         recipient:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
         },
         message :{
            type:String,
            required:true
         }

},{timestamps:true});

const PrivateChats = mongoose.model("privateChats",privateChatSchema);
module.exports = PrivateChats;