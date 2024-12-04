// src/routes/testRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Test route for Steam API (will show a missing key message until you add it)
router.get('/test-steam-api', async (req, res) => {
    const { STEAM_API_KEY } = process.env;

    if (!STEAM_API_KEY) {
        return res.status(400).json({
            message: 'Steam API Key is missing. Please add it to the .env file and restart the server.',
        });
    }

    const steamId = '76561198000000000';  // Placeholder Steam ID
    const appId = '440'; // Example App ID (Team Fortress 2)

    try {
        const response = await axios.get('https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/', {
            params: {
                key: STEAM_API_KEY,
                steamid: steamId,
                appid: appId,
            },
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching Steam API data', error: err.response?.data || err.message });
    }
});

module.exports = router;
