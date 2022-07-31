const jwt = require("jsonwebtoken");
const config = process.env;


const verifyToken =(req,res,next)=>{
    console.log('hhhh');
    let token = req.headers.authorization;
    if(!token){
        res.status(403).send("A token is required for authentication")
    }
    try {
        token = token.replace(/^Bearer\s+/,"");
        const decoded=jwt.verify(token,config.TOKEN_KEY);
        req.user=decoded
        
    } catch (error) {
        res.status(401).send("Invalid Token")
    }
    console.log("calling next");
    return next()
}

module.exports = verifyToken