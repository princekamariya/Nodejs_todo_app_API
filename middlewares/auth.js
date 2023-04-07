import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Not Logged In",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // we get user from findById cmd and we save that user into req.user command.
    req.user = await User.findById(decoded._id);

    next();
};
