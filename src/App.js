import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import CartMenu from "./components/global/CartMenu";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import BackToUp from "@uiw/react-back-to-top";
import Orders from "./scenes/orders/Orders";
import { useSelector } from "react-redux";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

function App() {
	const user = useSelector((state) => state.user.userDetails);

	return (
		<div className='app'>
			<BrowserRouter>
				<Navbar />
				<ScrollToTop />

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='item/:itemId' element={<ItemDetails />} />
					<Route path='checkout' element={<Checkout />} />
					{user && <Route path={`checkout/success`} element={<Confirmation />} />}
					<Route path='user/orders' element={<Orders />} />
				</Routes>
				<CartMenu />

				<Footer />

				<BackToUp
					style={{
						zIndex: "3",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					size={40}
				>
					{/* {<BiUpArrowCircle size={32} />} */}
					TOP
				</BackToUp>
			</BrowserRouter>
		</div>
	);
}

export default App;
