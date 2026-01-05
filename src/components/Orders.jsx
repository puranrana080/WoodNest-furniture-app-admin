import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const getStatusColor = (status) => {
  switch (status) {
    case "placed":
      return "bg-yellow-500";
    case "shipped":
      return "bg-blue-500";
    case "delivered":
      return "bg-green-600";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:3000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
      console.log("Rerceived order", res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.put(
        `http://localhost:3000/api/admin/update-order/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.data : o)));
      toast.success("Order status updated");
    } catch (err) {
      console.log("Error", err.message);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order._id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{order.address?.name}</p>
              <p className="text-sm text-gray-600">
                ₹{order.totalAmount} • {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Status:{" "}
                <b
                  className={`${getStatusColor(
                    order.status
                  )} text-white px-2 py-1 rounded-full capitalize`}
                >
                  {order.status}
                </b>
              </p>
            </div>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Placed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
