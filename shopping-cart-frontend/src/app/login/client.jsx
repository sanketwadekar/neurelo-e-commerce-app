"use client";

import React from "react";
import CartContextProvider from "../../context/CartContextProvider";
import App from "../../App";
import Login from "../../components/Login";

export function ClientOnly() {
	return (
				<Login />
	);
}
