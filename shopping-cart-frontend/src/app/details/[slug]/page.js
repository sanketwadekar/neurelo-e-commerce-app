import '../../index.css'
import { ClientOnly } from './client'

export async function generateStaticParams() {
	let products = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?select={"id": true}`)
	.then((res) => res.json())
	.then((data) => {
		return [...data.data];
	});

	let slugs = products.map((product) => ({
		slug: product.id,
	}))
	return slugs;
}

export default function Page({ params }) {
	const { slug } = params;
	return <ClientOnly id={slug} />;
}
