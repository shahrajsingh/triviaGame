import React, { useEffect, useState, useCallback } from "react";

import { Button, Card, TextField } from "@mui/material";

import { getDataFromDynamoDB, storeDataInDynamoDB } from "../dynamoDb";
import { useNavigate } from "react-router-dom";

const Signup2fa = () => {
    const qa = ["what is your childhood nickname",
        "where were you born",
        "what is the name of your first pet"
    ];

    const [userName, setUserName] = useState(window.localStorage.getItem("userName") || "");
    const [userNameError, setUserNameError] = useState(null);

    const [userFullName, setUserFullName] = useState(window.localStorage.getItem("userFullName"));
    const userEmail = window.localStorage.getItem("userEmail");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [q1a1, setQ1A1] = useState("");
    const [q2a2, setQ2A2] = useState("");
    const [q3a3, setQ3A3] = useState("");
    const [additionalUserDetails, setAdditionalUserDetails] = useState(false);

    const navigate = useNavigate();

    const submitUserDetails = useCallback(async (event) => {
        event.preventDefault();
        const fullName = firstName + " " + lastName;
        setUserFullName(fullName);

        window.localStorage.setItem("userName", userName);
        window.localStorage.setItem("userFullName", fullName);

        await storeDataInDynamoDB(userEmail, userName, fullName, {}).then((result) => {
            if (result === "Success") {
                setAdditionalUserDetails(true);
                //navigate("/login");
            } else {
                alert(result);
            }
        });
    }, [firstName, lastName, userEmail, userName]);

    const submitqa2fa = useCallback(async (event) => {
        event.preventDefault();
        let qa2fa = {};
        qa2fa[qa[0]] = q1a1;
        qa2fa[qa[1]] = q2a2;
        qa2fa[qa[2]] = q3a3;

        if (additionalUserDetails) {
            await storeDataInDynamoDB(userEmail, userName, userFullName, qa2fa).then((result) => {
                if (result === "Success") {
                    navigate("/login");
                } else {
                    alert(result);
                }
            });
        } else {
            alert("There has been an error while authenticating");
        }
    }, [q1a1, q2a2, q3a3, additionalUserDetails, userEmail, userName, userFullName, navigate]);

    const checkUserNameExists = useCallback((userName) => {
        let timeoutId = null;

        if (timeoutId) {
            // if there's a timer in progress, cancel it
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async () => {
            const user = await getDataFromDynamoDB(userEmail);

            // If the user data comes back and the userName already exists, set an error message
            if (user && user.userName === userName) {
                setUserNameError('Username already exists.');
            } else {
                setUserNameError(null);
            }

            timeoutId = null;
        }, 1000); // 1 second delay
    }, [userEmail]);


    useEffect(() => {
        if (userEmail && userName && userFullName) {
            setAdditionalUserDetails(true);
        } else {
            setAdditionalUserDetails(false);
        }
    }, [userEmail, userFullName, userName]);

    useEffect(() => {
        if (userName) {
            checkUserNameExists(userName);
        }
    }, [userName, checkUserNameExists]);

    const TextFieldStyles = {
        width: "100%",
        margin: "0.5rem auto"
    };

    return (<>
        <Card sx={{ display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center", margin: "2rem auto", width: "400px", height: "350px", padding: "1rem" }}>
            {additionalUserDetails ? (<>
                <h3>
                    Please answer the following questions to set-up 2fa
                </h3>
                <form id="signup2fa-form" style={{ textAlign: "center" }} onSubmit={submitqa2fa}>
                    <TextField id="qa2fa-1" sx={TextFieldStyles} required label={qa[0]} value={q1a1} onChange={(e) => setQ1A1(e.target.value)} variant="outlined" />

                    <TextField id="qa2fa-2" sx={TextFieldStyles} required label={qa[1]} value={q2a2} onChange={(e) => setQ2A2(e.target.value)} variant="outlined" />

                    <TextField id="qa2fa-3" sx={TextFieldStyles} required label={qa[2]} value={q3a3} onChange={(e) => setQ3A3(e.target.value)} variant="outlined" />
                    <Button type="submit" sx={{ margin: "1rem auto" }} variant="contained">Register</Button>
                </form>
            </>) : (<>
                <h3>
                    Please provide some additional details
                </h3>
                <form id="signup2fa-form" style={{ textAlign: "center" }} onSubmit={submitUserDetails}>
                    <TextField id="userName" helperText={userNameError}
                        error={Boolean(userNameError)} sx={TextFieldStyles} required label="Choose a username" value={userName} onChange={(e) => setUserName(e.target.value)} variant="outlined" />

                    <TextField id="firstName" sx={TextFieldStyles} required label="Your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} variant="outlined" />
                    <TextField id="lastName" sx={TextFieldStyles} required label="Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} variant="outlined" />
                    <Button type="submit" sx={{ margin: "1rem auto" }} variant="contained">Submit</Button>
                </form>
            </>)}

        </Card>

    </>)

}

export default Signup2fa;
