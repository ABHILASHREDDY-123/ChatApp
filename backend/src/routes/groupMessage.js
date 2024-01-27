const express = require("express");
const { groupMessageGetController,groupMessagePostController } = require("../controllers/groupMessage");
const {isSignedIn} = require("../controllers/authController");
const groupMessageRouter = express.Router();
groupMessageRouter
.get("/:id",isSignedIn,groupMessageGetController)
.post("/:id",isSignedIn,groupMessagePostController)
// .delete("/:id/:msg_id/",groupMessageDeleteController)

module.exports = groupMessageRouter;

