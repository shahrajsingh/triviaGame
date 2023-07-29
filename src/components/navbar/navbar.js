import React from 'react';
import "./navbar.css";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Signout from '../authentication/signout/signout';

const Navbar = (() => {


    return (
        <div>
            <AppBar position="static" style={{'backgroundColor': 'rgba(27,118,210, 1)'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
                        My App
                    </Typography>
                    <a href='/profile' style={{"color": "inherit"}}>
                    <Button color="inherit" aria-label="profile" startIcon={<AccountCircle />}>
                       Profile
                    </Button>
                    </a>
                    <Signout></Signout>
                </Toolbar>
            </AppBar>
        </div>
    );

});

export default Navbar;
