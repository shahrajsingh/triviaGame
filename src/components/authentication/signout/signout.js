import { Button } from "@mui/material";
import { auth } from "../firebase";
import { useAuth } from '../authContext';
import React from 'react';
import { signOut } from "firebase/auth";
import { updateUserLoginStatus } from "../dynamoDb";

const Signout = (props) => {
    const defaultStyle = {
        position: 'relative'
    }

    const { setIsAuthenticated } = useAuth();

    const logout = (() => {
        signOut(auth).then(() => {
            setIsAuthenticated(false);
            updateUserLoginStatus(window.localStorage.getItem("userEmail"),false);
            window.localStorage.removeItem("userEmail");
            window.localStorage.removeItem("userName");
            window.localStorage.removeItem("userFullName");

        }).catch((error) => {
            alert(error.message);
        })
    });

    return (
        <Button sx={props?.styles ? props.styles : defaultStyle}
            variant="contained"
            onClick={() => {
                logout();
            }}>
            Log-out
        </Button>
    )

}



export default Signout;