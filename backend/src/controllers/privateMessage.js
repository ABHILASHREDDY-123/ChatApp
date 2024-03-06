const jwt = require("jsonwebtoken");
const PrivateChats = require("../schemas/privateChatSchema");
const PrivateRecents = require("../schemas/privateRecentSchema");
const mediaController = require("./mediaController");

const processPrivateMessage = async (io, socket, payload, clients) => {
  const token = payload.token;
  const { receiverId } = payload;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(user);
    const image = payload.image;
    let url = "";
    if (image) {
      url = await mediaController(image, payload.originalfilename);
    }
    const socket_id = clients[receiverId];
    clients[user._id] = socket.id;
    const val = await privateMessagePostController(
      payload.message,
      user._id,
      payload.receiverId,
      url
    );
    const message = val[1];
    const recent = val[0];
    if (socket_id) {
      io.to(socket_id).emit("receivePrivateMessage", {
        message: message,
        recent
      });
    }
    socket.emit("successPrivateMessage", {
      message: message,
      recent
    });
  } catch (err) {
    console.log(err);
    socket.emit("errorPrivateMessage", { error: err.message, err: 1 });
  }
};



const privateMessageGetController = async (req, res) => {
  const id = req.params.id;
  const user_id = req.user._id;
  try {
    console.log(id, user_id);
    const results = await PrivateChats.find({ $or: [{ sender: id, recipient: user_id }, { sender: user_id, recipient: id }] }).exec();
    res.send({ message: "Success..", payload: results, err: 0 });
  } catch (err) {
    console.log(err);
    res.send({ error: "Error in retreiving messages", err: 1 });
  }
};

const privateMessagePostController = async (message, user_id, id, url) => {
  try {
    console.log(user_id, id);
    let results = await PrivateChats({ message, sender: user_id, recipient: id, media: url ? url : undefined });
    results = await results.save();
    console.log(results);
    const a = id < user_id ? id : user_id;
    const b = id < user_id ? user_id : id;
    let results1 = await PrivateRecents.findOne({ user1: a, user2: b })
    if (results1) {
      results1 = await results1.save();
    } else {
      results1 = PrivateRecents({ user1: a, user2: b });
      results1 = await results1.save();
    }
    results1 = await PrivateRecents.populate(results1, { path: "user1", select: "-password" })
    results1 = await PrivateRecents.populate(results1, { path: "user2", select: "-password" })
    if (results1) {
      return [results1, results];
    } else {
      const error = new Error("Server Error!!");
      error.status(400);
      return error;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  privateMessageGetController,
  privateMessagePostController,
  processPrivateMessage
};
