import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
export const getAllUsers = async (req, res) => {};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exist",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    });

    // inside login also this token code will be there so repetation of code happes to we store this code inside somewhere and direct use it so in utils folder's features.js file we stored this.
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //    // if we want with register login will also happens automatically then we can send cookie
    // res.status(201)
    //     .cookie("token", token, {
    //         httpOnly: true,
    //         maxAge: 15 * 60 * 1000, // this is same as expires
    //     })
    //     .json({
    //         success: true,
    //         message: "Registered Successfully",
    //     });

    sendCookie(user, res, "Registered Successfully", 201);
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    // inside schema of user.js in model folder we specify select: false in password, so whenever we get user's data here password will be not then we need to add it manually that's why .select(+password) written so prev whichever data we got plus password also we need inside user , if we write .select(password) then only password will be there in user

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }

    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
};

export const getMyProfile = async (req, res) => {
    // so user get their profile using user id which we can access from token because we have given id inside token already
    const { token } = req.cookies;
    console.log(token);

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Not Logged In",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    res.status(200).json({
        success: true,
        user,
    });
};
