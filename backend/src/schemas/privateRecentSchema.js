const mongoose = require("mongoose");


const privateRecentSchema = new mongoose.Schema({
         user1:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
         },
         user2:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
         }
},{timestamps:true});

// privateRecentSchema.path('user1').validate((user1)=>{
//    return user1<this.user2
// },"Wrong Query Order for private Recents")

const PrivateRecents = mongoose.model("privateRecents",privateRecentSchema);
module.exports = PrivateRecents;