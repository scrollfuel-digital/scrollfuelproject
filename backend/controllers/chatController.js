import { model } from "../config/gemini.js";

export const chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message required" });
        }

        const result = await model.generateContent(message);

        const response = result.response;
        const text = response.text();

        return res.json({ reply: text });

    } catch (err) {
        console.error("Gemini Error:", err);

        return res.status(500).json({
            error: "AI failed",
            details: err.message,
        });
    }
};
