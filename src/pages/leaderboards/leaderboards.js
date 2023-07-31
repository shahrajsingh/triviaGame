import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import './leaderboard.css';

// Mock data for players and teams
const mockPlayerData = [
  // Add player data here...
  { rank: 1, name: 'John Doe', score: 2000, gamesPlayed: 20, winRate: 60 },
  { rank: 2, name: 'Jane Doe', score: 1800, gamesPlayed: 18, winRate: 55 },

];

const mockTeamData = [
  // Add team data here...
  { rank: 1, name: 'The Quizzards', score: 5000, gamesPlayed: 50, winRate: 70 },
  { rank: 2, name: 'Trivia Masters', score: 4800, gamesPlayed: 45, winRate: 65 },
];

// Mock API response
const mockAPIResponse = {
  players: mockPlayerData,
  teams: mockTeamData,
};

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState('all-time');
  const [playerRankings, setPlayerRankings] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const userDetails = {
    userFullName: window.localStorage.getItem("userFullName"),
    userName: window.localStorage.getItem("userName"),
    userEmail: window.localStorage.getItem("userEmail")
  }

  useEffect(() => {
    // Simulating API call with mock response
    setPlayerRankings(mockAPIResponse.players);
    setTeamRankings(mockAPIResponse.teams);
  }, [timeFrame]);

  return (
    <div className="container">
      <Typography variant="h3" className="header">Welcome, {userDetails.userFullName}</Typography>
      <Filter setTimeFrame={setTimeFrame} timeFrame={timeFrame} />
      <RankingTable title="Player Leaderboard" rankings={playerRankings} />
      <RankingTable title="Team Leaderboard" rankings={teamRankings} />
    </div>
  );
};

const Filter = ({ setTimeFrame, timeFrame }) => {
  const handleFilterChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div>
      <Typography variant="h5" className="header">Filter Leaderboards</Typography>
      <Select className="select" value={timeFrame} onChange={handleFilterChange}>
        <MenuItem value="daily">Daily</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="all-time">All Time</MenuItem>
      </Select>
    </div>
  );
};

const RankingTable = ({ title, rankings }) => (
  <div className="leaderboard">
    <Typography variant="h4" className="header">{title}</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Games Played</TableCell>
            <TableCell>Win Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankings.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.gamesPlayed}</TableCell>
              <TableCell>{row.winRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default Leaderboard;
