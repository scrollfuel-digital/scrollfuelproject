

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conn() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "ScrollfuelWebsite"
        });

        console.log("✅ Connected DB:", mongoose.connection.name);

    } catch (err) {
        console.log("❌ Unable to connect with database!", err);
    }
}

conn();