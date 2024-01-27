const db = require("../database/db");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const isSignedIn = async (req,res,next) =>{
     const token = req.cookies["chat-app-token"];
     try{
        if(token){
             const user = jwt.verify(token,process.env.JWT_SECRET_KEY);
             req.user = user;
             next();
        }
        else {
            res.send({error:"Login Required!!"});
        }

     }
     catch(err){
        res.send({error:"Login again and try.."});
     }
}
const userRegisterController = async (req,res)=>{
    const {name,gmail,password} = req.body;
    try {
        const [results,err] = await db.execute('INSERT INTO USERS (name,gmail,password) VALUES (?,?,?)',[name,gmail,password]);
        if(results && results.affectedRows==1){res.send({message:"Succesfully Registered!!"})}
    }
    catch(err){
        res.send({error:err.message});
    }
}

const userLoginController = async (req,res) =>{
     const {gmail,password} = req.body;
     try {
          const [results,err] = await db.execute('SELECT * from USERS where gmail = ?',[gmail]);
          console.log(results)
          if(results.length){
                const user = results[0];
                if(user[3] == password){
                    const payload = {id:user[0],gmail};
                    const token  = jwt.sign(payload,process.env.JWT_SECRET_KEY);
                    console.log(token);
                    res.cookie('chat-app-token', token, { httpOnly: true });
                    res.send({message:"Login successfull!!"});
                }
                else {
                    res.send({error:"Incorrect Credentials"});
                }
          }
          else {
            res.send({error:"Incorrect Credentials"});
          }
     }
     catch(err){
             console.log(err);
     }
}

const groupRegisterController = async (req,res)=>{
    const {name,users} = req.body;
    try {
        const [result,err] = await db.execute('INSERT INTO GROUPS (name) VALUES (?)',[name]);
        const group_id = result.insertId;
        const queryPromises = users.map(async (u)=>{
             return  await db.execute('INSERT INTO GROUP_MEMBERS (member_id,group_id) VALUES (?,?)',[u,group_id]);
        });
        await Promise.all(queryPromises);
        res.send({message:"Succesfully Group Created!!"});
    }
    catch(err){
        res.send({error:err.message});
    }
      
}

module.exports = {userRegisterController,userLoginController,groupRegisterController,isSignedIn}