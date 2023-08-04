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
import axios from "axios";

// Mock data for players and teams
const mockPlayerData = [
  // Add player data here...
  { rank: 1, name: "John Doe", score: 2000, gamesPlayed: 20, winRate: 60 },
  { rank: 2, name: "Jane Doe", score: 1800, gamesPlayed: 18, winRate: 55 },{ rank: 1, name: "John Doe", score: 2000, gamesPlayed: 20, winRate: 60 },
  { rank: 2, name: "Jane Doe", score: 1800, gamesPlayed: 18, winRate: 55 },{ rank: 1, name: "John Doe", score: 2000, gamesPlayed: 20, winRate: 60 },
  { rank: 2, name: "Jane Doe", score: 1800, gamesPlayed: 18, winRate: 55 },{ rank: 1, name: "John Doe", score: 2000, gamesPlayed: 20, winRate: 60 },
  { rank: 2, name: "Jane Doe", score: 1800, gamesPlayed: 18, winRate: 55 },{ rank: 1, name: "John Doe", score: 2000, gamesPlayed: 20, winRate: 60 },
  { rank: 2, name: "Jane Doe", score: 1800, gamesPlayed: 18, winRate: 55 },{ rank: 1, name: "John Doe", score: 2000, gamesPlayed: 20, winRate: 60 },
  
];

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("all-time");
  const [playerRankings, setPlayerRankings] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const [leaderboardType, setleaderboardType] = useState("player");
  const [detailedStatistics, setDetailedStatics] = useState(null);
  const [category, setCategory] = useState("");

  const userDetails = {
    userFullName: window.localStorage.getItem("userFullName"),
    userName: window.localStorage.getItem("userName"),
    userEmail: window.localStorage.getItem("userEmail"),
  };

  const getPlayerData = async(categ)=>{
    if(categ && categ !== ""){
      await axios.post("https://us-central1-sdp-project-392915.cloudfunctions.net/function-9", {category: categ}).then((res)=>{
        console.log(res);
        setPlayerRankings(res.data);
      }).catch((error)=>{
        console.error(error);
        //alert("error while fetching player leaderbaord");
      });
    }else{
      await axios.post("https://us-central1-sdp-project-392915.cloudfunctions.net/function-8", {}).then((res)=>{
        console.log(res);
        setPlayerRankings(res.data);
    }).catch((error)=>{
      console.error(error);
      //alert("error while fetching player leaderbaord");
    });
    }
  };

  const getTeamData = async (categ)=>{
    if(categ && categ !== ""){
      await axios.post("https://us-central1-sdp-project-392915.cloudfunctions.net/function-7", {category: categ}).then((res)=>{
        console.log(res);
        setPlayerRankings(res.data);
      }).catch((error)=>{
        console.error(error);
        //alert("error while fetching player leaderbaord");
      });
    }else{
      await axios.post("https://us-central1-sdp-project-392915.cloudfunctions.net/function-6", {}).then((res)=>{
        console.log(res);
        setPlayerRankings(res.data);
    }).catch((error)=>{
      console.error(error);
      //alert("error while fetching player leaderbaord");
    });
    }
  }

  useEffect(() => {
    // Simulating API call with mock response
    if(leaderboardType === "player"){
      getPlayerData(category);
    }else{
      getTeamData(category);
    }
   
  }, [leaderboardType, timeFrame,category]);

  return (
    <div className="container">
      <Filter
        setTimeFrame={setTimeFrame}
        timeFrame={timeFrame}
        setLeaderboard={setleaderboardType}
        leaderboardType={leaderboardType}
        category={category}
        setCategory={setCategory}
      />
      <Box
        sx={{
          display: "flex",
          
          height: "calc(100% - 64px)",
          "& > :not(style)": {
            m: 1,
            width: "auto",
          },
        }}
      >
        <Paper style={{ width: "70%",height: "99%", overflowY: "scroll" }}>
          <Box>
            {leaderboardType === "player" ? (
              <>
                <RankingTable
                  title="Player Leaderboard"
                  rankings={playerRankings}
                />
              </>
            ) : (
              <>
                <RankingTable
                  title="Team Leaderboard"
                  rankings={teamRankings}
                />
              </>
            )}
          </Box>
        </Paper>
        <Paper style={{flexGrow: 1, display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center"}}>
          {detailedStatistics ? (<>
          
          </>):(<>
            <Typography variant="h5">
              Please select a row form leaderboard to view details
            </Typography>
          </>)}

        </Paper>
      </Box>
    </div>
  );
};

const Filter = ({
  setTimeFrame,
  timeFrame,
  setLeaderboard,
  leaderboardType,
  setCategory,
  category
}) => {
  const handleFilterChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const handleCategoryChange = (e) =>{
    if(e.target.value === "any"){
      setCategory("");
    }else{
      setCategory(e.target.value);
    }
    
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
            variant={leaderboardType === "player" ? "contained" : "outlined"}
            color="primary"
            onClick={() => {
              setLeaderboard("player");
            }}
          >
            Player
          </Button>
          <Button
            onClick={() => {
              setLeaderboard("team");
            }}
            sx={{ marginRight: "12px", width: "96px" }}
            variant={leaderboardType === "team" ? "contained" : "outlined"}
            color="primary"
          >
            Team
          </Button>
          <Select
            className="select-cetagory"
            labelId="time-cetagory-select"
            id="time-category-item"
            value={category ? category:"any"}
            label="Select Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value={"any"}>Any Category</MenuItem>
            <MenuItem value={"geography"}>Geography</MenuItem>
            <MenuItem value={"science"}>Science</MenuItem>
          </Select>
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
  <div className="leaderboard-table-container" style={{position:"relative"}}>
    <Table stickyHeader style={{position: "fixed", maxWidth: "45.7%"}}>
    <TableHead>
          <TableRow>
            <TableCell className="leaderboard-table-cell">Rank</TableCell>
            <TableCell className="leaderboard-table-cell">{title.includes("Player") ?  'Player Name':'Team Name'}</TableCell>
            <TableCell className="leaderboard-table-cell">Score</TableCell>
            <TableCell className="leaderboard-table-cell">Games Played</TableCell>
            <TableCell className="leaderboard-table-cell">Win Rate</TableCell>
          </TableRow>
        </TableHead>
    </Table>
    <TableContainer >
      <Table style={{marginTop: "57px"}}>
        {(Array.isArray(rankings) && rankings.length <= 0) ? (<>
        <TableBody>
        <h4 style={{fontFamily: "sans-serif"}}>
          No Leaderboard data available yet
        </h4>
        </TableBody>
       
        </>):(<>
          <TableBody style={{overflowY: "scroll"}}>
          {rankings.map((row, i) => (
            <TableRow className="leaderboard-table-row" key={i} style={{cursor: "pointer"}}>
              <TableCell className="leaderboard-table-cell">{row.rank}</TableCell>
              <TableCell className="leaderboard-table-cell">{row.name}</TableCell>
              <TableCell className="leaderboard-table-cell">{row.score}</TableCell>
              <TableCell className="leaderboard-table-cell">{row.gamesPlayed}</TableCell>
              <TableCell className="leaderboard-table-cell">{row.winRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </>)}
       
      </Table>
    </TableContainer>
  </div>
);

export default Leaderboard;
