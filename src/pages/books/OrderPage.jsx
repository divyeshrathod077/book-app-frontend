import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError
  } = useGetOrderByEmailQuery(currentUser?.email, {
    skip: !currentUser?.email // ✅ prevents crash
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error getting orders</div>;

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>

      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="border-b mb-4 pb-4">
              <p className='p-1 bg-secondary text-blue-100 w-10 rounded mb-1'>
                #{index + 1}
              </p>

              <h2 className="font-bold">Order ID: {order._id}</h2>
              <p>Name: {order.name}</p>
              <p>Email: {order.email}</p>
              <p>Phone: {order.phone}</p>
              <p>Total: ${order.totalPrice}</p>

              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {order.address?.city}, {order.address?.state},{" "}
                {order.address?.country}, {order.address?.zipcode}
              </p>

              <h3 className="font-semibold mt-2">Products:</h3>
              <ul>
                {order.productIds?.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;