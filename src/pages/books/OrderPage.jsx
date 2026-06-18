import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email, {
    skip: !currentUser?.email,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        Error loading orders.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Your Orders
      </h2>

      {!orders?.length ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-4 shadow"
          >
            <p className="bg-blue-500 text-white inline-block px-2 py-1 rounded mb-2">
              #{index + 1}
            </p>

            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Name:</strong> {order.name}
            </p>

            <p>
              <strong>Email:</strong> {order.email}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Total Price:</strong> $
              {order.totalPrice}
            </p>

            <div className="mt-3">
              <strong>Address:</strong>

              {order.address ? (
                <div className="ml-2 mt-1">
                  <p>
                    {order.address.street || ""}
                  </p>

                  <p>
                    {order.address.city || ""},{" "}
                    {order.address.state || ""}
                  </p>

                  <p>
                    {order.address.country || ""} -{" "}
                    {order.address.zipcode || ""}
                  </p>
                </div>
              ) : (
                <p>No address available</p>
              )}
            </div>

            <div className="mt-3">
              <strong>Products:</strong>

              <ul className="list-disc ml-6 mt-1">
                {order.productIds?.map((product, idx) => (
                  <li key={idx}>
                    {typeof product === "object"
                      ? product.title ||
                        product.name ||
                        product._id
                      : product}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <strong>Status:</strong>{" "}
              {order.status || "Confirmed"}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;