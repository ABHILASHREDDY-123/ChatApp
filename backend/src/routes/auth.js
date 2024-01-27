const express = require("express");
const {userRegisterController,userLoginController,groupRegisterController} = require("../controllers/authController");

const authRouter = express.Router();
authRouter
.post("/register/user",userRegisterController)
.post("/login/user",userLoginController)
.post("/register/group",groupRegisterController)
// .delete("/:id/:msg_id/",privateMessageDeleteController)

module.exports = authRouter;

