const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
         name:{
            type:String,
            required:true
         }
},{timestamps:true});

const Groups = mongoose.model("groups",groupSchema);
module.exports = Groups;