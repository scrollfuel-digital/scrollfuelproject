// import express from "express";
// import passport from "passport";
// import { googleSuccess, Login, Signup } from "../controllers/controller.js";

// const router = express.Router();

// router.post("/signup", Signup);
// router.post("/login", Login);

// // Google Login
// router.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"],
//     })
// );

// // Google Callback
// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         session: false, // ✅ IMPORTANT
//         failureRedirect: `${process.env.CLIENT_URL}/admin/auth?error=auth_failed`,
//     }),
//     googleSuccess
// );

// export default router;


import express from "express";
import passport from "passport";
import { googleSuccess, Login, Signup } from "../controllers/controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);

// Google Login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/admin/auth?error=auth_failed`, // ✅ FIXED
    }),
    googleSuccess
);

export default router;