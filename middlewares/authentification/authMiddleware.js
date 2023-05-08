import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
const Auth= async(req,res,next) =>{
try {
const secretKey = process.env.secretkey;
const token = req.headers.authorization.split(" ")[1];

let decodedToken = jwt.verify(token, secretKey);
console.log(decodedToken);
const user = await User.findOne({ _id: decodedToken.userId }).select('-password');

req.user = user;
console.log(req.user);
next();

} catch(error){
    console.log("auth error", error);
    res.status(401).json({
      message: "authentication failed",
      error: error
    });
}


}
export default Auth;