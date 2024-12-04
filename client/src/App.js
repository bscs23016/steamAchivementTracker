import './App.css';
import React, { useState } from 'react';
import SteamUserInput from './SteamUserInput'; // import your new component
import Achievements from './Achievements'; // import the Achievements component

const App = () => {
  const [steamId, setSteamId] = useState(null);

  // Handle the Steam ID submission from the user input form
  const handleSteamIdSubmit = (id) => {
    setSteamId(id);
  };

  return (
    <div>
      <h1>Steam Achievement Tracker</h1>
      
      {/* Component to input the Steam ID */}
      <SteamUserInput onSubmit={handleSteamIdSubmit} />
      
      {/* Conditionally display achievements if steamId is available */}
      {steamId && <Achievements steamId={steamId} />}
    </div>
  );
};

export default App;
