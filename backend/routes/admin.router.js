// login,view,upload
import express from "express";
import { googleSuccess, Login, Signup } from "../controllers/controller.js";
import passport from "passport";

let router = express.Router();
router.post("/signup", Signup)
router.post("/login", Login)
// Start Google Login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login",
    }),
    googleSuccess
);
export default router;