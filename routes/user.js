import express from "express";
import {
    getAllUsers,
    getMyProfile,
    login,
    register,
} from "../controllers/user.js";

// after this we can do router.get() router.post() like this instead of app.get() app.post() etc. so basically we can use router instead of app
const router = express.Router();
// but why we do this we can export app and use here app.get() also reason is we can add prefix here in all routes there is prefix "/users" so we can add prefix

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/me", getMyProfile);

export default router;
