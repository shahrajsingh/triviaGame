import {
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleOutlined, Edit } from "@mui/icons-material";

const EditQuiz = () => {
  const navigate = useNavigate();
  const { encodedQuizData } = useParams();
  const [allQuestions, setAllQuestions] = useState([]);

  const [quizData, setQuizData] = useState({
    quizNumber: "",
    quizCategory: "",
    quizLevel: "easy",
    quizExpiry: "",
    timeLimit: "",
  });

  useEffect(() => {
    try {
      const decodedQuizData = decodeURIComponent(encodedQuizData);
      const quiz = JSON.parse(decodedQuizData);
      setQuizData(quiz);
    } catch (error) {
      console.error("Error decoding quiz data:", error);
      navigate("/admin/quizhome");
    }
  }, [encodedQuizData, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://d8nbpcntna.execute-api.us-east-1.amazonaws.com/serverless/editquiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );

      if (response.ok) {
        navigate("/admin/home");
      } else {
        console.error("Failed to update quiz data:", response);
      }
    } catch (error) {
      console.error("Error updating quiz data:", error);
    }
  };

  const [newQuestion, setNewQuestion] = useState({
    quizNumber: "",
    questionCategory: "",
    questionLevel: "",
    correctAnswer: "",
    options: ["", "", "", ""],
    question: "",
  });

  const handleNewQuestionChange = (event) => {
    const { name, value } = event.target;

    const optionIndexRegex = /^options\[(\d+)\]$/;
    const match = name.match(optionIndexRegex);

    if (match) {
      const optionIndex = parseInt(match[1], 10);
      setNewQuestion((prevData) => ({
        ...prevData,
        options: prevData.options.map((option, index) =>
          index === optionIndex ? value : option
        ),
      }));
    } else {
      setNewQuestion((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(
        "https://d8nbpcntna.execute-api.us-east-1.amazonaws.com/serverless/getquestions",
        {
          quizNumber: quizData.quizNumber,
        }
      );

      if (response.data.body.questions) {
        setAllQuestions(response.data.body.questions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = async () => {
    setQuizData((prevData) => ({
      ...prevData,
      questions: [...(prevData.questions || []), newQuestion],
    }));

    setNewQuestion({
      quizNumber: "",
      questionCategory: "",
      questionLevel: "",
      correctAnswer: "",
      options: ["", "", "", ""],
      question: "",
    });

    try {
      const response = await axios.post(
        "https://d8nbpcntna.execute-api.us-east-1.amazonaws.com/serverless/addnewquestion",
        {
          quizNumber: quizData.quizNumber,
          questionCategory: newQuestion.questionCategory,
          questionLevel: newQuestion.questionLevel,
          correctAnswer: newQuestion.correctAnswer,
          options: newQuestion.options,
          question: newQuestion.question,
        }
      );

      if (response.status === 200) {
        fetchQuestions();
      } else {
        console.error("Failed to add the question:", response);
      }
    } catch (error) {
      console.error("Error adding the question:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizData.quizNumber]);

  const [editIndex, setEditIndex] = useState(-1);
  const [editedQuestions, setEditedQuestions] = useState([]);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedQuestions([...allQuestions]);
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;

    if (name.startsWith("options")) {
      const optionIndexRegex = /^options\[(\d+)\]$/;
      const match = name.match(optionIndexRegex);

      if (match) {
        const optionIndex = parseInt(match[1], 10);
        setEditedQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          const options = [...updatedQuestions[index].options];
          options[optionIndex] = value;
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            options: options,
          };
          return updatedQuestions;
        });
      }
    } else {
      setEditedQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          [name]: value,
        };
        return updatedQuestions;
      });
    }
  };

  const handleSaveQuestion = async (index) => {
    try {
      const response = await axios.put(
        "https://d8nbpcntna.execute-api.us-east-1.amazonaws.com/serverless/getquizquestions",
        editedQuestions[index]
      );
      console.log(response);
      if (response.status === 200) {
        setAllQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[index] = editedQuestions[index];
          return updatedQuestions;
        });
        setEditIndex(-1);
      } else {
        console.error("Failed to save question:", response);
      }
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };
  const getOptionLetter = (optionIndex) => {
    const optionLetters = ["A", "B", "C", "D"];
    return optionLetters[optionIndex] || "";
  };

  const handleEditQuestionInputChange = (event, index, optionIndex) => {
    const { name, value } = event.target;

    setEditedQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const options = [...updatedQuestions[index].options];
      options[optionIndex] = value;
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: options,
      };
      return updatedQuestions;
    });
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 8 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Edit Quiz
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quiz Number"
                name="quizNumber"
                value={quizData.quizNumber}
                onChange={handleChange}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quiz Category"
                name="quizCategory"
                value={quizData.quizCategory}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Quiz Level</InputLabel>
                <Select
                  name="quizLevel"
                  value={quizData.quizLevel}
                  onChange={handleChange}
                  label="Quiz Level"
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quiz Expiry"
                name="quizExpiry"
                type="datetime-local"
                value={quizData.quizExpiry}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Time Limit (in minutes)"
                name="timeLimit"
                type="number"
                value={quizData.timeLimit}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Update
          </Button>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Add Question
          </Typography>

          <TextField
            fullWidth
            label="Question Category"
            name="questionCategory"
            value={newQuestion.questionCategory}
            onChange={handleNewQuestionChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Question Level</InputLabel>
            <Select
              name="questionLevel"
              value={newQuestion.questionLevel}
              onChange={handleNewQuestionChange}
              label="Question Level"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Question"
            name="question"
            value={newQuestion.question}
            onChange={handleNewQuestionChange}
            variant="outlined"
            multiline
            rows={1}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Correct Answer"
            name="correctAnswer"
            value={newQuestion.correctAnswer}
            onChange={handleNewQuestionChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            {newQuestion.options.map((option, index) => (
              <Grid key={index} item xs={6}>
                <TextField
                  fullWidth
                  label={`Option ${index + 1}`}
                  name={`options[${index}]`}
                  value={option}
                  onChange={handleNewQuestionChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleAddQuestion}
            sx={{ mt: 3 }}
          >
            Add Question
          </Button>
        </Grid>
      </Grid>

      <Container
        maxWidth="lg"
        sx={{ mt: 4, p: 3, boxShadow: 2, borderRadius: 8 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              All Questions
            </Typography>
          </Grid>
          {allQuestions.map((question, index) => (
            <Grid item xs={12} key={index}>
              <Container
                maxWidth="sm"
                sx={{
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  backgroundColor: "#f9f9f9",
                }}
              >
                {editIndex === index ? (
                  <div>
                    <TextField
                      fullWidth
                      label="Question Category"
                      name="questionCategory"
                      value={editedQuestions[index].questionCategory}
                      onChange={(event) => handleQuestionChange(event, index)}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                      <InputLabel>Question Level</InputLabel>
                      <Select
                        name="questionLevel"
                        value={editedQuestions[index].questionLevel}
                        onChange={(event) => handleQuestionChange(event, index)}
                        label="Question Level"
                      >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Question"
                      name="question"
                      value={editedQuestions[index].question}
                      onChange={(event) => handleQuestionChange(event, index)}
                      variant="outlined"
                      multiline
                      rows={1}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Correct Answer"
                      name="correctAnswer"
                      value={editedQuestions[index].correctAnswer}
                      onChange={(event) => handleQuestionChange(event, index)}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                      {editedQuestions[index].options.map(
                        (option, optionIndex) => (
                          <Grid key={optionIndex} item xs={6}>
                            <TextField
                              fullWidth
                              label={`Option ${optionIndex + 1}`}
                              name={`editedQuestions[${index}].options[${optionIndex}]`}
                              value={option}
                              onChange={(event) =>
                                handleEditQuestionInputChange(
                                  event,
                                  index,
                                  optionIndex
                                )
                              }
                              variant="outlined"
                              sx={{ mb: 2 }}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveQuestion(index)}
                      sx={{ mt: 3 }}
                    >
                      Save Question
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {question.question}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      Options:
                    </Typography>

                    {question.options.map((option, optionIndex) => (
                      <Box
                        component="span"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          p: 1,
                          borderRadius: 4,
                          bgcolor:
                            question.correctAnswer === option
                              ? "#e0fde0"
                              : "#fff",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: "#3f51b5",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "bold",
                            mr: 1,
                          }}
                        >
                          {getOptionLetter(optionIndex)}
                        </Box>
                        {option} &nbsp;
                        {question.correctAnswer === option && (
                          <CheckCircleOutlined
                            sx={{
                              color: "green",
                              fontSize: 18,
                            }}
                          />
                        )}
                      </Box>
                    ))}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(index)}
                        startIcon={<Edit />}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          mt: 1,
                        }}
                      >
                        Edit Question
                      </Button>
                    </Box>
                  </div>
                )}
              </Container>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default EditQuiz;
