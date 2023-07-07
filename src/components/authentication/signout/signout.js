import { Button } from "@mui/material";
import { auth } from "../firebase";
import { useAuth } from '../authContext';
import React from 'react';
import { signOut } from "firebase/auth";

const Signout = (props) => {
    const defaultStyle = {
        position: 'relative'
    }

    const { setIsAuthenticated } = useAuth();

    return (
        <Button sx={props?.styles ? props.styles : defaultStyle}
            variant="contained"
            onClick={()=>{
                signOut(auth).then(()=>{
                    setIsAuthenticated(false);
                }).catch((error)=>{
                    alert(error.message);
                })
            }}>
            Log-out
        </Button>
    )

}



export default Signout;