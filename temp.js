const { LanguageServiceClient } = require("@google-cloud/language");
const functions = require("@google-cloud/functions-framework");

const tagTriviaQuestion = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(400)
      .send("No 'question' parameter found in the request body.");
  }

  try {
    const client = new LanguageServiceClient();
    ques =
      question +
      " " +
      question +
      " " +
      question +
      " " +
      question +
      " " +
      question;
    const document = {
      content: ques,
      type: "PLAIN_TEXT",
    };

    const [result] = await client.classifyText({ document });
    const categories = result.categories.map((category) => category.name);
    console.log(result);
    return res.status(200).json({ categories, ques });
  } catch (error) {
    console.error("Error analyzing trivia question:", error);
    return res.status(500).send("Error analyzing trivia question.");
  }
};

functions.http("tagTriviaQuestion", tagTriviaQuestion);
