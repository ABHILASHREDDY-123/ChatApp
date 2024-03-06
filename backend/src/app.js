const express = require("express");
const http = require("http");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const privateMessageRouter = require("./routes/privateMessage");
const groupMessageRouter = require("./routes/groupMessage");
const authRouter = require("./routes/auth");
const { getUserData, searchUser } = require("./controllers/userController");
const { isSignedIn, groupRegisterController } = require("./controllers/authController");
const { processPrivateMessage } = require("./controllers/privateMessage");
const {processGroupMessage} = require("./controllers/groupMessage");
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;

dotenv.config();

var app = express();

mongoose.connect(DB_URL).then(() => {
  console.log("Database Connected...");
})
  .catch((err) => {
    console.log(err);
  })

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRouter);
app.use("/privatemessage", privateMessageRouter);
app.use("/groupmessage", groupMessageRouter);
app.get("/user/recents", isSignedIn, getUserData);
app.get("/search/:user", isSignedIn, searchUser);
app.post("/group/create", isSignedIn, groupRegisterController);


var server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

var connectedClients = {};

io.on("connection", (socket) => {
  const token = socket.handshake.query ? socket.handshake.query.token : null;
  try {
    const userDetails = jwt.verify(token, process.env.JWT_SECRET_KEY);
    connectedClients[userDetails._id] = socket.id;
    socket.on("privateMessage", (payload) => {
      processPrivateMessage(io, socket, payload, connectedClients);
    });
    socket.on("groupMessage",(payload)=>{
      processGroupMessage(io,socket,payload,connectedClients);
    })
  } catch (err) {
    socket.disconnect();
  }
});

server.listen(8000, () => {
  console.log("Server started");
});
