import "../database/conn.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminModel from "../models/AdminModel.js";
import CareerModel from "../models/CareerModel.js";
import ContactModel from "../models/ContactModel.js";

/* SIGNUP CONTROLLER */
const Signup = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // 1. Validate fields
        if (!username || !email || !password) {
            return res.status(400).json({
                msg: "All fields are required (username, email, password)"
            });
        }

        // 2. Check if user already exists
        const existingUser = await AdminModel.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "Username or Email already exists"
            });
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user
        const user = new AdminModel({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // 5. Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // 6. Send response
        res.status(201).json({
            msg: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                msg: "Username or Email already exists"
            });
        }

        console.error("Signup Error:", error);

        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
};
/* LOGIN CONTROLLER */
const Login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // 1. Validate fields
        if (!email || !password) {
            return res.status(400).json({
                msg: "Email and password are required"
            });
        }

        // 2. Find user
        const user = await AdminModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid credentials"
            });
        }

        // 4. Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // 5. Send response
        res.json({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        console.error("Login Error:", error);

        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
};

// const googleSuccess = (req, res) => {
//     try {

//         if (!req.user) {
//             return res.redirect("http://localhost:5173/admin/auth");
//         }

//         // generate JWT token
//         const token = jwt.sign(
//             { id: req.user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         // redirect with token
//         res.redirect(`http://localhost:5173/admin/auth?token=${token}`);

//     } catch (error) {
//         console.log(error);
//         res.redirect("http://localhost:5173/admin/auth");
//     }
// };

const googleSuccess = (req, res) => {
    try {

        if (!req.user) {
            return res.redirect("http://localhost:5173/admin/auth");
        }

        const user = req.user;

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const userData = {
            username: user.displayName,
            email: user.email,
            photo: user.photo
        };

        const encodedUser = encodeURIComponent(JSON.stringify(userData));

        res.redirect(
            `http://localhost:5173/admin/auth?token=${token}&user=${encodedUser}`
        );

    } catch (error) {
        console.log(error);
        res.redirect("http://localhost:5173/admin/auth");
    }
};

const applyCareer = async (req, res) => {
    try {
        const { name, email, contact, address, interest } = req.body;

        const resumeUrl = req.file?.path;

        if (!resumeUrl) {
            return res.status(400).json({
                success: false,
                message: "Resume upload failed",
            });
        }

        const application = await CareerModel.create({
            name,
            email,
            contact,
            address,
            interest,
            resume: resumeUrl,
        });

        res.status(200).json({
            success: true,
            message: "Application submitted successfully",
            data: application,
        });

    } catch (error) {
        console.error("Server Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const ContactForm = async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // 1️⃣ Validate required fields
        if (!name || !email || !phone || !service || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 2️⃣ Create contact entry
        const newContact = await ContactModel.create({
            name,
            email,
            phone,
            service,
            message,
        });

        // 3️⃣ Success response
        res.status(201).json({
            success: true,
            message: "Consultation request submitted successfully",
            data: newContact,
        });

    } catch (error) {

        console.error("Contact Form Error:", error);

        // 4️⃣ Handle enum validation error
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        // 5️⃣ Handle other server errors
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getCareerApplications = async (req, res) => {
    try {
        const data = await CareerModel.find();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

const getContactMessages = async (req, res) => {
    try {
        const data = await ContactModel.find();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

export { Signup, Login, googleSuccess, applyCareer, ContactForm, getCareerApplications, getContactMessages };
