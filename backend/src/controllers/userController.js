const db = require("../database/db");


const getUserData = async (req,res) =>{
    const user_id = req.user.id;
    const [results,err] = await db.execute('SELECT * from RECENTS where person1=? or person2=?',[user_id,user_id]);
    const mp = new Map();
    let user_ids = results.map((r)=>{
        if(r[1]==user_id){
            mp[r[2]]=r[3];
            return r[2];
        }
        else{
            mp[r[1]]=r[3];
            return r[1];
        }
    })
    user_ids = user_ids.join(', ')  
    const [results1,err1]  = await db.execute('SELECT id,name from USERS where id in (?)',[user_ids])
    const users = results1.map((row)=>{
            return [row[0],row[1],mp[row[0]]]
    })
    res.send({message:"Succesfully Got Users",payload:users});
}
module.exports = {getUserData};