import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../store";
import { GET_PRODUCTS_API_URL, projectId } from "../../utils/api";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  // console.log(items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    let headersList = {
      "Accept": "*/*",
      "projectId": projectId
    }

    let response = await fetch(GET_PRODUCTS_API_URL, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    // console.log(data);
    dispatch(setItems(data.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const topRatedItems = items.filter(
  //   (item) => item
  // );

  const mensItems = items.filter(
    (item) => item.gender === "Men"
  );

  // const bestSellersItems = items.filter(
  //   (item) => item.attributes.category === "bestSellers"
  // );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
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
        <Tab label="ALL" value="all" />
        <Tab label="Mens items" value="men" />
        <Tab label="WOMANS ITEMS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))
        }

        {value === "men" &&
          mensItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} width={"300px"} />
          ))}


        {/* {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))} */}
      </Box>
    </Box>
  );
};

export default ShoppingList;
