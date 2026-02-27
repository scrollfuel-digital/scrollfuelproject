import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import adminRouter from "./routes/admin.router.js";
import generalRouter from "./routes/general.router.js";
import blogRouter from "./routes/blogRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


import "./config/passport.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON + Form Support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (allow frontend domain in production)
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        credentials: true,
    })
);

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//     "/uploads",
//     express.static(path.join(__dirname, "uploads"))
// );

app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/general", generalRouter);
app.use("/api/blog", blogRouter);


app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

app.listen(port, () => {
    console.log(
        `Server running on port ${port} | http://127.0.0.1:${port}`
    );
});