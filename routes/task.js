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

export default router;
