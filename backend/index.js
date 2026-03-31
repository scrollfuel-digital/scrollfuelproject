import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

import adminRouter from "./routes/admin.router.js";
import generalRouter from "./routes/general.router.js";
import blogRouter from "./routes/blogRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import "./config/passport.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIXED CORS (NO "*")
app.use(
    cors({
        origin: process.env.CLIENT_URL, // MUST match frontend
        credentials: true,
    })
);

// ❌ REMOVE session completely
app.use(passport.initialize());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/general", generalRouter);
app.use("/api/blog", blogRouter);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});