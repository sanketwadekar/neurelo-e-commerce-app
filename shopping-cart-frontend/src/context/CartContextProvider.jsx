import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartContextProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		let previous_cart = localStorage.getItem("shopping_cart");
		if (previous_cart) {
			setCart(JSON.parse(previous_cart));
		}
	}, []);

	const addToCart = (product) => {
		let newState = [...cart, product];
		localStorage.setItem("shopping_cart", JSON.stringify(newState));
		setCart([...newState]);
	};

	const clearCart = () => {
		localStorage.setItem("shopping_cart", JSON.stringify([]));
		setCart([]);
	};

	const deleteFromCart = (index) => {
		let newState = cart.filter((v, i) => i != index);
		localStorage.setItem("shopping_cart", JSON.stringify(newState));
		setCart([...newState]);
	};

	const value = {
		cart,
		addToCart,
		clearCart,
		deleteFromCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
