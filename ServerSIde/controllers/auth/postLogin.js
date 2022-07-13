const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
 
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Send a new Token
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          username: user.firstname,
          token: token,
          message:"Successfully Logged in"
        },
      });
    } else if (!user) {
      return res.status(400).send({message:"Invalid Mail. Please Enter correct mail"});
    }
    return res.status(400).send( {message:"Invalid Credentials Please Try again"});
  }

module.exports = postLogin;
