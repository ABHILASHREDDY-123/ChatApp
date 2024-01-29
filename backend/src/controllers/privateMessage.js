const db = require("../database/db");
const jwt = require("jsonwebtoken");


const processPrivateMessage = async (io,socket,payload,clients) =>{
      const token = payload.token;
      const {receiverId} = payload;
      try {
        const user = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const socket_id = clients[receiverId];
        clients[user.id] = socket.id;
        const insertId = await privateMessagePostController(payload.message,user.id,payload.receiverId);
        if(socket_id){
            io.to(socket_id).emit("receivePrivateMessage",{message:payload.message,senderId:user.id,insertId})
        }
       socket.emit("successPrivateMessage",{message:payload.message,insertId});
      }
      catch(err){
       socket.emit("errorPrivateMessage",{error:err.message})
      }

}

const privateMessageGetController  = async (req,res)=>{
    const id = req.params.id;
    const user_id = req.user.id;
    try {
    const [results,fields,err] = await  db.execute('SELECT * from PRIVATE_CHATS where (sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ?)',[user_id,id,id,user_id]);
    res.send({message:"Success..",payload:results});
    }
    catch(err){
    res.send({error:"Error in retreiving messages"});
    }
}

const privateMessagePostController = async (message,user_id,id) =>{

    try {
    const  [results] =  await db.execute('INSERT INTO PRIVATE_CHATS (message,sender_id,receiver_id) VALUES (?,?,?)',[message,user_id,id])
    const a = (id<user_id)?id:user_id;
    const insertId = results.insertId;
    const b = (id<user_id)?user_id:id;
    const currentTimestamp  = Date.now();
    const time = new Date(currentTimestamp).toISOString().slice(0, 19).replace('T', ' ');
    const [results1] = await db.execute('SELECT * from RECENTS where person1=? and person2=?',[a,b]);
    if(results1.length){
        const [results2] = await db.execute('UPDATE RECENTS SET time=? where person1=? and person2=?',[time,a,b]);
    }
    else {
        const [results2] = await db.execute('INSERT INTO RECENTS (person1,person2,time) VALUES (?,?,?)',[a,b,time]);
    }
    if(results && results.affectedRows==1){return insertId;}
    else {
        const error = new Error("Server Error!!");
        error.status(400);
        return error;
    }
    }
    catch(err){
       return err;
    }
}




module.exports = {privateMessageGetController,privateMessagePostController,processPrivateMessage};