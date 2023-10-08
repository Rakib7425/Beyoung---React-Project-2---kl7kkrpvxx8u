import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./store/index";
import userReducer from "./store/userSlice";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<ToastContainer theme='dark' autoClose={1500} />
			<CssBaseline />
			<App />
		</ThemeProvider>
	</Provider>
	// </React.StrictMode>
);
