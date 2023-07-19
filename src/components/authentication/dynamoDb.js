import * as AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAY3YHV26AOPZ7MOW4",
  secretAccessKey: "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"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const fetchDataFromDynamoDB = async (tableName)=>{
  const fetchDataPromise = new Promise((resolve,reject)=>{
    dynamodb.scan({TableName: tableName}, function(err,data){
      if(err){
        reject("error fetching Data");
      }else{
        resolve(data);
      }
    });
  });
  return fetchDataPromise;
};

export const storeDataInDynamoDB = async (userEmail,userName,userFullname, questionsAndAnswers) => {
  const qa2faPromise = new Promise((resolve,reject)=>{
    let params = {
      TableName: 'TriviaUsers',
      Item: {
        'userEmail': userEmail,
        'userName': userName,
        'userFullName': userFullname,
        'qa2fa': questionsAndAnswers
      }
    };
  
    dynamodb.put(params, function(err, data) {
        if (err) {
          console.error("Error", err);
          reject("Error while registering");
        } else {
          resolve("Success");
        }
      });
     
    });
    return qa2faPromise;
  }
  
  export const getDataFromDynamoDB = async (userId) => {
    let getParams = {
      TableName: 'TriviaUsers',
      Key: {
        'userEmail': userId
      }
    };
    
    const getDataPromise = new Promise((resolve,reject)=>{
      dynamodb.get(getParams, function(err, data) {
        if (err) {
          console.error("Error", err);
          reject("Error while fetching 2fa data");
        } else {
          resolve(data);
        }
      });
    });
    return getDataPromise;
   
  }