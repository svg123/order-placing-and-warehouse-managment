import api from './api';

const orderService = {
  getOrders: (params) => api.get('/orders', { params }),

  getOrderById: (orderId) => api.get(`/orders/${orderId}`),

  getOrderTimeline: (orderId) => api.get(`/orders/${orderId}/timeline`),

  updateOrderStatus: (orderId, status) =>
    api.put(`/orders/${orderId}/status`, { status }),

  getRecentOrders: (limit = 10) => api.get('/orders/recent', { params: { limit } }),
};

export default orderService;
