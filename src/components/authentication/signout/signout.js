import { Button } from "@mui/material";
import { auth } from "../firebase";
import { useAuth } from '../authContext';
import React from 'react';
import { signOut } from "firebase/auth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Signout = (props) => {

    const { setIsAuthenticated } = useAuth();

    return (
        <Button color="inherit" startIcon={<ExitToAppIcon />}
            onClick={()=>{
                signOut(auth).then(()=>{
                    setIsAuthenticated(false);
                    window.localStorage.removeItem("userEmail");
                    window.localStorage.removeItem("userName");
                    window.localStorage.removeItem("userFullName");
                }).catch((error)=>{
                    alert(error.message);
                })
            }}>
            Logout
        </Button>
    )

}



export default Signout;