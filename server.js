const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the website
app.use(express.static(path.join(__dirname)));

// AI generation endpoint — temporary for now
app.post("/api/generate", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
        return res.status(400).json({
            error: "Please describe the bot you want to create."
        });
    }

    // AI connection will be added next.
    res.json({
        success: true,
        name: "GHOST AI Bot",
        prompt: prompt,
        message: "Bot request received."
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        service: "GHOST BOT MAKER"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`👻 GHOST BOT MAKER running on port ${PORT}`);
});
