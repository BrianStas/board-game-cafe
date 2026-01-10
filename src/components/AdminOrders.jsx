import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('pending'); // pending, preparing, ready, completed

  // Simulated orders - in production, fetch from Firebase/database
  useEffect(() => {
    const mockOrders = [
      {
        orderNumber: 1234,
        tableNumber: 'A-1',
        userName: 'John Doe',
        items: [
          { name: 'Iced Americano', quantity: 2, price: 4500 },
          { name: 'Cheese Fries', quantity: 1, price: 7000 }
        ],
        total: 16000,
        status: 'pending',
        timestamp: Date.now() - 300000,
        pointsEarned: 16
      },
      {
        orderNumber: 1235,
        tableNumber: 'B-2',
        userName: 'Guest',
        items: [
          { name: 'Club Sandwich', quantity: 1, price: 11000 },
          { name: 'Caffe Latte', quantity: 2, price: 5000 }
        ],
        total: 21000,
        status: 'preparing',
        timestamp: Date.now() - 600000,
        pointsEarned: 21
      },
      {
        orderNumber: 1236,
        tableNumber: 'C-1',
        userName: 'Jane Smith',
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 15000 },
          { name: 'Fruit Smoothie', quantity: 3, price: 6500 }
        ],
        total: 34500,
        status: 'ready',
        timestamp: Date.now() - 900000,
        pointsEarned: 34
      },
      {
        orderNumber: 1237,
        tableNumber: 'A-3',
        userName: 'Mike Johnson',
        items: [
          { name: 'Chicken Wings', quantity: 1, price: 9000 },
          { name: 'Brownie Sundae', quantity: 2, price: 6000 }
        ],
        total: 21000,
        status: 'completed',
        timestamp: Date.now() - 3600000,
        pointsEarned: 21
      }
    ];
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order => order.status === filter);

  const updateOrderStatus = (orderNumber, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.orderNumber === orderNumber 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'preparing': return 'bg-blue-600';
      case 'ready': return 'bg-green-600';
      case 'completed': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const todayRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">🔒 Admin: Order Management</h1>
            <p className="text-gray-300">Kitchen display and order tracking</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">{pendingCount}</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Preparing</div>
            <div className="text-3xl font-bold text-blue-400">{preparingCount}</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Ready for Pickup</div>
            <div className="text-3xl font-bold text-green-400">{readyCount}</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="text-gray-300 text-sm mb-1">Today's Revenue</div>
            <div className="text-3xl font-bold">₩{todayRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {['pending', 'preparing', 'ready', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filter === status
                  ? 'bg-orange-600 shadow-lg scale-105'
                  : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'completed' && (
                <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                  {orders.filter(o => o.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white border-opacity-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-300 text-lg">No {filter} orders</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <div
                key={order.orderNumber}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-5 border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white border-opacity-20">
                  <div>
                    <div className="text-3xl font-bold text-orange-400">#{order.orderNumber}</div>
                    <div className="text-sm text-gray-400">{getTimeAgo(order.timestamp)}</div>
                  </div>
                  <span className={`px-3 py-1 ${getStatusColor(order.status)} rounded-full text-xs font-semibold`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* Table & User Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold">Table {order.tableNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-300">{order.userName}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm bg-white bg-opacity-5 rounded-lg p-2">
                      <span>
                        <span className="font-semibold text-orange-300">{item.quantity}x</span> {item.name}
                      </span>
                      <span className="text-gray-400">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white border-opacity-20">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-orange-400">{formatCurrency(order.total)}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.orderNumber, 'preparing')}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.orderNumber, 'ready')}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                    >
                      Mark as Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.orderNumber, 'completed')}
                      className="w-full py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                    >
                      Mark as Picked Up
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <div className="text-center py-2 text-gray-400 text-sm">
                      ✓ Order completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;