import { Grid } from "@mui/material";
import React from "react";
import Profile from "./Profile";

const ProfileHome = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Profile />
      </Grid>
      <Grid item style={{ marginLeft: "15rem", marginRight: "15rem" }}></Grid>
      <Grid item>
        <Grid container justify="center">
          <Grid
            item
            style={{
              marginLeft: "15rem",
              marginRight: "15rem",
              marginTop: "3%",
            }}
          ></Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center">
          <Grid
            item
            style={{
              marginLeft: "15rem",
              marginRight: "15rem",
              marginTop: "3%",
            }}
          ></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileHome;
