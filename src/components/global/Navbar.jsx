import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {

  ShoppingBagOutlined,
  // MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../store";
import NotUser from '../../scenes/user/NotUser'
import Profile from "../../scenes/user/profile/Profile";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.userDetails)
  useEffect(() => {
    console.log(user);
    // eslint-disable-next-line
  }, [open])

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      // justifyContent={'space-between'}
      backgroundColor="rgba(235, 255, 205, 0.70)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <Box sx={{ display: "flex" }}
          display='flex'
          justifyContent="center"
          alignItems="center"
        > */}
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
          fontSize={20}
        >
          BE👧YOUNG
        </Box>
        {/* <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer", color: shades.primary[300] } }}
            color={shades.primary[500]}
            fontSize={16}
            marginLeft="30px"
            fontWeight={"bold"}
          >
            Home
          </Box> */}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        columnGap="20px"
        zIndex="2"
      >
        <IconButton sx={{ color: "black" }}>
          <SearchOutlined />
        </IconButton>

        {/* Login model & profile */}
        {!!user ? <IconButton sx={{ color: "black" }}>
          <Profile />
        </IconButton> :
          < Box sx={{ maxWidth: '90vw' }}>
            <NotUser />
          </Box>
        }
        <Badge
          badgeContent={cart.length}
          color="secondary"
          invisible={cart.length === 0}

          sx={{
            "& .MuiBadge-badge": {
              right: "35px",
              top: 5,
              padding: "0 5px",
              height: "16px",
              minWidth: "15px",
            },
          }}
        >
          <IconButton
            onClick={() => dispatch(setIsCartOpen({}))}
            sx={{ color: "black", marginRight: '30px' }}
          >
            <ShoppingBagOutlined />
          </IconButton>
        </Badge>
        {/* <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton> */}
      </Box>
      {/* </Box> */}
    </Box >
  );
}

export default Navbar;
