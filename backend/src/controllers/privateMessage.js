const db = require("../database/db");
const jwt = require("jsonwebtoken");
const PrivateChats = require("../schemas/privateChatSchema");
const PrivateRecents = require("../schemas/privateRecentSchema");

const processPrivateMessage = async (io, socket, payload, clients) => {
  const token = payload.token;
  const { receiverId } = payload;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(user);
    const socket_id = clients[receiverId];
    clients[user._id] = socket.id;
    const val = await privateMessagePostController(
      payload.message,
      user._id,
      payload.receiverId
    );
    const message = val[1];
    const recent = val[0];
    if (socket_id) {
      io.to(socket_id).emit("receivePrivateMessage", {
        message:message,
        recent
      });
    }
    socket.emit("successPrivateMessage", {
      message:message,
      recent
    });
  } catch (err) {
    console.log(err);
    socket.emit("errorPrivateMessage", { error: err.message,err:1});
  }
};



const privateMessageGetController = async (req, res) => {
  const id = req.params.id;
  const user_id = req.user._id;
  try {
    console.log(id,user_id);
    const results = await PrivateChats.find({$or:[{sender:id,recipient:user_id},{sender:user_id,recipient:id}]}).exec();
    res.send({ message: "Success..", payload: results,err:0 });
  } catch (err) {
    console.log(err);
    res.send({ error: "Error in retreiving messages",err:1});
  }
};

const privateMessagePostController = async (message, user_id, id) => {
  try {
    console.log(user_id,id);
    let results = await PrivateChats({message,sender:user_id,recipient:id});
    results = await results.save();
    const a = id < user_id ? id : user_id;
    const b = id < user_id ? user_id : id;
    let results1 = await PrivateRecents.findOne({user1:a,user2:b})
    if (results1) {
      results1 = await results1.save();
    } else {
     results1 = PrivateRecents({user1:a,user2:b});
     results1 = await results1.save();
    }
    console.log(results1);
    results1 = await PrivateRecents.populate(results1,{path:"user1",select:"-password"})
    console.log(results1);
    results1 = await PrivateRecents.populate(results1,{path:"user2",select:"-password"})
    console.log(results1);
    if (results1){
      return [results1,results];
    } else {
      const error = new Error("Server Error!!");
      error.status(400);
      return error;
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  privateMessageGetController,
  privateMessagePostController,
  processPrivateMessage
};
