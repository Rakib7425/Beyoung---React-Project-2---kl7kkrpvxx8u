import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import ImageCarousel from "./ImageCarousel";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const list = useSelector((store) => store.cart.items)
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const baseUrl = "https://academics.newtonschool.co";
  const projectId = "kl7kkrpvxx8u";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    let headersList = {
      "Accept": "*/*",
      "projectId": projectId
    }

    let response = await fetch(`${baseUrl}/api/v1/ecommerce/product/${itemId}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    setItem(data.data)
    // console.log(data);
  }


  useEffect(() => {
    function getItems() {
      // console.log(list && list);
      setItems(list)
    }
    getItems();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getItem();

  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto" >
      <Box display="flex" flexWrap="wrap" columnGap="40px" >
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          {/* <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`${item?.images[0]}`}
            style={{ objectFit: "contain" }}
          /> */}
          <ImageCarousel item={item} />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography variant="h3" sx={{ mt: "5px" }}>₹ {item?.price}</Typography>
            {/* <Typography sx={{ mt: "20px" }}>
              {item?.description}
            </Typography> */}
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              // style={{ &:hover: {backgroundColor: "red", color: "green", } }}
              // onMouseOver={this.style.color = 'red'}
              // onMouseOut={this.style.color = 'green'}

              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 5,
                minWidth: "150px",
                padding: "10px 40px",
                "&:hover": { backgroundColor: "green" }
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>BRAND: {item?.brand}</Typography>
            <Typography>CATEGORIES: {item?.category}</Typography>
          </Box>
        </Box>
      </Box>


      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div dangerouslySetInnerHTML={{ __html: item?.description }} />
        )}
        {value === "reviews" && <div>No reviews</div>}
      </Box>
      <Box justifyContent="space-evenly" display='flex' className="22">
        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1%"
            justifyContent="space-evenly"

          >

            {items.slice(3, 6).map((item, i) => (
              <Box marginTop={"20px"} key={`${item.name}-${i}`} onClick={() => { window.scrollTo(0, 0); }}>
                <Item item={item} maxWidth={300} />
              </Box>
            ))}

          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default ItemDetails;
