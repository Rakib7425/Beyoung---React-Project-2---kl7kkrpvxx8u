import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Success = () => {
    const user = useSelector((state) => state.user.userDetails)
    const navigate = useNavigate();


    if (!user) {
        navigate('/');
    }


    const Body = styled('div')({
        textAlign: 'center',
        padding: '40px 0',
    });

    const H1 = styled('h1')({
        color: '#88B04B',
        fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
        fontWeight: 900,
        fontSize: '40px',
        marginBottom: '10px',
    });

    const P = styled('p')({
        color: '#404F5E',
        fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
        fontSize: '20px',
        margin: '0',
    });

    const I = styled('i')({
        color: '#9ABC66',
        fontSize: '150px',
        lineHeight: '200px',
        marginLeft: '-30px',
    });

    return (
        <>
            <Body>
                <Box style={{ borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", margin: 'auto', display: 'flex', alignItems: "center", justifyContent: 'center', }}>
                    <I >✓</I>
                </Box>
                <H1>Order Placed!</H1>
                <P>We received your purchase request, <br /> we'll be in touch shortly!</P>
                <div>
                    <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            backgroundColor: shades.primary[400],
                            boxShadow: "none",
                            color: "white",
                            borderRadius: 0,
                            padding: "15px 40px",
                            marginTop: '30px'
                        }}

                        onClick={() => { navigate('/user/orders') }}
                    >
                        My Orders
                    </Button>
                </div>
            </Body >
        </>
    )
}

export default Success;