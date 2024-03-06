const GroupChats = require("../schemas/groupChatSchema");
const GroupMembers = require("../schemas/groupMemSchema");
const Users = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Groups = require("../schemas/groupSchema");
dotenv.config();


const processGroupMessage  = async (io, socket, payload, clients) =>{
    const token = payload.token;
    const message = payload.message;
    const { groupId } = payload;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      let gm = await GroupMembers.find({group:groupId});
      let group = await Groups.findOne({_id:groupId});
      group  = await group.save();
      let groupMessage =  GroupChats({message,sender:user._id,group:groupId});
      groupMessage = await groupMessage.save();
      groupMessage = await GroupChats.populate(groupMessage,'sender');
      groupMessage = await GroupChats.populate(groupMessage,'group');
      clients[user._id] = socket.id;
      for(let i=0;i<gm.length;i++){
        const socket_id = clients[gm[i].user.toString()];
        gm[i] = await gm[i].save();
        if(socket_id){
            io.to(socket_id).emit("receiveGroupMessage",groupMessage);
        }
      }
    }
    catch (err) {
        console.log(err);
        socket.emit("errorPrivateMessage", { error: err.message,err:1});
      }
}

const groupMessageGetController = async (req, res) => {
    const id = req.params.id;
    try {
        const messages = await GroupChats.find({ group: id }).populate("group").populate({path:"sender",select:"-password"});
        const members = await GroupMembers.find({group:id}).populate({path:"user",select:"-password"});
        res.send({ payload: messages, members:members,err: 0 });
    }
    catch (err) {
        console.log(err);
        res.send({ error: "Error in retreiving messages", err: 0 });
    }
}

const groupMessagePostController = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    try {
        const results = await GroupChats({ message: req.body.message, sender: user_id, group: id });
        await results.save();
        res.send({ message: "Succesfully sent!!", err: 0 })
    }
    catch (err) {
        res.send({ error: "Error in sending", err: 1 })
    }
}




module.exports = { groupMessageGetController, groupMessagePostController,processGroupMessage };