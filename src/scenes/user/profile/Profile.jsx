import { Avatar, Box } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../../store/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((state) => state.user.userDetails)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(user?.profileImage || 'https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-orange.png');


  // console.log(user);
  const handleUpdateImage = () => {
    console.log("url not working");

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(getUser(null));
    toast.success(`user logged out successfully !`);
  };

  return (
    <Box>
      <Avatar onClick={handleClickOpen} alt="userAvatar" src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-orange.png"
        sx={{ width: '25px', height: '25px' }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="User-Profile"
      >
        <DialogTitle id="userProfile">
          My Profile
        </DialogTitle>
        <DialogContent>
          <Box className="page shadow">
            <Box className="main-container shadow">
              <MDBContainer>
                <MDBRow>
                  <MDBCol sm={12} md={12}>
                    <Box className="container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <img
                        src={imageUrl}
                        alt="user avatar"
                        style={{ width: "250px", height: '250px', borderRadius: "100%", }}
                      />

                      <Box sx={{ display: 'flex', gap: '20px', margin: '20px 0' }}>

                        <Button
                          variant="outlined"
                          component="label"
                          sx={
                            {
                              color: 'black', backgroundColor: 'transparent',
                              "&:hover": {
                                color: 'white',
                                backgroundColor: 'black'
                              },
                            }}
                        >
                          Select image
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={e => setImageUrl(URL.createObjectURL(e.target.files[0]))}
                          />
                        </Button>
                        <Button
                          variant="outlined"
                          component="label" sx={{
                            color: 'white', backgroundColor: 'black',
                            "&:hover": {
                              color: 'black',
                              backgroundColor: 'transparent'
                            },
                          }}
                          onClick={handleUpdateImage}
                        >
                          Update image
                        </Button>
                      </Box>

                    </Box>
                  </MDBCol>

                  <MDBCol>
                    <Box className="container">
                      <h3>Name: {user?.data?.name}</h3>
                      <p>User Id: {user?.data?._id}</p>
                      <p>Email: {user?.data?.email}</p>
                      <p>Created At: {(user?.data?.createdAt)}</p>
                    </Box>
                    <hr />

                    <MDBContainer>
                      <MDBRow>
                        {/* <MDBCol sm={2} lg={2} md={2}>
                          <h6 className="m-4">Bio </h6>
                        </MDBCol> */}
                        <MDBCol>
                          {/* <p className="bio">
                            Hello, I am a pre final year student at Indian Institute
                            of Technology Rourke (IIT'R). I am a tech enthusiast
                            and like to learn new stuffs related to technology.
                          </p> */}

                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                    <br />
                    <br />
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </Box>
          </Box>

        </DialogContent>
        <DialogActions>

          {
            user.token &&
            <>
              <Link to={'user/orders'}>
                <Button onClick={handleClose} variant='outlined' sx={{ color: 'black' }}>
                  My orders
                </Button>
              </Link>
              <Button onClick={handleLogout} variant='outlined' sx={{ color: 'blue ' }}>
                Log Out
              </Button>
            </>
          }
          <Button onClick={handleClose} variant='outlined' sx={{ color: 'red' }}>
            Close
          </Button>
          <Button onClick={handleClose} variant='outlined' sx={{ color: 'green' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile