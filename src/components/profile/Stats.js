import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  withStyles,
  Box,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    backgroundColor: theme.palette.background.default,
  },
}))(TableCell);

const Stats = () => {
  const id = "1";
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://q5e253f5damhrgpy5ylnorblo40exnlx.lambda-url.us-east-1.on.aws/",
        { id }
      )
      .then((response) => {
        setStatsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h5" align="center" gutterBottom>
          Stats
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Games Played</StyledTableCell>
            <StyledTableCell>Win/Loss Ratio</StyledTableCell>
            <StyledTableCell>Total Points</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={statsData.id}>
            <TableCell>{statsData.id}</TableCell>
            <TableCell>{statsData.games_played}</TableCell>
            <TableCell>
              {statsData.win} : {statsData.loss}
            </TableCell>
            <TableCell>{statsData.total_points}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default Stats;
