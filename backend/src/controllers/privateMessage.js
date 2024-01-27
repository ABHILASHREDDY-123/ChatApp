const db = require("../database/db");

const privateMessageGetController  = async (req,res)=>{
    const id = req.params.id;
    const user_id = req.user.id;
    try {
    const [results,fields,err] = await  db.execute('SELECT * from PRIVATE_CHATS where (sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ?)',[user_id,id,id,user_id]);
    res.send({messages:results});
    }
    catch(err){
    res.send({error:"Error in retreiving messages"});
    }
}

const privateMessagePostController = async (req,res) =>{
    const id = req.params.id;
    const user_id = req.user.id;
    try {
    const  [results] =  await db.execute('INSERT INTO PRIVATE_CHATS (message,sender_id,receiver_id) VALUES (?,?,?)',[req.body.message,user_id,id])
    if(results && results.affectedRows==1)res.send({message:"Succesfully sent!!"})
    else {res.send({error:"Error in sending"})}
    }
    catch(err){
        res.send({error:"Error in sending"})
    }
}




module.exports = {privateMessageGetController,privateMessagePostController};