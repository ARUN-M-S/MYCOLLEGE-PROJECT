const user= require( "../models/user");

const jwt = require("jsonwebtoken")

const AdminCredentials={
    email:"admin123@gmail.com",
    password:"password"
}


  const postLogin = async(req,res)=>{
      const admin = await  req.body;
        console.log(admin,"call is here");
        if(admin.mail===AdminCredentials.email && admin.password === AdminCredentials.password){
            const token = jwt.sign(
                {
                  admin_id: process.env.ADMIN_SECRET,
                 
                },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "24h",
                }
              );
              return res.status(200).send({
                adminDetails: {
                  mail: AdminCredentials.email,
                  token: token,
                  message:"Successfully Logged in"
                },
              });
        }else{
            return res.status(400).send({message:"Invalid Credentials"})
        }
    }
// =====================Get all users from the database =============
     const getUsers = async (req,res,next) =>{
         console.log("call is in th ebackend get users");
        try {
            const users= await user.find();
            res.status(200).json(users)
        } catch (error) {
           next(err) 
        }
    }
    const deleteUser = async (req,res,next) =>{
        console.log("call is in th ebackend get users for delete");
        try {
        await user.findOneAndDelete(req.params.id);
            res.status(200).json({message:"user Is Deleted"})
        } catch (error) {
           next(err) 
        }
    }
    
    module.exports={getUsers,postLogin,deleteUser}