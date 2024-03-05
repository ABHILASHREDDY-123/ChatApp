const mongoose = require("mongoose");


const groupChatSchema = new mongoose.Schema({
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        group:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"groups"
        },
        message :{
            type:String,
            required:true
        }
},{timestamps:true});

const GroupChats = mongoose.model("groupChats",groupChatSchema);
module.exports = GroupChats;