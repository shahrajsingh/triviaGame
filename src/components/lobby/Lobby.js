import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, blue, teal, red, yellow, green } from "@mui/material/colors";
import { Visibility, HowToReg } from "@mui/icons-material";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: teal[500],
    },
  },
});

const difficultyColors = {
  easy: green[500],
  medium: yellow[500],
  hard: red[500],
};

const Lobby = () => {
  const [openQuiz, setOpenQuiz] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(0);

  const [quizData, setQuizData] = useState([]);
  const fetchQuizData = async () => {
    try {
      const response = await axios.get(
        "https://d8nbpcntna.execute-api.us-east-1.amazonaws.com/serverless/getquizquestions"
      );
      if (response.data && response.data.body) {
        console.log(response.data);
        setQuizData(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  // Fetch quiz data when the component mounts
  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleViewDetails = (quizNumber) => {
    setOpenQuiz(quizNumber === openQuiz ? null : quizNumber);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleTimeLimitChange = (event, newValue) => {
    setSelectedTimeLimit(newValue);
  };

  const convertToValidDate = (dateString) => {
    if (!dateString) return null;

    if (dateString.includes("T")) {
      const [datePart, timePart] = dateString.split("T");
      const [year, month, day] = datePart.split("-");
      const [hour, minute] = timePart.split(":");
      return new Date(year, month - 1, day, hour, minute);
    } else if (dateString.includes("/")) {
      const [datePart, timePart] = dateString.split(" ");
      const [day, month, year] = datePart.split("/");
      const [hour, minute] = timePart.split(":");
      return new Date(year, month - 1, day, hour, minute);
    } else {
      return null; // Invalid date format
    }
  };

  const filteredQuizzes = quizData.filter((quiz) => {
    const expiryDate = convertToValidDate(quiz.quizExpiry);
    const selectedTimeLimitInMinutes = selectedTimeLimit;
    const quizTimeLimitInMinutes = Number(quiz.timeLimit);
    return (
      (!selectedCategory || quiz.quizCategory === selectedCategory) &&
      (!selectedDifficulty || quiz.quizLevel === selectedDifficulty) &&
      (!selectedTimeLimit ||
        quizTimeLimitInMinutes <= selectedTimeLimitInMinutes) &&
      (expiryDate ? expiryDate > new Date() : false)
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            color: purple[600],
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "42px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Trivia Game Lobby
        </h1>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={12} md={4}>
            <InputLabel style={{ color: purple[600] }}>Category:</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{ width: "100%", marginTop: "8px" }}
            >
              <MenuItem value="">All</MenuItem>
              {quizData.map((quiz) => (
                <MenuItem key={quiz.quizCategory} value={quiz.quizCategory}>
                  {quiz.quizCategory}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel style={{ color: purple[600] }}>Difficulty:</InputLabel>
            <Select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              style={{ width: "100%", marginTop: "8px" }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel style={{ color: purple[600] }}>
              Max Time Limit (Minutes):
            </InputLabel>
            <Slider
              value={selectedTimeLimit}
              onChange={handleTimeLimitChange}
              min={0}
              max={30}
              step={2}
              valueLabelDisplay="auto"
              style={{ marginTop: "8px" }}
            />
          </Grid>
        </Grid>
        <TableContainer
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Table style={{ backgroundColor: "#ffffff" }}>
            <TableHead style={{ backgroundColor: teal[500], color: "#ffffff" }}>
              <TableRow>
                <TableCell
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Quiz Name
                </TableCell>
                <TableCell
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Difficulty
                </TableCell>
                <TableCell
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Time Limit
                </TableCell>
                <TableCell
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Expiry
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Action
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Join
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuizzes.map((quiz) => (
                <React.Fragment key={quiz.quizNumber}>
                  <TableRow
                    hover
                    onClick={() => handleViewDetails(quiz.quizNumber)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        quiz.quizLevel === "easy"
                          ? green[100]
                          : quiz.quizLevel === "medium"
                          ? yellow[100]
                          : red[100],
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: purple[600],
                      }}
                    >
                      {`Quiz ${quiz.quizName}`}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: blue[700],
                      }}
                    >
                      {quiz.quizCategory}
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          backgroundColor: difficultyColors[quiz.quizLevel],
                          padding: "4px 8px",
                          borderRadius: "4px",
                          color: "white",
                          fontWeight: "bold",
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                          fontSize: "14px",
                        }}
                      >
                        {quiz.quizLevel}
                      </span>
                    </TableCell>
                    <TableCell style={{ fontSize: "14px" }}>
                      {quiz.timeLimit} mins
                    </TableCell>
                    <TableCell style={{ fontSize: "14px" }}>
                      {quiz.quizExpiry}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Visibility />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(quiz.quizNumber);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<HowToReg />}
                        onClick={(e) => {
                          e.stopPropagation();
                          //join logic
                          console.log(`Joining quiz ${quiz.quizNumber}`);
                        }}
                      >
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    style={{
                      backgroundColor:
                        quiz.quizLevel === "easy"
                          ? green[100]
                          : quiz.quizLevel === "medium"
                          ? yellow[100]
                          : red[100],
                      display:
                        openQuiz === quiz.quizNumber ? "table-row" : "none",
                    }}
                  >
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse
                        in={openQuiz === quiz.quizNumber}
                        timeout="auto"
                        unmountOnExit
                        style={{
                          backgroundColor: "#f9f9f9",
                          border: `1px solid ${
                            quiz.quizLevel === "easy"
                              ? green[500]
                              : quiz.quizLevel === "medium"
                              ? yellow[500]
                              : red[500]
                          }`,
                          borderRadius: "4px",
                          marginTop: "10px",
                          padding: "8px",
                          color: purple[600],
                          fontSize: "14px",
                        }}
                      >
                        <div style={{ padding: "10px" }}>
                          <p>Number of Participants: {quiz.participants}</p>
                          <p>Time Remaining: {quiz.timeRemaining}</p>
                          <p>Description: {quiz.quizDescription}</p>
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default Lobby;
