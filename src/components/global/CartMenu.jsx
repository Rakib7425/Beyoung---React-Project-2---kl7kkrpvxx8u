import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
  emptyCart
} from "../../store";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  // console.log(cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart && cart.map((item) => (
              <Box key={`${item._id}` + Math.random() * 10}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="90px"
                      height="120px"
                      src={`${item?.displayImage}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ _id: item._id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item?.shortDescription}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ _id: item._id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ _id: item._id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">
                        ₹{item.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">₹{totalPrice}</Typography>
            </FlexBox>

            {
              cart && cart.length > 0 &&
              <>

                <Button
                  sx={{
                    backgroundColor: shades.primary[400],
                    color: "white",
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0",
                    "&:hover": { backgroundColor: "green" }
                  }}
                  onClick={() => {
                    navigate("/checkout");
                    dispatch(setIsCartOpen({}));
                  }}
                >
                  CHECKOUT
                </Button>
                <Button
                  sx={{
                    backgroundColor: shades.primary[400],
                    color: "white",
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0",
                    "&:hover": { backgroundColor: "green" }
                  }}
                  onClick={() => {
                    dispatch(emptyCart());
                  }}
                >
                  Clear cart
                </Button>

              </>
            }
            {
              cart && cart.length < 1 && (
                <>
                  <Typography variant="h2" fontWeight="bold">Your bag is Empty!</Typography>
                  <img src="/empty-cart.gif" alt="noItem"

                    width={"100%"}

                  />
                </>
              )
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
