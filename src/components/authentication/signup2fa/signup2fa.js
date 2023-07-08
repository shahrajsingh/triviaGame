import React, { useState } from "react";


import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

import { storeDataInDynamoDB } from "../dynamoDb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";


const Signup2fa = () => {
    const qa = ["what is your childhood nickname", "where were you born", "what is the name of your first pet"];
    const user = window.localStorage.getItem("user");
    const [q1a1,setq1a1] = useState("");
    const [q2a2,setq2a2] = useState("");
    const [q3a3,setq3a3] = useState("");

    const {setIsAuthenticated} = useAuth();
    const navigate = useNavigate();

    const submitqa2fa = async (event) => {
        event.preventDefault();
        let qa2fa = {};
        qa2fa[qa[0]] = q1a1;
        qa2fa[qa[1]] = q2a2;
        qa2fa[qa[2]] = q3a3;
        
        if(user){
            await storeDataInDynamoDB(user,qa2fa).then((result)=>{
                if(result === "Success"){
                    setIsAuthenticated(true);
                    navigate("/");
                }else{
                    alert(result);
                }
            });
        }else{
            alert("There has been an error while authenticating");
        }
        

    }

    const TextFieldStyles = {
        width: "100%",
        "margin": "0.5rem auto"
    }

    return (<>
        <Card sx={{ "display": "flex", "flexFlow": "column", "justifyContent": "center", "alignItems": "center", "margin": "2rem auto", "width": "400px", "height": "350px", "padding": "1rem" }}>
            <h3>
                Please answer the following questions to set-up 2fa
            </h3>
            <form id="signup2fa-form" style={{ textAlign: "center" }} onSubmit={submitqa2fa}>
                <TextField id="qa2fa-1" sx={TextFieldStyles} required label={qa[0]} value={q1a1} onChange={(e) => setq1a1(e.target.value)} variant="outlined" />

                <TextField id="qa2fa-2" sx={TextFieldStyles} required label={qa[1]} value={q2a2} onChange={(e) => setq2a2(e.target.value)} variant="outlined" />

                <TextField id="qa2fa-3" sx={TextFieldStyles} required label={qa[2]} value={q3a3} onChange={(e) => setq3a3(e.target.value)}variant="outlined" />
                <Button type="submit" sx={{ "margin": "1rem auto" }} variant="contained">Register</Button>
            </form>
        </Card>

    </>)

}

export default Signup2fa;