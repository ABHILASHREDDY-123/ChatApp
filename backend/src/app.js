const express = require("express");
const http = require('http');
const cookieParser = require("cookie-parser");
const {createDatabases} = require("./database/intialize");
const privateMessageRouter = require("./routes/privateMessage");
const groupMessageRouter = require("./routes/groupMessage");
const authRouter = require("./routes/auth");
const app = express();

createDatabases();
app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRouter);
app.use("/privatemessage",privateMessageRouter);
app.use("/groupmessage",groupMessageRouter);

const server = http.createServer(app);
const io = require('socket.io')(server,{
    cors: {
      origin: "*"
    }
});


io.on('connection',(socket)=>{
     console.log("What is socket ","this is socket");
     socket.on("chat",(payload)=>{
        console.log("what is payload ");
        io.emit("chat","hello");
     })
     socket.on("privateMessage",(payload)=>{
      console.log("Received a private message ");
     })
});

server.listen(8000,()=>{
    console.log("Server started")
})



