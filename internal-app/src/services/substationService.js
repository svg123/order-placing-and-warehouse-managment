import api from './api';

const substationService = {
  getAll: () => api.get('/substations'),

  getById: (id) => api.get(`/substations/${id}`),

  getOrders: (id, params) => api.get(`/substations/${id}/orders`, { params }),

  updateOrderStatus: (substationId, orderId, data) =>
    api.put(`/substations/${substationId}/orders/${orderId}`, data),

  getPerformance: (id, params) =>
    api.get(`/substations/${id}/performance`, { params }),
};

export default substationService;
