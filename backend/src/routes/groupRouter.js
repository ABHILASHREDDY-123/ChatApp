const express = require("express");
const {isSignedIn} = require("../controllers/authController");
const groupRouter = express.Router();
groupRouter
.put("/add",isSignedIn,groupAddController)
.put("/remove",isSignedIn,groupRemoveController)
// .delete("/:id/:msg_id/",groupMessageDeleteController)

module.exports = groupRouter;

