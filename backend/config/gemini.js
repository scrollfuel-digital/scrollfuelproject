import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash",
});

console.log("KEY LOADED:", !!process.env.GEMINI_API_KEY);
