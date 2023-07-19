import React, { useState, useEffect } from "react";
import { Typography, Box, Container, ListItem, List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const changePage = useNavigate();

  const questionData = {
    questions: [
      {
        uuidKey: "00f2dee5-22ac-11ee-8a82-17fade5c179d",
        questionCategory: "space",
        questionLevel: "easy",
        correctAnswer: "NASA",
        options: ["ESA (European Space Agency)", "NASA", "Roscosmos", "SpaceX"],
        question:
          "Which space agency successfully landed the Curiosity rover on Mars?",
      },
      {
        uuidKey: "4dec1214-22ac-11ee-a9c5-97914c8638e9",
        questionCategory: "space",
        questionLevel: "easy",
        correctAnswer: "Sirius",
        options: ["Betelgeuse", "Polaris", "Proxima Centauri", "Sirius"],
        question: "What is the name of the brightest star in the night sky?",
      },
      {
        uuidKey: "5685f4e0-e5af-4ad6-a3f1-cf4640697509",
        questionCategory: "space",
        questionLevel: "easy",
        correctAnswer: "Indian Space Research Organisation",
        options: [
          "Indian Space Research Organisation",
          "Indonesian Space Research Organisation",
        ],
        question: "What is ISRO full form?",
      },
      {
        uuidKey: "6834e469-22ac-11ee-84bc-b1f0d689b241",
        questionCategory: "space",
        questionLevel: "easy",
        correctAnswer: "Hubble Space Telescope",
        options: [
          "Hubble Space Telescope",
          "James Webb Space Telescope",
          "Kepler Space Telescope",
          "Spitzer Space Telescope",
        ],
        question:
          "Which space telescope was launched by NASA in 1990 and has provided stunning images of deep space?",
      },
      {
        uuidKey: "891f9a58-3848-4172-9176-61ccd4b01cd2",
        questionCategory: "space",
        questionLevel: "easy",
        correctAnswer: "Apollo 11",
        options: ["Apollo 11", "Hubble Space Telescope", "kanna"],
        question: "Which spacecraft was the first to land humans on the Moon?",
      },
      {
        uuidKey: "dcd49ce4-22aa-11ee-83f3-85d89ddc815f",
        questionCategory: "space",
        questionLevel: "easy",
        correctAnswer: "Mars",
        options: ["Jupiter", "Mars", "Saturn", "Venus"],
        question: "Which planet is known as the 'Red Planet'?",
      },
      {
        uuidKey: "e78aa87b-22ab-11ee-ad2d-6f23f85538ca",
        questionCategory: "space",
        questionLevel: "easy",
        correctAnswer: "Titan",
        options: ["Europa", "Ganymede", "Io", "Titan"],
        question: "What is the name of the largest moon in our solar system?",
      },
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(5);
  const [isTimerComplete, setTimerComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [teamScore, setTeamScore] = useState(0);
  const [userRank, setUserRank] = useState(0);
  const [teamLeaderboard, setTeamLeaderboard] = useState([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(countdown);
      setTimerComplete(true);
      setTimeout(handleNextQuestion, 5000); // Move to next question after 5 seconds
    }

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    //Firstly show the team score
    axios
      .post(
        "https://us-central1-sdp-project-392915.cloudfunctions.net/function-2",
        {
          game_id: "12abcd",
          team_id: "34efgh",
        }
      )
      .then((response) => {
        setTeamScore(response.data.totalPoints);
      })
      .then(() => {
        axios
          .post(
            "https://us-central1-sdp-project-392915.cloudfunctions.net/function-3",
            {
              game_id: "12abcd",
              user_id: "margin",
            }
          )
          .then((response) => {
            setUserRank(response.data.rank);
          })
          .then(() => {
            axios
              .post(
                "https://us-central1-sdp-project-392915.cloudfunctions.net/function-4",
                {
                  game_id: "12abcd",
                }
              )
              .then((response) => {
                setTeamLeaderboard(response.data.teamLeaderboard);
              })
              .catch((error) => {
                console.error("Failed to fetch team leaderboard:", error);
              });
          })
          .catch((error) => {
            console.error("Failed to fetch team score:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to fetch team score:", error);
      });
  }, []);

  const handleOptionSelect = (option) => {
    if (!isTimerComplete) {
      setSelectedOption(option);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questionData.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    setSelectedOption("");
    setTimer(5);
    setTimerComplete(false);

    const scoreUpdate = isCorrect ? 10 : 0;
    setScore((prevScore) => prevScore + scoreUpdate);

    axios
      .post(
        "https://us-central1-sdp-project-392915.cloudfunctions.net/function-1",
        {
          game_id: "12abcd",
          team_id: "34efgh",
          user_id: "margin",
          points: scoreUpdate,
        }
      )
      .then(() => {
        console.log("Score updated successfully");
      })
      .then(() => {
        axios
          .post(
            "https://us-central1-sdp-project-392915.cloudfunctions.net/function-2",
            {
              game_id: "12abcd",
              team_id: "34efgh",
            }
          )
          .then((response) => {
            setTeamScore(response.data.totalPoints);
          })
          .then(() => {
            axios
              .post(
                "https://us-central1-sdp-project-392915.cloudfunctions.net/function-3",
                {
                  game_id: "12abcd",
                  user_id: "margin",
                }
              )
              .then((response) => {
                setUserRank(response.data.rank);
              })
              .then(() => {
                axios
                  .post(
                    "https://us-central1-sdp-project-392915.cloudfunctions.net/function-4",
                    {
                      game_id: "12abcd",
                    }
                  )
                  .then((response) => {
                    console.log(response.data.teamLeaderboard);
                    setTeamLeaderboard(response.data.teamLeaderboard);
                  })
                  .catch((error) => {
                    console.error("Failed to fetch team leaderboard:", error);
                  });
              })
              .catch((error) => {
                console.error("Failed to fetch team score:", error);
              });
          })
          .catch((error) => {
            console.error("Failed to fetch team score:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to update score:", error);
      });
    if (currentQuestionIndex === questionData.questions.length - 1) {
      // Redirect to home page if all questions are answered
      changePage("/");
      // Send score update to the server
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const currentQuestion = questionData.questions[currentQuestionIndex];

  return (
    <Box display="flex">
      <Container maxWidth="xs">
        <Box
          p={2}
          ml={2}
          bgcolor="#ffffff"
          boxShadow={3}
          borderRadius={8}
          mb={2}
        >
          <Typography variant="h6" align="center" color="#2196f3" gutterBottom>
            Team Score
          </Typography>
          <Box bgcolor="#2196f3" borderRadius={8} p={1} textAlign="center">
            <Typography variant="h6" color="#ffffff">
              {teamScore}
            </Typography>
          </Box>
        </Box>
        <Box p={2} ml={2} bgcolor="#ffffff" boxShadow={3} borderRadius={8}>
          <Typography variant="h6" align="center" color="#2196f3" gutterBottom>
            User Rank
          </Typography>
          <Box bgcolor="#2196f3" borderRadius={8} p={1} textAlign="center">
            <Typography variant="h6" color="#ffffff">
              {userRank}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="sm">
        <Box flexGrow={1} ml={2}>
          <Box p={2} bgcolor="#ffffff" boxShadow={3} borderRadius={8} mb={3}>
            <Typography variant="h6" align="right" color="#2196f3">
              Timer: {timer}
            </Typography>
            <Box mt={3}>
              <Typography variant="h5" align="center" color="#2196f3">
                {currentQuestion.question}
              </Typography>
              <Box mt={3}>
                <List>
                  {currentQuestion.options.map((option) => (
                    <ListItem
                      key={option}
                      button
                      disabled={isTimerComplete}
                      onClick={() => handleOptionSelect(option)}
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        mb: 2,
                        backgroundColor:
                          selectedOption === option ? "#2196f3" : "#ffffff",
                        color:
                          selectedOption === option ? "#ffffff" : "#000000",
                      }}
                    >
                      <Typography variant="body1">{option}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
          {isTimerComplete && (
            <Box p={2} bgcolor="#ffffff" boxShadow={3} borderRadius={8}>
              <Typography variant="h5" align="center" color="#2196f3">
                Correct Answer: {currentQuestion.correctAnswer}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
      <Container maxWidth="xs">
        <Box p={2} ml={2} bgcolor="#ffffff" boxShadow={3} borderRadius={8}>
          <Typography variant="h6" align="center" color="#2196f3" gutterBottom>
            Team Leaderboard
          </Typography>
          <List>
            {teamLeaderboard.map((team) => (
              <ListItem
                key={team.team_id}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 8,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box p={1}>
                  <Typography variant="body1">
                    Team ID: {team.team_id}
                  </Typography>
                </Box>
                <Box p={1} bgcolor="#2196f3" borderRadius={8}>
                  <Typography variant="body1" color="#ffffff">
                    Points: {team.points}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Quiz;
