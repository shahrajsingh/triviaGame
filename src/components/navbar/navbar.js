import React from "react";
import "./navbar.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GamepadIcon from "@mui/icons-material/Gamepad";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import { useAuth } from "../authentication/authContext";
import { updateUserLoginStatus } from "../authentication/dynamoDb";
import { auth } from "../authentication/firebase";
import { signOut } from "firebase/auth";
import { Group } from "@mui/icons-material";
import QuizIcon from "@mui/icons-material/Quiz";
import AnalyticsIcon from "@mui/icons-material/Analytics";
const onLogout = async () => {
  await signOut(auth)
    .then((res) => {
      updateUserLoginStatus(window.localStorage.getItem("userEmail"), false);
      localStorage.clear();
    })
    .catch((error) => {
      console.error(error);
      alert("error while logging out");
    });
};

const Navbar = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { setIsAuthenticated } = useAuth();
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
          {isAdmin && (
            <div>
              <a
                href="/admin/home"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button
                  color="inherit"
                  aria-label="All Quiz"
                  startIcon={<QuizIcon />}
                >
                  Quizzes
                </Button>
              </a>
              <a
                href="/admin/home"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button
                  color="inherit"
                  aria-label="Analytics"
                  startIcon={<AnalyticsIcon />}
                >
                  Analytics
                </Button>
              </a>
            </div>
          )}
          {!isAdmin && (
            <div>
              <a
                href="/create_team"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button
                  color="inherit"
                  aria-label="leaderboard"
                  startIcon={<Group />}
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
            </div>
          )}

          <Button
            color="error"
            variant="contained"
            className="logout-button"
            onClick={() => {
              onLogout();
              setIsAuthenticated(false);
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
