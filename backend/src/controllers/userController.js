const db = require("../database/db");

const searchUser = async (req, res) => {
  try {
    const name = req.params.user;
    const [results, err] = await db.execute(
      `SELECT id,name,gmail from USERS where name like '${name}%'`
    );
    const [results2, err2] = await db.execute(
      `SELECT id,name from GROUPS where name like '${name}%'`
    );
    res.send({ payload: [...results,...results2] });
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
  }
};

const getUserData = async (req, res) => {
  const user_id = req.user.id;
  const [results, err] = await db.execute(
    "SELECT * from RECENTS where person1=? or person2=?",
    [user_id, user_id]
  );
  const mp = new Map();
  let user_ids = results.map((r) => {
    if (r[1] == user_id) {
      mp[r[2]] = r[3];
      return r[2];
    } else {
      mp[r[1]] = r[3];
      return r[1];
    }
  });
  // if(user_ids.length===0){res.send({message:"Succesfully Got Users",payload:[]});}
  let query = "SELECT id,name from USERS where id in (  ";
  user_ids.map((e) => {
    query += e;
    query += ",";
  });
  query = query.substr(0, query.length - 1);
  query += ")";
  console.log(query);
  const [results1, err1] = await db.execute(query);
  const users = results1.map((row) => {
    return [row[0], row[1], mp[row[0]]];
  });
  console.log(users);
  res.send({ message: "Succesfully Got Users", payload: users });
};
module.exports = { getUserData, searchUser };
