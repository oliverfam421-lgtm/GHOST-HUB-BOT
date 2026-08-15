const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/generate", (req, res) => {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
        return res.status(400).json({
            error: "Please describe your bot first."
        });
    }

    console.log("Bot request:", prompt);

    res.json({
        success: true,
        name: "GHOST AI Bot",
        message: "Bot project generated successfully.",
        prompt
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        service: "GHOST BOT MAKER"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`GHOST BOT MAKER running on port ${PORT}`);
});
