import * as AWS from "aws-sdk";
import axios from "axios";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIA4FC4IJOYZDCRVJSL",
  secretAccessKey: "LL2l9YYTcNqZr5lTdIaCdwmB2kQ/RkMBSD26URNB",
  sessionToken:
    "FwoGZXIvYXdzEDsaDDgyssuQKdo2nB10IiK+AUIV6rju7CeZgHWiYBXOfKhpi1qH1TIWE7Zjb3BTek9r2ytWf3ufoIWuagUvH9DNZsHKunGF02eMH7z7xclgELO6j1gHXtCN0EOpxTqcmeV+kSzfbDM0yw9pgHHmgSpXs0uEJH0jDDVe0W7OB7fCXAGHX4D/PPvQ4ldhRlj2ZoZgLJ4bQRubzRwOtN5bFqknJ0jUelLmkwxXGJQ3N0jnfJNifcig3rmuozIpqioJTbfQHLP4f/41gwkqwsUPF/Uo/eCfpgYyLUjcZjS+Jq8cs/CU5zV/c+ICPayiTMQJ+cdCwpEqkHSBv6yFvwpZTb4bra6j4A==",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const updateUserLoginStatus = async (userEmail, isLoggedIn) => {
  await axios
    .post(
      "https://fpdodavmf6.execute-api.us-east-1.amazonaws.com/prod/updateuserstatus",
      {
        userEmail: userEmail,
        isLoggedIn: isLoggedIn,
      }
    )
    .then((res) => {
      console.info(res.body);
    })
    .catch((error) => {
      console.error(error);
      alert("error while setting user status");
    });
};

export const fetchDataFromDynamoDB = async (tableName) => {
  const fetchDataPromise = new Promise((resolve, reject) => {
    dynamodb.scan({ TableName: tableName }, function (err, data) {
      if (err) {
        reject("error fetching Data");
      } else {
        resolve(data);
      }
    });
  });
  return await fetchDataPromise;
};

export const storeDataInDynamoDB = async (
  userEmail,
  userName,
  userFullname,
  questionsAndAnswers
) => {
  const qa2faPromise = new Promise((resolve, reject) => {
    let params = {
      userEmail: userEmail,
      userName: userName,
      userFullName: userFullname,
      qa2fa: questionsAndAnswers,
      isLoggedIn: false,
      isAdmin: false,
    };
    axios
      .post(
        "https://fpdodavmf6.execute-api.us-east-1.amazonaws.com/prod/store2fadata",
        params
      )
      .then((res) => {
        if(res.data === "Success"){
          resolve("Success");
        }else{
          reject("error while creating user");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("error while creating userId");
      });
  });
  return await qa2faPromise;
};

export const getDataFromDynamoDB = async (userId) => {
  const getDataPromise = new Promise((resolve, reject) => {
    axios
      .post(
        "https://fpdodavmf6.execute-api.us-east-1.amazonaws.com/prod/getdatafromdb",
        { userId: userId }
      )
      .then((res) => {
        resolve(JSON.parse(res.data.body));
      })
      .catch((error) => {
        console.error(error);
        reject("Error while fetching 2fa data");
      });
  });
  return await getDataPromise;
};
