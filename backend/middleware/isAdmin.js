const jwt = require('jsonwebtoken');
const User = require('../models/user');


const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unauthorised: No token provided(isAdmin)" });
    }
    const decoded_token = jwt.verify(token, process.env.jwt_secret);
    const findUser = await User.findById(decoded_token.id);
    if (!findUser) {
      return res.status(403).json({ message: "unauthorised: user not found" });
    }
    if (findUser.role != 'admin') {
      return res.status(403).json({ message: "unauthorised: user is not an Admin" });
     
    } next();
  } catch (err) {
    console.log('error  in isLogin route', err)
    return res.status(500).json({ success: false, message: "internal SERVER error(isAdmin)" })
  }
}


//middlewear for checking if user is logged in or not
const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unauthorised: user not login " });
    }
    const decoded_token = jwt.verify(token, process.env.jwt_secret);
    const findUser = await User.findById(decoded_token.id);
    if (!findUser) {
      return res.status(403).json({ success: false, message: "unauthorised: user not found(isLogin)" });
    }
    res.user = findUser;
    next();
  }
  catch (err) {
    console.log('error  in isLogin route', err)
    return res.status(500).json({ success: false, message: "internal SERVER error(islogin)" })
  }

}

module.exports = { isAdmin, isLogin };