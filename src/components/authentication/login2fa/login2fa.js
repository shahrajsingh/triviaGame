import React, { useState, useEffect } from 'react';
import AWS from "aws-sdk";

import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

import { getDataFromDynamoDB, updateUserLoginStatus } from '../dynamoDb';
import { useAuth } from '../authContext';

const Login2fa = () => {
    AWS.config.region = "us-east-1";
    let lambda = new AWS.Lambda();

    const {setIsAuthenticated} = useAuth();

    const [ques, setQues] = useState("");
    const [ans, setAns] = useState("");
    const [loading, setLoading] = useState(true);
    const user = window.localStorage.getItem("userEmail");

    const submitLogin2fa = async (event) => {
        event.preventDefault();
        const payload = {
            userId: user,
            userQues: ques,
            userAnswer: ans
        }

        let params = {
            FunctionName: "verify2fa",
            Payload: JSON.stringify(payload)
        }

        lambda.invoke(params,function(err,data){
            if(err){
                alert("Error while verifying lambda");
            } else {
                const res = data.Payload;
                if(res.includes("200") && res.includes("Answers matched")){
                    updateUserLoginStatus(user,true);
                    setIsAuthenticated(true);
                }else{
                    alert("2fa not verified please try again");
                    setIsAuthenticated(false);
                }
            }
        })
    };

    const getData = async () => {
        if (!user) {
            alert("Error while fetching 2fa data");
        } else {
            await getDataFromDynamoDB(user).then((result) => {
                const qalist = result?.Item?.qa2fa;
                if (qalist) {
                    const randomInteger = Math.floor(Math.random() * 3);
                    Object.keys(qalist).forEach((key, index) => {
                        if (index === randomInteger) {
                            setQues(key);
                        }
                    });
                    setLoading(false);
                } else {
                    alert("Error while fetching 2fa data");
                }
            }, (error) => {
                alert(error);
            })
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const TextFieldStyles = {
        width: "100%",
        minWidth: "348px",
        "margin": "0.5rem auto"
    }

    return (<>
        <Card sx={{ "display": "flex", "flexFlow": "column", "justifyContent": "center", "alignItems": "center", "margin": "2rem auto", "width": "400px", "height": "350px", "padding": "1rem" }}>
            <h2>2 step-verification</h2>
            <h3>
                Please answer the following question to verify
            </h3>
            {loading ? 
                <p>Loading 2fa, please wait !</p> :
                <form id="signup2fa-form" style={{ textAlign: "center" }} onSubmit={submitLogin2fa}>
                    <TextField id="qa2fa-1" sx={TextFieldStyles} required label={ques} value={ans} onChange={(e) => setAns(e.target.value)} variant="outlined" />
                    <Button type="submit" sx={{ "margin": "1rem auto" }} variant="contained">Verify</Button>
                </form>
            }
        </Card>
    </>)
};

export default Login2fa;
