import jwt from "jsonwebtoken";
import AdminModel from "../models/AdminModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await AdminModel.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ msg: "Token is not valid" });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

export default authMiddleware;