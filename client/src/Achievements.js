import React, { useState, useEffect } from 'react';

const Achievements = ({ steamId }) => {
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (steamId) {
      setLoading(true);
      fetch(`http://localhost:5000/getAchievements/${steamId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 1) {
            setAchievements(data.data);
          } else {
            setError(data.message);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching achievements.');
          setLoading(false);
        });
    }
  }, [steamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Achievements for Steam User {steamId}</h2>
      <h3>Unlocked Achievements</h3>
      <ul>
        {achievements
          .filter((ach) => ach.achieved)
          .map((achievement, index) => (
            <li key={index}>
              {achievement.name} - {achievement.description}
            </li>
          ))}
      </ul>
      <h3>Locked Achievements</h3>
      <ul>
        {achievements
          .filter((ach) => !ach.achieved)
          .map((achievement, index) => (
            <li key={index}>
              {achievement.name} - {achievement.description}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Achievements;
