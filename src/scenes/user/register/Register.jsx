import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { EmailRounded, KeyRounded, } from '@mui/icons-material';
import { Box } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../store/userSlice';
import { toast } from 'react-toastify';
import { SIGNUP_API_URL, projectId } from '../../../utils/api';

export default function Register({ setValue, handleClose, }) {
    const [userData, setUserData] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(false)
    const dispatch = useDispatch();


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            let headersList = {
                "projectId": projectId,
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "appType": "linkedin"
            });

            let response = await fetch(SIGNUP_API_URL, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            // console.log(data);
            if (data.token) {
                setIsValidUser(true);
                setUserData(data);
                toast.success(`Welcome- ${name}`);

                setName('');
                setEmail("");
                setPassword("");

            } else {
                toast.error(`${data.message}`);
            }

        } catch (error) {
            console.error("Hello:", error);
        }
    }

    useEffect(() => {
        if (isValidUser) {
            dispatch(getUser(userData));
            handleClose();
        }

        // eslint-disable-next-line
    }, [userData]);

    return (
        <>

            <DialogContent sx={{ marginTop: '10px', }}>
                <DialogContentText fontWeight={'bold'}>
                    To Register to this website, please enter your name , Email address and password here. We
                    will send updates occasionally.
                </DialogContentText>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <DriveFileRenameOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="fullName" margin="dense" label="Full Name" variant="standard" fullWidth
                        onChange={e => setName(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <EmailRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="email" margin="dense" label="Email" variant="standard" fullWidth
                        onChange={e => setEmail(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <KeyRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="password" fullWidth label="Password" type='password' variant="standard"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
            </DialogContent >

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleRegister}>Register</Button>
            </DialogActions>
        </>
    );
}
