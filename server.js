const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Ensure dotenv is loaded
const axios = require('axios');  // Import Axios for HTTP requests
const cors = require('cors');  // Import cors to handle CORS issues
const testRoutes = require('./client/src/routes/testRoutes');  // Import the test routes for Steam API
const SteamUser = require('./client/src/models/steamUser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to handle CORS
app.use(cors());  // Enable CORS for all routes

// Middleware to parse incoming JSON data
app.use(express.json());  // For parsing application/json

// Use test routes for Steam API (mounted under /api)
app.use('/api', testRoutes);

// Simple test route
app.get('/test', (req, res) => {
  res.json({ status: 1, message: 'Connected to the test route' });
});

// Fetch Achievements from Steam API
app.get('/getAchievements/:steamId', async (req, res) => {
  const steamId = req.params.steamId;
  const apiKey = process.env.STEAM_API_KEY;
  const appId = '440';

  try {
    // Check if the user is already in the database
    let user = await SteamUser.findOne({ steamId });
    if (user) {
      console.log(`Achievements for Steam ID ${steamId} found in DB.`);
      return res.json({
        status: 1,
        message: 'Achievements fetched successfully from DB',
        data: user.achievements,
      });
    }

    // If not in the database, fetch from Steam API
    const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${apiKey}&steamid=${steamId}&appid=${appId}`;
    const response = await axios.get(url);

    if (response.data && response.data.playerstats) {
      const achievements = response.data.playerstats.achievements;

      // Save to the database
      user = new SteamUser({ steamId, achievements });
      await user.save();

      return res.json({
        status: 1,
        message: 'Achievements fetched successfully from Steam API',
        data: achievements,
      });
    }

    res.status(404).json({
      status: 0,
      message: 'No achievements found for this user',
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ status: 0, message: 'Error fetching achievements' });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
