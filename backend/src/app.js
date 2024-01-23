const express = require("express");
const http = require('http');
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server,{
    cors: {
      origin: "*"
    }
});


io.on('connection',(socket)=>{
     console.log("What is socket ",socket);
     socket.on("chat",(payload)=>{
        console.log("what is payload ",payload);
        io.emit("chat",payload);
     })
     socket.on("privateMessage",(payload)=>{
      console.log("Received a private message ",payload);
     })
});

server.listen(8000,()=>{
    console.log("Server started")
})



