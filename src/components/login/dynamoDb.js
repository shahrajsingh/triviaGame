const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAY3YHV26AOPZ7MOW4",
  secretAccessKey: "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"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const storeDataInDynamoDB = (userId, questionsAndAnswers) => {
    let params = {
      TableName: 'TriviaUsers',
      Item: {
        'UserId': userId,
        ...questionsAndAnswers
      }
    };
  
    dynamodb.put(params, function(err, data) {
      if (err) {
        console.error("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }
  
  // Function to retrieve data from DynamoDB
  const getDataFromDynamoDB = (userId) => {
    let getParams = {
      TableName: 'TriviaUsers',
      Key: {
        'UserId': userId
      }
    };
  
    dynamodb.get(getParams, function(err, data) {
      if (err) {
        console.error("Error", err);
      } else {
        console.log("Success", data.Item);
      }
    });
  }
  
  module.exports = {
    storeDataInDynamoDB,
    getDataFromDynamoDB
  };