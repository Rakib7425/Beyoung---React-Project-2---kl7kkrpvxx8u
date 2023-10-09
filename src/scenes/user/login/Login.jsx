
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { EmailRounded, KeyRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../store/userSlice';
import { toast } from 'react-toastify';
import { LOGIN_API_URL } from '../../../utils/api';

const Login = ({ handleClose }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUser, setIsValidUser] = useState(false)
    const [userData, setUserData] = useState(null)
    const dispatch = useDispatch();


    const handleLogin = async () => {

        let headersList = {
            "projectId": "kl7kkrpvxx8u",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": email,
            "password": password,
            "appType": "linkedin"
        });

        let response = await fetch(LOGIN_API_URL, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        // console.log(data);
        if (data.token) {
            setIsValidUser(true);
            setUserData(data);
            toast.success(`Successfully logged in`);

            setEmail("");
            setPassword("");

        } else {
            toast.error(`${data.message}`);
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
                    To Login to this website, please enter your Email address and password here. We
                    will send updates occasionally.
                </DialogContentText>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <EmailRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

                    <TextField id="input-with-sx" margin="dense" label="Email" variant="standard" fullWidth
                        onChange={e => setEmail(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <KeyRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="password"
                        fullWidth
                        label="Password"
                        variant="standard"
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>

            </DialogContent >
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
        </>
    );
}

export default Login; 
