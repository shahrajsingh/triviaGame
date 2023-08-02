import * as AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIA4FC4IJOYZDCRVJSL",
  secretAccessKey: "LL2l9YYTcNqZr5lTdIaCdwmB2kQ/RkMBSD26URNB",
  sessionToken: "FwoGZXIvYXdzEDsaDDgyssuQKdo2nB10IiK+AUIV6rju7CeZgHWiYBXOfKhpi1qH1TIWE7Zjb3BTek9r2ytWf3ufoIWuagUvH9DNZsHKunGF02eMH7z7xclgELO6j1gHXtCN0EOpxTqcmeV+kSzfbDM0yw9pgHHmgSpXs0uEJH0jDDVe0W7OB7fCXAGHX4D/PPvQ4ldhRlj2ZoZgLJ4bQRubzRwOtN5bFqknJ0jUelLmkwxXGJQ3N0jnfJNifcig3rmuozIpqioJTbfQHLP4f/41gwkqwsUPF/Uo/eCfpgYyLUjcZjS+Jq8cs/CU5zV/c+ICPayiTMQJ+cdCwpEqkHSBv6yFvwpZTb4bra6j4A=="
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const updateUserLoginStatus = async (userEmail, isLoggedIn) => {
  const params = {
    TableName: 'TriviaUsers',
    Key: {
      userEmail
    },
    UpdateExpression: 'set isLoggedIn = :value',
    ExpressionAttributeValues: {
      ':value': isLoggedIn
    },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const data = await dynamodb.update(params).promise();
    console.info('Login status updated', data);
  } catch (err) {
    console.error('Error', err);
  }
};

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
        'qa2fa': questionsAndAnswers,
        "isLoggedIn": false,
        "isAdmin": false
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