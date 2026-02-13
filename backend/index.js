import express from "express";
import dotenv from "dotenv";
import path from "path";
import adminRouter from "./routes/admin.router.js";
import generalRouter from "./routes/general.router.js";
import blogRouter from "./routes/blogRoutes.js";
import cors from "cors"
import chatRoutes from "./routes/chatRoutes.js";
import "./config/passport.js";
import session from "express-session";
import passport from "passport";
import careerRoutes from "./routes/general.router.js";
import contactRoutes from "./routes/general.router.js"
dotenv.config()

let app = express();
let port = process.env.PORT || 3000

app.use(express.json())
app.use(cors());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", chatRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRouter)
app.use("/api/general", generalRouter)
app.use("/api/blog", blogRouter)
app.use("/api/career", careerRoutes);
app.use("/api", contactRoutes);
app.listen(port, () => {
    console.log(`Server is running on port:${port} || http://127.0.0.1:${port}`)
})



