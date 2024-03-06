const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Users = require("../schemas/userSchema");
const Groups = require("../schemas/groupSchema");
const GroupMembers = require("../schemas/groupMemSchema");
dotenv.config();

const isSignedIn = async (req, res, next) => {
  console.log(req.body)
  const token = req.headers.authorization.substr(7);
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = user;
      next();
    } else {
      res.send({ error: "Login Required!!",err:1 });
    }
  } catch (err) {
    res.send({ error: "Login again and try.." ,err:1});
  }
};
const userRegisterController = async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
     const user = await Users.findOne({gmail});
     if(user){
        res.status(200).send({message:"User already exists",err:0});
     }
     else {
        let user = Users({name,gmail,password});
        user = await user.save();
        res.status(200).send({user,message:"User created",err:0});
     }
  } catch (err) {
    res.status(200).send({error:err.message,err:1});
  }
};

const userLoginController = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const results = await Users.findOne({gmail});
    if (results) {
      const user = results;
      if (user.password === password) {
        user.password=undefined;
        const payload = {_id:user._id,name:user.name,gmail:user.gmail};
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.send({ message: "Login successfull!!" ,token,user,err:0});
      } else {
        res.status(200).send({ error: "Incorrect Credentials",err:1 });
      }
    } else {
      res.status(200).send({ error: "Incorrect Credentials",err:1 });
    }
  } catch (err) {
    res.send({error:err.message,err:1});
  }
};

const groupRegisterController = async (req, res) => {
  const { name, users } = req.body;
  try {
    let group = Groups({name});
    group = await group.save();
    const queryPromises = users.map(async (u) => {
      const gm =  GroupMembers({group:group._id,user:u})
      return await gm.save();
    });
    await Promise.all(queryPromises);
    console.log(queryPromises);
    res.status(200).send({ message: "Succesfully Group Created!!",err:0 });
  } catch (err) {
    res.send({ error: err.message,err:1 });
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  groupRegisterController,
  isSignedIn,
};
