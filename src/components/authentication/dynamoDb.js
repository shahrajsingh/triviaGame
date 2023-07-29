import * as AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIA4FC4IJOYUKLWPDEX",
  secretAccessKey: "tc0Nf9CAa8dZb8Iryu/VPC4zNpOUxgfNozHNpTLc",
  sessionToken: "FwoGZXIvYXdzEA4aDNks/qYv1wMoytp1PCK+AW9oxsr9qJsp6wds57GqAGl25I/ODqOOsYENYEzN820u/JOADLT5067lBrG/s3zgY3J2yyB+c5vJBzJRRdFaJr/AeIj4BaIRxQDm7JiFGYVAeHV3HNiCfWosQLz4y02yAOnZ3DKKs8E6tTQ7lAkEFfUW5EIMsDRz5Rq0S09Z9pql2CPCLnzWsjABLx1Imz467l5orITKuQJGibXzD5wx5vzS+IlHR77R/45UUTaAKHzt5imokA2GmMN72VMDJkUoiueVpgYyLbwFFUd/gkTKm+blfhE5uLleLLWPb/CuUkKimCv/rP7fpH0zI1jXC+km6rBoEw=="
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