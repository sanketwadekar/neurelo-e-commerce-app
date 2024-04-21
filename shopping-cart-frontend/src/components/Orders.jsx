import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Orders = () => {
	const router = useRouter();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    // Fetch order details
		const token = localStorage.getItem('token');
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`, {
			'headers': {
				'Authorization': "Bearer " + token
			}
		}).then(response => {
      if (response.status == 401) {
        router.push('/login')
      } else {
        return response.json()}
      }
    )
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);
  // console.log(orders)
  if (!orders) {
    return <div className="d-flex justify-content-center mt-5"><div className="mx-auto spinner-border mx-auto text-center"></div></div>;
  }
  return (
    <div className='container'>
      <div className='h1 pt-2'>Orders</div>
      <div>
        {orders && orders.orders.map(order => (
          <div key={order.id} className='row border my-3 shadow-sm p-3 order-item'>
            <div className='d-flex flex-row justify-content-between'>
            <div><strong>Order ID:</strong> {order.id}</div>
            <div><strong>Amount:</strong> <span className='h4'>{order.amount}</span></div>
            </div>
            <div>
            {order.products.map((product, index) => {
              product = JSON.parse(product)
              return <div className='d-flex flex-row justify-content-between w-75'>
                <div><span>{index + 1}.</span> {orders.products[product.id].title}</div>
                {/* <div className='order-img'><img src={orders.products[product.id].thumbnail}></img></div> */}
                <div><strong>Quantity:</strong> {product.quantity}</div>
              </div>
            })}
            </div>
            <div className='pt-2'>
              <span className='fw-bold'>Order placed on</span> : {(new Date(order.date)).toLocaleDateString('en-US', {year: 'numeric',month: '2-digit',day: '2-digit'})}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
