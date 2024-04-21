"use client";

import App from "../../../App";
import ProductDetails from "../../../Components/ProductDetails";
import CartContextProvider from "../../../context/CartContextProvider";

export function ClientOnly({ id }) {
	return (
		<CartContextProvider>
			<App>
				<ProductDetails id={id} />
			</App>
		</CartContextProvider>
	);
}
