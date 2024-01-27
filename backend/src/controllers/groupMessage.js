const db = require("../database/db");

const groupMessageGetController  = async (req,res)=>{
    const id = req.params.id;
    try {
    const [results,fields,err] = await  db.execute('SELECT * from GROUP_CHATS where group_id = ?)',[id]);
    res.send({messages:results});
    }
    catch(err){
    res.send({error:"Error in retreiving messages"});
    }
}

const groupMessagePostController = async (req,res) =>{
    const id = req.params.id;
    const user_id = req.user.id;
    try {
    const  [results] =  await db.execute('INSERT INTO GROUP_CHATS (message,sender_id,group_id) VALUES (?,?,?)',[req.body.message,user_id,id])
    if(results && results.affectedRows==1)res.send({message:"Succesfully sent!!"})
    else {res.send({error:"Error in sending"})}
    }
    catch(err){
        res.send({error:"Error in sending"})
    }
}




module.exports = {groupMessageGetController,groupMessagePostController};