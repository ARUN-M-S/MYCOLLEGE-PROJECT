const express = require("express");
const router = express.Router();

 const {postLogin,getUsers,deleteUser,viewUser }= require("../controllers/adminControllers")
// const {  } = require("../controllers/adminControllers")

// const adminControllers = require ("../controllers/adminControllers/adminController")

//=====================================Login=====================================
router.get("/users",getUsers);

router.post("/login",postLogin);
router.delete("/users/:id",deleteUser);
router.get("/test/:id",viewUser)




module.exports = router;
