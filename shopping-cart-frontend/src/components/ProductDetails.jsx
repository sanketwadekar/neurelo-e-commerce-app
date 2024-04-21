import React, { useEffect, useState, useContext } from "react";
import CartContext from "../context/CartContext";
import withAuth from "./withAuth";

function Carousel({ images }) {
	return (
		<div id="demo" className="carousel slide" data-bs-ride="carousel">
			<div className="carousel-indicators">
				{images &&
					images.map((image, index) => {
						return (
							<button
								type="button"
								key={index}
								className={`${index == 0 && "active"}`}
								data-bs-target="#demo"
								data-bs-slide-to={index}
							></button>
						);
					})}
			</div>

			<div className="carousel-inner">
				{images &&
					images.map((image, index) => {
						return (
							<div
								key={index}
								className={`carousel-item ${index == 0 && "active"}`}
							>
								<img
									src={image}
									alt="image"
									className="d-block mx-auto carousel-image"
								/>
							</div>
						);
					})}
			</div>

			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target="#demo"
				data-bs-slide="prev"
			>
				<i className="fas fa-angle-left carousel-control-button"></i>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target="#demo"
				data-bs-slide="next"
			>
				<i className="fas fa-angle-right carousel-control-button"></i>
			</button>
		</div>
	);
}

function ProductDetails(props) {
	const { cart, addToCart } = useContext(CartContext);
	const [product, setProduct] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${props.id}`, {
			'headers': {
				'Authorization': "Bearer " + token
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setProduct({ ...data.data });
			});
	}, []);
	if (!product) {
		return <div className="d-flex justify-content-center mt-5"><div className="mx-auto spinner-border mx-auto text-center"></div></div>;
	}
	return (
		<>
			<div className="d-flex flex-row justify-content-between">
				<div className="pt-3">
					<span className="h4 px-1 product-details-title">{product.title}</span>
				</div>
				<div className="p-2 pt-4">
					User ratings:{" "}
					<span className="h5">
						{product.rating} <i className="fas fa-star star-gold"></i>
					</span>
				</div>
			</div>
			<Carousel images={product.images} />
			<div className="d-flex flex-row justify-content-between">
				<div className="p-2">
					<span className="p-1">Price: </span>
					<span className="h2">${product.price}</span>
				</div>
				<div className="p-3">
					{product.description && (<><span className="fw-bold">Description:</span> {product.description}</>)}
				</div>
				<div className="p-2">
					<button
						className="btn btn-dark btn-large add-to-cart-btn"
						onClick={() => {
							addToCart(product);
						}}
					>
						Add to cart
					</button>
				</div>
			</div>
		</>
	);
}

export default withAuth(ProductDetails);
