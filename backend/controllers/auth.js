const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(409).json({ success: false, message: "USER ALREADY EXIST login please" })
        }
        //image name save to profile
        const imagePath = req.file.filename
        //password hashing 
        const hashedPassword = await bcryptjs.hashSync(password, 11);
        //creating new user after hashing and saving image name
        const newUser = new User({
            username, email, password: hashedPassword, profile: imagePath, role
        })
        await newUser.save();

        return res.status(200).json({ success: true, message: "USER register successfully", user: newUser })

    } catch (err) {
        console.log('error  in api(register)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error" })
    }

}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all fields are required(from login controller)" })
        }
        const FindUser = await User.findOne({ email });
        if (!FindUser) {
            return res.status(401).json({ success: false, message: "No user found!! please Registerr" })
        }
        const ComparePassword = await bcryptjs.compare(password, FindUser.password);
        if (!ComparePassword) {
            return res.status(401).json({ success: false, message: "Invalid Password!!" })
        }
        const token = jwt.sign({ id:FindUser._id }, process.env.jwt_secret);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true, message: "Login succeeded  ", user: FindUser, token });
console.log('Login attempt:', user);
    } catch (err) {
        console.log('error  in api(login)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error(login)" })
    }
}


const Logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ success: true, message: "Logout succeeded  " });
    } catch (err) {
        console.log('error  in api(logout)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error(logout)" })
    }
}


module.exports = { Register, Login, Logout };