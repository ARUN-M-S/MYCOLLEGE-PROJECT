const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const { string } = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth")

const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(12).required(),
  lastname: Joi.string().min(3).max(12).required(),
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});
const loginSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

//=====================================Register=====================================
router.post("/register",

  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

//=====================================Login=====================================
router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);
// =================Test route for verify middleware===================
router.get("/test",auth,(req,res)=>{
  res.send("Route is working fine")

})

module.exports = router;
