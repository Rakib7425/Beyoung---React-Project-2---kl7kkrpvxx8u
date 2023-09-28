
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { PersonOutline } from '@mui/icons-material';
import { IconButton, Tab, Tabs, useMediaQuery } from '@mui/material';
import Login from './login/Login';

import ForgotPassword from './forgotPassword/ForgotPassword';
import Register from './register/Register';

const NotUser = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("login");
    const breakPoint = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabValueToRegister = () => {
        setValue('register');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <PersonOutline sx={{ fontSize: "22px" }} />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>

                <DialogContent sx={{ marginTop: '10px' }}>

                    <Tabs
                        textColor="primary"
                        indicatorColor="primary"
                        value={value}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
                        sx={{
                            m: "25px",
                            "& .MuiTabs-flexContainer": {
                                flexWrap: "wrap",
                            },
                        }}
                    >

                        <Tab label="Login" value="login" />
                        <Tab label="Register" value="register" onClick={tabValueToRegister} />
                        <Tab label="Forgot Password" value="forgotPassword" />

                    </Tabs>

                    {(value === 'login') && <Login handleClose={handleClose} />}
                    {(value === 'register') && <Register handleClose={handleClose} />}
                    {(value === 'forgotPassword') && <ForgotPassword handleClose={handleClose} />}

                </DialogContent >

            </Dialog >
        </>
    );
}


export default NotUser;