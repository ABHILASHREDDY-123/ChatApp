const express = require("express");
const { privateMessageGetController,privateMessagePostController } = require("../controllers/privateMessage");
const {isSignedIn} = require("../controllers/authController");
const privateMessageRouter = express.Router();
privateMessageRouter
.get("/:id",isSignedIn,privateMessageGetController)
.post("/:id",isSignedIn,privateMessagePostController)
// .delete("/:id/:msg_id/",privateMessageDeleteController)

module.exports = privateMessageRouter;

