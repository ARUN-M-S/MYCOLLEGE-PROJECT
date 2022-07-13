const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const postRegister = async (req, res) => {
  console.log("data in the backend");
 
    const { firstname,lastname,mail,password } = req.body;
    console.log(req.body,"body");
    //============================check if user exist=================
    const userExist = await User.exists({ mail: mail.toLowerCase() });
    if (userExist) {
       res.status(500).json({message:"E-mail Already in use"});
    }else{

    
    //======================Encrypt the password===================
    const encryptedPasseword = await bcrypt.hash(password, 10);
    //==========================create User document in the Database===================
    const user = await User.create({
      firstname,
      lastname,
      password: encryptedPasseword,
      mail: mail.toLowerCase(),
    });
    
    
    res.status(200).send({
        username: user.firstname,
        message:"Registration Successfull"
     
    });
  }
 
};

module.exports = postRegister;
