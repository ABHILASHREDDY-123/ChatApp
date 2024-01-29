const db = require("./db");
const errorHandler = require("../errors/error");
const {
  CREATE_USER_TABLE,
  CREATE_GROUP_MEMBERS,
  CREATE_GROUP_TABLE,
  CREATE_GROUP_CHAT_TABLE,
  CREATE_PRIVATE_CHAT_TABLE,
  CREATE_RECENT_TABLE,
} = require("./createTables");


const createDatabases = async () => {
  const [results1, err1] = await db.execute(CREATE_USER_TABLE);
  const [results2, err2] = await db.execute(CREATE_GROUP_TABLE);
  const [results3, err3] = await db.execute(CREATE_GROUP_MEMBERS);
  const [results4, err4] = await db.execute(CREATE_GROUP_CHAT_TABLE);
  const [results5, err5] = await db.execute(CREATE_PRIVATE_CHAT_TABLE);
  const [results6,err6] = await db.execute(CREATE_RECENT_TABLE);
};

module.exports = { createDatabases };
