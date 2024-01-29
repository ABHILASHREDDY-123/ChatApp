const express = require("express");
const http = require('http');
var cookieParser = require("cookie-parser");
const {createDatabases} = require("./database/intialize");
const privateMessageRouter = require("./routes/privateMessage");
const groupMessageRouter = require("./routes/groupMessage");
const authRouter = require("./routes/auth");
const morgan = require("morgan");
const cors = require("cors");
const { getUserData } = require("./controllers/userController");
const {isSignedIn} = require("./controllers/authController");
const { processPrivateMessage } = require("./controllers/privateMessage");
var app = express();

createDatabases();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth",authRouter);
app.use("/privatemessage",privateMessageRouter);
app.use("/groupmessage",groupMessageRouter);
app.get("/user/recents",isSignedIn,getUserData)

var server = http.createServer(app);
const io = require('socket.io')(server,{
    cors: {
      origin: "*"
    }
});

var connectedClients = {}

io.on('connection',(socket)=>{
     
     socket.on("send_user_id",(payload)=>{
        connectedClients[payload.userId] = socket.id;
     })
     socket.on("privateMessage",(payload)=>{processPrivateMessage(io,socket,payload,connectedClients)})
});

server.listen(8000,()=>{
    console.log("Server started")
})



