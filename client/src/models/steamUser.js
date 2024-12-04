// src/models/steamUser.js
const mongoose = require('mongoose');

const steamUserSchema = new mongoose.Schema({
    steamId: { type: String, required: true, unique: true },
    achievements: { type: Array, default: [] },
});

const SteamUser = mongoose.model('SteamUser', steamUserSchema);

module.exports = SteamUser;
