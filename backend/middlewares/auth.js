const User = require("../models/user");
const jwt = require("jsonwebtoken");


const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
       return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];
    
    try{
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decode.id;

    console.log("This is in middleware: ", req.user);


    next();

    } catch(e){
        console.log(e);
        return res.status(403).json({message: "Forbidden"});
    }
}


module.exports = {
    authMiddleware
};