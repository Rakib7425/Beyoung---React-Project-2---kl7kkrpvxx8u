
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { EmailRounded, KeyOffRounded, KeyRounded } from '@mui/icons-material';
import { Box, } from '@mui/material';

export default function ForgotPassword({ handleClose }) {


    return (
        <>
            <DialogContent sx={{ marginTop: '10px', }}>
                <DialogContentText fontWeight={'bold'}>
                    To Reset password to this website, please enter your  Email address here. We
                    will send updates occasionally.
                </DialogContentText>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <EmailRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" margin="dense" label="Email" variant="standard" fullWidth />
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <KeyOffRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="currPassword"
                        fullWidth
                        label="Current Password"
                        variant="standard"

                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }} >
                    <KeyRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="password"
                        fullWidth
                        label="New Password"
                        variant="standard"

                    />
                </Box>

            </DialogContent >
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { }}>Update password</Button>
            </DialogActions>
        </>
    );
}
