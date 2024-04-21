import React, { useEffect, useState } from "react";
import withAuth from "./withAuth";
import { useRouter } from 'next/navigation';


function ProductCard({ product }) {
	return (
		<>
			<div className="flex-fill w-25 card mx-3 my-2 shadow-sm product-card">
				<a href={`/details/${product["id"]}`} className="product-card-link">
					<div className="card-body p-6">
						<div className="card-title h6">{product.title}</div>
						<div className="product-list-image">
							<img src={product.thumbnail} alt={"image"}></img>
						</div>
						<div className="d-flex flex-row justify-content-between mt-2">
							<div className="card-text fw-bold">${product.price}</div>
							<div className="card-text">
								{product.rating} <i className="fas fa-star star-gold"></i>
							</div>
						</div>
					</div>
				</a>
			</div>
		</>
	);
}

function ProductList() {
	const [products, setProducts] = useState([]);
	const router = useRouter();
	useEffect(() => {
		const token = localStorage.getItem('token');
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`, {
			'headers': {
				'Authorization': "Bearer " + token
			}
		})
			.then((res) => {
				if (res.status == 401) {
					router.push('/login');
				} else {
					return res.json();
				}
			})
			.then((data) => {

				setProducts([...data.data]);
			});
	}, []);

	if (products.length) {
		return (
			<div className="d-flex flex-row justify-content-around flex-wrap">
				{products.map((product, index) => {
					return <ProductCard product={product} key={index} />;
				})}
			</div>
		);
	}
	return <div className="d-flex justify-content-center mt-5"><div className="mx-auto spinner-border mx-auto text-center"></div></div>;
}

export default withAuth(ProductList);
