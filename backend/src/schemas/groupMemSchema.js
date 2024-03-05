const mongoose = require("mongoose");


const groupMemSchema = new mongoose.Schema({
         user :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
         },
         group:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"groups"
         }
},{timestamps:true});

const GroupMembers = mongoose.model("groupMembers",groupMemSchema);
module.exports = GroupMembers;