import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // if we want with register login will also happens automatically then we can send cookie
    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000, // this is same as expires
        })
        .json({
            success: true,
            message: message,
        });
};
