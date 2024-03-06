// const mongoose = require("mongoose");


// const groupRecentSchema = new mongoose.Schema({
//          user1:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"users"
//          },
//          user2:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"users"
//          }
// });

// groupRecentSchema.path('user1').validate((user1)=>{
//    return user1<this.user2
// },"Wrong Query Order for group Recents")

// const GroupRecents = mongoose.model("groupRecents",groupRecentSchema);
// module.exports = GroupRecents;