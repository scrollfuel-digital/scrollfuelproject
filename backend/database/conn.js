import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

async function conn() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection with Database was successfully !");
    } catch (err) {
        console.log("unable to connect with database !", err)
    }
}
conn()