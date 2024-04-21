"use client";

import React from "react";
import CartContextProvider from "../../context/CartContextProvider";
import App from "../../App";
import Orders from "../../components/Orders";

export function ClientOnly() {
	return (
		<CartContextProvider>
			<App>
				<Orders />
			</App>
		</CartContextProvider>
	);
}
