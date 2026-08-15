const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Your Discord Application ID
const DISCORD_CLIENT_ID = "1527464567188361226";

app.use(express.json());

// Serve GHOST BOT MAKER
app.use(express.static(__dirname));

// Generate Bot
app.post("/api/generate", (req, res) => {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
        return res.status(400).json({
            error: "Please describe your bot first."
        });
    }

    console.log("Generating bot:", prompt);

    res.json({
        success: true,
        name: "GHOST AI Bot",
        prompt: prompt,
        clientId: DISCORD_CLIENT_ID,
        message: "Bot project generated successfully."
    });
});

// Discord invite
app.get("/api/invite", (req, res) => {
    const inviteURL =
        "https://discord.com/oauth2/authorize" +
        "?client_id=" +
        DISCORD_CLIENT_ID +
        "&scope=bot%20applications.commands";

    res.json({
        url: inviteURL
    });
});

// Status
app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        service: "GHOST BOT MAKER"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `👻 GHOST BOT MAKER running on port ${PORT}`
    );
});
