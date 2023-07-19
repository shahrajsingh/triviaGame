import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './TeamStats.module.css';

const TeamStatistics = () => {
  const [teamStats, setTeamStats] = useState([]);

  useEffect(() => {
    // Fetch team statistics from an API endpoint
    const fetchTeamStats = async () => {
      try {
        const teamdata = [{
            teamName: "New Zebra",
            gamesPlayed: 15,
            wins: 12,
            losses: 5,
            points: 120
        }]
        //const response = await axios.get('/api/team-statistics');
        //setTeamStats(response.data);
        setTeamStats(teamdata);
        console.log(teamdata);
        console.log(teamStats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamStats();
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Team Statistics</h2>
      <div className={classes.teamList}>
        {teamStats.map((team) => (
          <div key={team.id} className={classes.teamItem}>
            <div className={classes.teamName}>{team.teamName}</div>
            <div className={classes.teamStat}>Games Played: {team.gamesPlayed}</div>
            <div className={classes.teamStat}>Wins: {team.wins}</div>
            <div className={classes.teamStat}>Losses: {team.losses}</div>
            <div className={classes.teamStat}>Points: {team.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamStatistics;
