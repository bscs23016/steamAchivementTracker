import React, { useState } from 'react';

const SteamUserInput = ({ onSubmit }) => {
  const [steamId, setSteamId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (steamId.trim() === '') {
      alert('Please enter a valid Steam ID.');
      return;
    }
    onSubmit(steamId.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Steam ID"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
      />
      <button type="submit">Fetch Achievements</button>
    </form>
  );
};

export default SteamUserInput;
