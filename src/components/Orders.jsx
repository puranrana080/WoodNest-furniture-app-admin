import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', status: 'Pending', total: 150 },
    { id: 2, customer: 'Jane Smith', status: 'Shipped', total: 200 },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order.id} className="bg-white p-4 rounded shadow-md flex justify-between items-center">
            <div>
              <strong>{order.customer}</strong> - ${order.total} - Status:
            </div>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="ml-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;