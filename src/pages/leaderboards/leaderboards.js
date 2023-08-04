import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import "./leaderboard.css";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { AppBar, Button, Toolbar } from "@mui/material";

// Mock data for players and teams
const mockPlayerData = [
  // Add player data here...
  { rank: 1, name: "John Doe", score: 2000, gamesPlayed: 20, winRate: 60 },
  { rank: 2, name: "Jane Doe", score: 1800, gamesPlayed: 18, winRate: 55 },
];

const mockTeamData = [
  // Add team data here...
  { rank: 1, name: "The Quizzards", score: 5000, gamesPlayed: 50, winRate: 70 },
  {
    rank: 2,
    name: "Trivia Masters",
    score: 4800,
    gamesPlayed: 45,
    winRate: 65,
  },
];

// Mock API response
const mockAPIResponse = {
  players: mockPlayerData,
  teams: mockTeamData,
};

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("all-time");
  const [playerRankings, setPlayerRankings] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const userDetails = {
    userFullName: window.localStorage.getItem("userFullName"),
    userName: window.localStorage.getItem("userName"),
    userEmail: window.localStorage.getItem("userEmail"),
  };

  useEffect(() => {
    // Simulating API call with mock response
    setPlayerRankings(mockAPIResponse.players);
    setTeamRankings(mockAPIResponse.teams);
  }, [timeFrame]);

  return (
    <div className="container">
      <Filter setTimeFrame={setTimeFrame} timeFrame={timeFrame} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "auto",
            height: "auto",
          },
        }}
      >
        <Paper>
          <Box sx={{ width: "60%", minWidth: "100%" }}>
            <RankingTable
              title="Player Leaderboard"
              rankings={playerRankings}
            />
            <RankingTable title="Team Leaderboard" rankings={teamRankings} />
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

const Filter = ({ setTimeFrame, timeFrame }) => {
  const handleFilterChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="leaderboard-toolbar">
          <Typography
            variant="h6"
            component="div"
            className="leaderboard-toolbar-header"
          >
            Leaderboard
          </Typography>
          <Button
            sx={{ marginRight: "12px", width: "96px" }}
            variant="contained"
            color="primary"
          >
            Player
          </Button>
          <Button
            sx={{ marginRight: "12px", width: "96px" }}
            variant="contained"
            color="primary"
          >
            Team
          </Button>
          <Select
            className="select-time-range"
            labelId="time-range-select"
            id="time-range-select-item"
            value={timeFrame}
            label="Time Range"
            onChange={handleFilterChange}
          >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"weekly"}>Weekly</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
            <MenuItem value={"all-time"}>All Time</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const RankingTable = ({ title, rankings }) => (
  <div className="leaderboard">
    <Typography variant="h4" className="header">
      {title}
    </Typography>
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
