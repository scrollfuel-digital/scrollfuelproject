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

const googleSuccess = (req, res) => {
    try {
        if (!req.user) {
            return res.redirect("http://localhost:5173/login");
        }

        // Later you can generate JWT here

        res.redirect("http://localhost:5173/dashboard");
    } catch (error) {
        console.log(error);
        res.redirect("http://localhost:5173/login");
    }
};
// form controller 
const applyCareer = async (req, res) => {
    try {
        const { name, email, contact, address, interest } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Resume is required" });
        }

        const newApplication = new CareerModel({
            name,
            email,
            contact,
            address,
            interest,
            resume: req.file.path,
        });

        await newApplication.save();

        res.status(201).json({
            message: "Application submitted successfully",
            data: newApplication,
        });

    } catch (error) {

        // DUPLICATE EMAIL HANDLING
        if (error.code === 11000) {
            return res.status(400).json({
                error: "You have already applied with this email"
            });
        }

        res.status(500).json({ error: error.message });
    }
};

const ContactForm = async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        if (!name || !email || !phone || !service || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new ContactModel({
            name,
            email,
            phone,
            service,
            message,
        });

        await newContact.save();

        res.status(201).json({
            message: "Consultation request submitted successfully 🚀",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
