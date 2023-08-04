import React from "react";
import "./navbar.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GamepadIcon from "@mui/icons-material/Gamepad";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Signout from "../authentication/signout/signout";

const Navbar = () => {
  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: "rgba(27,118,210, 1)" }}
      >
        <Toolbar>
          <GamepadIcon sx={{ marginRight: "8px" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Trivia Titans
          </Typography>
          <a
            href="/create_team"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button
              color="inherit"
              aria-label="leaderboard"
              startIcon={<LeaderboardIcon />}
            >
              Teams
            </Button>
          </a>
          <a
            href="/leaderboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button
              color="inherit"
              aria-label="leaderboard"
              startIcon={<LeaderboardIcon />}
            >
              Leaderboard
            </Button>
          </a>
          <a href="/profile" style={{ color: "inherit" }}>
            <Button
              color="inherit"
              aria-label="profile"
              startIcon={<AccountCircle />}
            >
              Profile
            </Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
