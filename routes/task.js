import express from "express";
import {
    getMyTask,
    newTask,
    updateTask,
    deleteTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTask);

// dynamic route
router
    .route("/:id")
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask);

// router
//     .route("/:id")
//     .put(isAuthenticated, updateTask)
//     .delete(isAuthenticated, deleteTask,(req, res, next) => {
//         next();
//     });
// here after delete there is no function so here next() will accpet as parameter an error, so whenever we call next while passing error then our error middleware which we have created will be executed.
// so that error handler middleware we will create at the end of app.js


export default router;
