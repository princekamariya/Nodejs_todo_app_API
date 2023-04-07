import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

// for adding .env inside our app inside config we need to give option as object and inside it we give path
config({
    path: "./data/config.env",
});

// using middlewares
// last time when we accepted data from form we used middleware express.urlencoded({ extended: true }) which is for form data access
// now we are sending json data in via body  for that we need to use middleware that:
app.use(express.json());
// NOTE: Make sure you use this express.json() above this routers here that is userRouter otherwise when we are using routers this express.json() will be not used. so might give error.
app.use(cookieParser());

// Using routes
// so how we using this all routes present inside routes/user.js into app.js : using app.use() and inside place userRouter which is name of your routes file
app.use("/api/v1/users", userRouter); // so all routes inside userRoutes inside api/v1/users will be already added. so that's advantage we can add prefix so we can remove that prefix from that routes it will automatically added by prefix
// this is standard practice for bulid api the api/v1 as prefix for all endpoints here v1 means version 1, basically api/v1 shows we are using api
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
    res.send("Nice Working");
});

//
// how can that handler know that that is error handler middleware so here first parameter is error then req,res,next is the parameter.
// so whenever from taks's any function or handler we call next() while passing an error then that fucntion execution will be stop and direct this error handler will be called.
app.use((err, req, res, next) => {
    return res.status(404).json({
        success: false,
        message: err.message,
    });
});
