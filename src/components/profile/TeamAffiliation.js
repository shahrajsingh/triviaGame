import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  withStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import axios from "axios";

const StyledButton = withStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
  },
}))(Button);

const TeamAffiliation = () => {
  const [teamIds, setTeamIds] = useState([]);
  const user = "3";

  useEffect(() => {
    const fetchTeamIds = async () => {
      try {
        const response = await axios.post(
          "https://s7fiay3dfvembjxn4awn7c5bm40rvxtc.lambda-url.us-east-1.on.aws",
          { id: user }
        );
        const teamIds = response.data;
        console.log(teamIds);
        setTeamIds(teamIds);
      } catch (error) {
        console.error("Error while fetching team IDs:", error);
      }
    };

    fetchTeamIds();
  }, []);

  const handleManageClick = (teamId) => {
    // Logic to handle the "Manage Team" button click
    // You can navigate to a new page or perform any other action here based on the teamId
    console.log(`Manage Team clicked for teamId: ${teamId}`);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Typography variant="h5">Team's</Typography>
      </Grid>
      <Grid item xs={6} container>
        <Typography variant="h5">Manage Teams</Typography>
      </Grid>
      <Grid item xs={9}>
        <List>
          {teamIds.map((team) => (
            <ListItem key={team.teamId}>
              <ListItemText primary={team.teamId} />
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => handleManageClick(team.teamId)}
              >
                Manage
              </StyledButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default TeamAffiliation;
