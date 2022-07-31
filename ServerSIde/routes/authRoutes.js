const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const { string } = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const chatData = require("../models/chatData");
const User= require("../models/user")
const { application } = require("express");
const upload = require("../middleware/multer")

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
// ===========================Router login============
// router.get("/login",async (req, res, next) => {
//   if (req.localStorage.userDetails) {
//  redirect("/")
//   }

// }
// )
//=====================================Register=====================================
router.post(
  "/register",

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
router.get("/test", auth, (req, res) => {
  res.send({ message: "Route is working fine" });
});
// ====================Creating the new channel=================
router.post("/new/channel",(req, res) => {
  const dbData = req.body;
  chatData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
// =======================getting all channel details======================
router.get("/get/channelList", (req, res) => {
  chatData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let channels = [];
      data.map((channelData) => {
        const channelInfo = {
          id: channelData._id,
          name: channelData.channelName,
        };
        channels.push(channelInfo);
      });
      console.log(channels);
      res.status(200).send(channels);
    }
  });
});

// ==================post new messages===============
router.post("/new/message?", (req, res) => {
  // console.log(req.query.id);
  // const newMessage=req.body
  
  console.log(req.body,"messages is here");
  chatData.findByIdAndUpdate(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

router.get("/get/data", (req, res) => {
  console.log("called");
  chatData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});


router.get("/get/conversation",(req,res)=>{
  const id=req.query.id
  console.log(id,"id is here");

  chatData.find({_id:id},(err,data)=>{
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  })
})
router.post("/addmydetails",auth,async(req,res)=>{
  
  console.log(req.query.mail,"qurry");
  console.log(req.body,"data is herekjhfbkl");



   const user=await User.findOneAndUpdate({mail:req.query.mail},{studentDetails:req.body},{new:true});
  
   res.status(200).send({
     user,
    message:"Details added Successfull"
 
});
  

})

router.get("/yourProfile/:id",async(req,res)=>{
  const student=await User.find({mail:req.params.id})
  res.status(200).json(student)

});

router.get("/dashboard/:id",async(req,res)=>{
  console.log(req.params.id,"jhgsdf");
  const student=await User.find({mail:req.params.id})
  console.log(student);
  res.status(200).json(student)
})



module.exports = router;
